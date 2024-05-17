const router = require("express").Router();
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Matches, sequelize } = require("../models");
const user = require("../models/user");
const { Op } = require("sequelize");
const authentication = require("../middlewares/authentication");
//di controller google sign in harusnya
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, displayName, gender, bio, imageUrl } =
      req.body;
    console.log(req.body);
    const user = await User.create({
      username,
      email,
      password,
      displayName,
      gender,
      bio,
      imageUrl,
    });
    res.status(200).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email) {
      throw { name: "NoEmailInput" };
    } else if (!password) {
      throw { name: "NoPasswordInput" };
    }

    let user = await User.findOne({ where: { email } });
    if (!user) {
      throw { name: "InvalidUser" };
    }
    const compare = comparePassword(password, user.password);
    if (!compare) {
      throw { name: "InvalidUser" };
    }
    let token = createToken({ id: user.id });
    res.status(200).json({ email: user.email, access_token: token });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

router.post("/login/google", async (req, res) => {
  try {
    const { googleToken } = req.body;
    //proses validasi
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience:
        "1071824266753-6upao1purtf4a975jpe730nls1hp5kd8.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    console.log(payload, "<<<< PAYLOAD");
    let username = payload.name.split(" ");
    username = username.join("");
    let user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      user = await User.create(
        {
          username: username,
          email: payload.email,
          password: "google_sign_in",
          displayName: payload.name,
          gender: "Male",
          bio: "tes gugel",
          imageUrl: "masih tes",
        },
        { hooks: false }
      );
    }
    const access_token = createToken({ id: user.id });
    // const userid = payload["sub"];
    res
      .status(200)
      .json({ message: "Login success", payload, user, access_token });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getuser", async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log();
  }
});

//user ngelike user lain
router.post("/:id/like", authentication, async (req, res, next) => {
  try {
    const { id } = req.params;
    let user_liked = await User.findByPk(id);
    let matches = await Matches.create({
      user_id: req.user.id,
      liked_user_id: id,
      status: "Pending",
    });

    const likedUser = await Matches.findAll({
      [Op.and]: [
        {
          where: {
            user_id: id,
            liked_user_id: req.user.id,
          },
          include: [User],
        },
        {
          where: {
            user_id: req.user.id,
            liked_user_id: id,
          },
          include: [User],
        },
      ],
    });
    console.log(likedUser);

    if (likedUser) {
      const matchIds = likedUser.map((match) => match.id);
      await Matches.update(
        { status: "You have been matched!" },
        { where: { id: matchIds } }
      );
    }
    // const have_match = await Matches.findAll({
    //   where: {
    //     liked_user_id: req.user.id,
    //   },
    //   include: [User],
    // });
    // if (have_match) {
    //   await have_match.update({
    //     status: "You have been matched!",
    //   });
    // }
    res.status(201).json({
      message: "You have liked " + user_liked.displayName,
      status: matches.status,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//cari pasangan
router.get("/find-matches", authentication, async (req, res) => {
  try {
    let current_user_gender = req.user?.gender || "Male";

    // let have_match = await Matches.findAll({
    //   where: {
    //     [Op.or]: [
    //       {
    //         liked_user_id: req.user.id,
    //       },
    //     ],
    //   },
    //   include: [User],
    // });
    let users = await User.findAll({
      where: {
        gender: {
          [Op.not]: current_user_gender,
        },
      },
      attributes: ["displayName", "gender", "bio", "imageUrl"],
    });
    res.status(200).json(users);
    // let result = [have_match.map((x) => x.User), ...users];
    // console.log(result);

    // result => list user lawan jenis, yang di bagian awal array adalah orang-orang yang matches dengan current user
  } catch (error) {
    console.log(error);
  }
});

router.post("/matches", async (req, res) => {
  try {
    let user_liked = await User.findByPk(req.params.the_user_id_that_we_liked);
    // validasi
    let have_match = await Matches.findAll({
      where: {
        [Op.and]: [
          {
            liked_user_id: req.user.id,
          },
          {
            user_id: req.params.the_user_id_that_we_liked,
          },
        ],
      },
      include: [User],
    });

    if (have_match) {
      await have_match.update({ status: "Have been match" });
      res.status(200).json({
        message: "Congrats, you both liked each other",
      });
    } else {
      have_match = await Matches.create({
        user_id: req.user.id,
        liked_user_id: req.params.the_user_id_that_we_liked,
        status: "waiting",
      });
      res.status(201).json({
        message: "You have like " + user.name,
      });
    }
  } catch (error) {}
});

module.exports = router;
