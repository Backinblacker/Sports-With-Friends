import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Sports with Friends</b>
          </Link>
        </li>
        <li className="dropdown">
          <button className="dropbtn">Menu
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/home">Home</Link>
            {/* Need to Fix */}
            {/* <Link to={`/user/${user.id}`}>User Profile</Link> */}
            <Link to="/favorites">Favorites</Link>
            {user ? (
              <a onClick={logoutUser}>Logout</a>
            ) : (
              <a onClick={() => navigate("/login")}>Login</a>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
