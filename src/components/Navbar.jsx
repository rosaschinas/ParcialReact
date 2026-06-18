import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx'; 

function Navbar() {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <nav className={`navbar ${theme}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: theme === 'light' ? '#eee' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem', color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>📝 App de Posts</Link>
      </div>
      <div>
        <Link to="/" style={{ marginRight: '1rem', color: 'inherit' }}>Inicio</Link>
        <Link to="/add-post" style={{ marginRight: '1rem', color: 'inherit' }}>Nuevo Post</Link>
      </div>
      
      <button onClick={toggleTheme} style={{ cursor: 'pointer', padding: '0.3rem 0.7rem' }}>
        {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
      </button>
    </nav>
  );
}

export default Navbar;