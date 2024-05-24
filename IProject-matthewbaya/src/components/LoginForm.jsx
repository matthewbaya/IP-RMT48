import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginUser() {
    try {
      let { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email,
          password,
        },
      });
      console.log(data);
      localStorage.setItem("access_token", "Bearer " + data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser();
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const googleToken = response.credential;
    console.log({ googleToken });
    try {
      const { data } = await axios.post("http://localhost:3000/login/google", {
        googleToken,
      });
      console.log(data);
      localStorage.setItem("access_token", "Bearer " + data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "1071824266753-6upao1purtf4a975jpe730nls1hp5kd8.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="form-control">
        <form onSubmit={handleLogin}>
          <label className="input input-bordered flex items-center gap-2 mb-5">
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
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn mb-5">Login</button>
        </form>
      </div>
      <div className="mb-5">Or sign-in with</div>
      <div id="buttonDiv" className="mb-5"></div>
    </>
  );
}
