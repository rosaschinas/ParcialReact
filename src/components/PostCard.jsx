import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';

function PostCard({ post, onDelete }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleConfirmarBorrado = () => {
    onDelete(post.id);
    setModalAbierto(false);
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}</p>

      <div>
        <Link to={`/posts/${post.id}`}>
          <button>Ver detalle</button>
        </Link>

        <Link to={`/edit-post/${post.id}`}>
          <button>Editar</button>
        </Link>

        <button onClick={() => setModalAbierto(true)}>Eliminar</button>
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