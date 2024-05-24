import { useNavigate, Link } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="w-64 h-screen bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">DateMe</h1>
        </div>
        <ul className="menu p-4 overflow-y-auto">
          <li className="menu-title">
            <span>Menu</span>
          </li>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>

          <li>
            <Link to="/matches" href="#">
              Matches
            </Link>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
