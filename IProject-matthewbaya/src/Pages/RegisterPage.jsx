import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-xl text-center my-10">Register Page</h1>
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
