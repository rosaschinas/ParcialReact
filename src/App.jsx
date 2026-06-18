import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import PostFormPage from './pages/PostFormPage.jsx';
import { useTheme } from './context/ThemeContext.jsx';

function App() {
  const { theme } = useTheme(); 

  return (
    <HashRouter>
      
      <div className={`app-container ${theme}`} style={{ minHeight: '100vh', backgroundColor: theme === 'light' ? '#ffffff' : '#1a202c', color: theme === 'light' ? '#2d3748' : '#f7fafc', transition: 'all 0.3s' }}>
        
        
        <Navbar />
        
        
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            
            <Route path="/" element={<PostsPage />} />
            
            
            <Route path="/posts/:id" element={<PostDetailPage />} />
            
            
            <Route path="/add-post" element={<PostFormPage />} />
            
            
            <Route path="/edit-post/:id" element={<PostFormPage />} />
          </Routes>
        </main>

      </div>
    </HashRouter>
  );
}

export default App;
