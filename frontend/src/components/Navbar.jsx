import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import SystemIcon from "../assets/system.svg";
import InterfacesIcon from "../assets/interfaces.svg";
import UsersIcon from "../assets/users.svg";
import SubscriptionsIcon from "../assets/subscriptions.svg";

function Navbar({ setActiveTitle }) {
  const location = useLocation(); // Получаем текущий путь

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => setActiveTitle("System")}
          >
            <img src={SystemIcon} alt="System" className="nav-icon" />
            <span>System</span>
          </Link>
        </li>
        <li>
          <Link
            to="/interfaces"
            className={`nav-link ${
              location.pathname === "/interfaces" ? "active" : ""
            }`}
            onClick={() => setActiveTitle("Interfaces")}
          >
            <img src={InterfacesIcon} alt="Interfaces" className="nav-icon" />
            <span>Interfaces</span>
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className={`nav-link ${
              location.pathname === "/users" ? "active" : ""
            }`}
            onClick={() => setActiveTitle("Users")}
          >
            <img src={UsersIcon} alt="Users" className="nav-icon" />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/subscriptions"
            className={`nav-link ${
              location.pathname === "/subscriptions" ? "active" : ""
            }`}
            onClick={() => setActiveTitle("Subscriptions")}
          >
            <img
              src={SubscriptionsIcon}
              alt="Subscriptions"
              className="nav-icon"
            />
            <span>Subscriptions</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
