export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="data:image/jpeg;base64,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" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>About Me</a>
              </li>
              <li>
                <a>Matches</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Logo</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-error">logout</button>
        </div>
      </div>
    </>
  );
}
