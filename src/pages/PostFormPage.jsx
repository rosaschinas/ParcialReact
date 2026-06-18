import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsService } from '../services/posts.service';
import { usePosts } from '../context/PostsContext';
import { useTheme } from '../context/ThemeContext';

function PostFormPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const esEdicion = !!id;

  const { crearPost, editarPost } = usePosts();

  const [formData, setFormData] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(esEdicion);
  const [error, setError] = useState(null);

  const tituloRef = useRef(null);

  useEffect(() => {
    if (tituloRef.current) {
      tituloRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (esEdicion) {
      const cargarPost = async () => {
        try {
          const data = await postsService.getById(id);
          setFormData({ title: data.title, body: data.body });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      cargarPost();
    }
  }, [id, esEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (esEdicion) {
        await editarPost({ id, ...formData });
      } else {
        await crearPost(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando post...</p>;

  return (
    <div className={`form-container ${theme}`}>
      <h2>{esEdicion ? 'Editar post' : 'Nuevo post'}</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          ref={tituloRef}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título"
          className="form-control"
          required
        />

        <textarea
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          placeholder="Contenido"
          className="form-control"
          required
        />

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            {esEdicion ? 'Guardar cambios' : 'Crear post'}
          </button>
          <Link to="/">
            <button type="button" className="btn btn-secondary">Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PostFormPage;