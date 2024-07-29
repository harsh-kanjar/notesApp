import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");  // redirect
  }
  let location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          notesApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        
          {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-light mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-light mx-1" to="/signup" role="button">
              Signup
            </Link>
          </form>:<button onClick={handleLogout} className="btn btn-light">Logout</button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
