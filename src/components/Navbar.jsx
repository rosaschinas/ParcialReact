import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <div>
        <Link to="/" className="navbar-brand">📝 App de Posts</Link>
      </div>
      <div>
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/add-post" className="navbar-link">Nuevo Post</Link>
      </div>
      <button onClick={toggleTheme} className="btn-theme">
        {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
      </button>
    </nav>
  );
}

export default Navbar;