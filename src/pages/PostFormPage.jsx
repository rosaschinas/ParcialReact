import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsService } from '../services/posts.service';
import { usePosts } from '../context/PostsContext';

function PostFormPage() {
  const { id } = useParams();
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
    <div>
      <h2>{esEdicion ? 'Editar post' : 'Nuevo post'}</h2>
      {error && <p>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          ref={tituloRef}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título"
        />

        <textarea
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          placeholder="Contenido"
        />

        <button type="submit">
          {esEdicion ? 'Guardar cambios' : 'Crear post'}
        </button>
      </form>
    </div>
  );
}

export default PostFormPage;