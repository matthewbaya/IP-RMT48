import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <div className="container mx-auto w-3/4">
        <h1 className="text-xl text-center my-10 ">Login Page</h1>
        <LoginForm></LoginForm>
        <p>
          Don&apos;t have an account yet?
          <Link to={"/register"} className="link">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
