import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function registerUser() {
    try {
      let { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          username,
          email,
          password,
          displayName,
          gender,
          bio,
          imageUrl,
        },
      });
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    registerUser();
  };
  return (
    <>
      <div className="form-control">
        <form action="" onSubmit={handleRegister}>
          <label className="input input-bordered flex items-center gap-2 mb-5">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="grow"
              name="displayName"
              placeholder="username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-5 mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              placeholder="Password"
              type="password"
              className="grow"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-5">
            <input
              type="text"
              className="grow"
              name="displayName"
              placeholder="Display Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <select
            className="select select-bordered w-full max-w-xs mb-5"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled selected>
              What's your gender?
            </option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
          <label className="flex items-center gap-2 mb-5">
            <textarea
              className="textarea textarea-bordered grow"
              name="bio"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-5">
            <input
              type="text"
              className="grow"
              name="imageUrl"
              placeholder="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <button className="btn mb-5">Register</button>
        </form>
      </div>
    </>
  );
}
