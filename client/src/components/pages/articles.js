import React, { useState, useEffect } from 'react';
import ArticlesList from './articlesList';
import AddArticleModal from './addArticleModal';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Articles = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user); // Assuming you store user details in Redux state

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/post/getall');
      // Set the posts in the state
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const authToken = user.token;
      const config = {
        headers: {
          'x-auth': authToken,
        },
      };

      await axios.delete(`http://localhost:5001/api/post/delete/${postId}`, config);
      // Fetch updated posts after deletion
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (postId) => {
    // Set the article being edited
    setEditingArticle(postId);

    // Find the article to edit
    const articleToEdit = posts.find((post) => post._id === postId);

    // Set initial values for the form
    setEditedTitle(articleToEdit.title);
    setEditedBody(articleToEdit.body);
  };

  const handleUpdate = async () => {
    try {
      const authToken = user.token;
      const config = {
        headers: {
          'x-auth': authToken,
        },
      };

await axios.put(`http://localhost:5001/api/post/edit/${editingArticle}`, {
        title: editedTitle,
        body: editedBody,
      }, config);

      // Clear the editing state and fetch updated posts
      setEditingArticle(null);
      setEditedTitle('');
      setEditedBody('');
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      {user && user.role === 'admin' && (
        <button onClick={openModal}>Add Article</button>
      )}

      <AddArticleModal isOpen={isModalOpen} onClose={closeModal} />
      <ArticlesList posts={posts} handleDelete={handleDelete} handleEdit={handleEdit} setPosts={setPosts} />
    </div>
  );
};

export default Articles;





