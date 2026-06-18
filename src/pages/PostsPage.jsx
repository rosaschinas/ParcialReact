import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';

function PostsPage() {
  const { posts, loading, error, eliminarPost } = usePosts();

  if (loading) {
    return <p>Cargando posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Listado de Posts</h2>
      <p>Cantidad de posts: {posts.length}</p>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={eliminarPost}
        />
      ))}
    </div>
  );
}

export default PostsPage;