import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useTheme } from '../context/ThemeContext';

function PostCard({ post, onDelete }) {
  const { theme } = useTheme();
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleConfirmarBorrado = () => {
    onDelete(post.id);
    setModalAbierto(false);
  };

  return (
    <div className={`post-card ${theme}`}>
      <h3>{post.title}</h3>
      <p>{post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}</p>

      <div className="btn-group">
        <Link to={`/posts/${post.id}`}>
          <button className="btn btn-primary">Ver detalle</button>
        </Link>

        <Link to={`/edit-post/${post.id}`}>
          <button className="btn btn-secondary">Editar</button>
        </Link>

        <button className="btn btn-danger" onClick={() => setModalAbierto(true)}>
          Eliminar
        </button>
      </div>

      <ConfirmDeleteModal
        estaAbierto={modalAbierto}
        onConfirmar={handleConfirmarBorrado}
        onCancelar={() => setModalAbierto(false)}
      />
    </div>
  );
}

export default PostCard;