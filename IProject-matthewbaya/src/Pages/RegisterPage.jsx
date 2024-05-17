import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  async function createUser() {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          username,
          email,
          password,
          gender,
          bio,
          imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container ">
        <h1>Register Page</h1>
        <RegisterForm></RegisterForm>
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="link">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
