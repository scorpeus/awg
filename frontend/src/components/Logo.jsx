import logo from "../assets/logo.svg"; // Импорт изображения

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="AmneZeus Logo" className="logo-icon" />
      <span className="logo-text">AmneZeus</span>
    </div>
  );
};

export default Logo;
