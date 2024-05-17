module.exports = function errorHandler(error, req, res, next) {
  console.log(error);
  if (error.name === "InvalidData") {
    res.status(404).json({ message: "Data not found" });
  }
  if (error.name === "FileError") {
    res.status(400).json({ message: "Please provide an image file" });
  }
  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    res.status(400).json({ message: error.errors.map((e) => e.message) });
  }
  if (error.name === "NoEmailInput") {
    res.status(400).json({ message: "Please input your email" });
  }
  if (error.name === "NoPasswordInput") {
    res.status(400).json({ message: "Please input your password" });
  }
  if (error.name === "InvalidUser") {
    res
      .status(401)
      .json({ message: "You have entered an invalid email or password" });
  }
  if (error.name === "InvalidToken" || error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid user credentials" });
  }
  if (error.name === "Unauthorized") {
    res.status(403).json({ message: "You are not authorized" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
