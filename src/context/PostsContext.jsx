import { createContext, useState, useContext, useEffect } from 'react';
import { postsService } from '../services/posts.service';

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const datos = await postsService.getAll();
        setPosts(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarPosts();
  }, []);

  const eliminarPost = async (id) => {
    try {
      await postsService.delete(id);
      setPosts(postsPrevios => postsPrevios.filter(post => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const crearPost = async (nuevoPostData) => {
    try {
      const postCreado = await postsService.create(nuevoPostData);
      setPosts(postsPrevios => [...postsPrevios, postCreado]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editarPost = async (postEditadoData) => {
    try {
      const postModificado = await postsService.update(postEditadoData);
      setPosts(postsPrevios =>
        postsPrevios.map(post => post.id === postModificado.id ? postModificado : post)
      );
    } catch (err) {
      setPosts(postsPrevios =>
        postsPrevios.map(post => post.id === postEditadoData.id ? postEditadoData : post)
      );
    }
  };

  return (
    <PostsContext.Provider value={{ posts, loading, error, crearPost, editarPost, eliminarPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts debe ser usado dentro de un PostsProvider');
  }
  return context;
}