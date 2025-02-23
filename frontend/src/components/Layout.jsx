import Sidebar from "./Sidebar";
import "../styles/layout.css"; // ✅ Новый путь

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
      <aside className="right-section">
        <h2>Дополнительная информация</h2>
        <p>Здесь можно размещать виджеты или другую информацию.</p>
      </aside>
    </div>
  );
}

export default Layout;
