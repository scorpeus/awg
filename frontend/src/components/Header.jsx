import logo from "../assets/logo.svg"; // ✅ Импорт как путь к файлу
import "../styles/header.css"; // Стили
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu"; // Импортируем ProfileMenu

function Header({ title, setIsAuthenticated }) {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="AmneZeus Logo" className="logo-icon" />
        <span className="service-name">AmneZeus</span>
      </div>

      <div className="header-center">
        <h1 className="page-title">{title}</h1>
        <SearchBar />
      </div>

      {/* Передаем setIsAuthenticated в ProfileMenu */}
      <ProfileMenu setIsAuthenticated={setIsAuthenticated} />
    </header>
  );
}

export default Header;
