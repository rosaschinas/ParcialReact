import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postsService } from '../services/posts.service';
import { useTheme } from '../context/ThemeContext';
import { usePosts } from '../context/PostsContext';

function PostDetailPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { posts } = usePosts();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPost = async () => {
      try {
        const data = await postsService.getById(id);
        setPost(data);
      } catch (err) {
        const postLocal = posts.find(p => p.id === Number(id));
        if (postLocal) {
          setPost(postLocal);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPost();
  }, [id, posts]);

  if (loading) return <p>Cargando post...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`detail-container ${theme}`}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <div className="btn-group">
        <Link to="/">
          <button className="btn btn-secondary">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}

export default PostDetailPage;