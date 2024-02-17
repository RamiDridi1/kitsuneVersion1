import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';



const ArticlesList = ({
  editingArticle,
  setEditingArticle,
  editedTitle,
  setEditedTitle,
  editedBody,
  setEditedBody,
  fetchPosts,
}) => {
  
  const [posts, setPosts] = useState([]);

  
  const user = useSelector((state) => state.user);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/post/getall');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handle the deletion of an article
  const handleDelete = async (postId) => {
    try {
      // Delete the article
      await axios.delete(`http://localhost:5001/api/post/delete/${postId}`);

      // Fetch updated posts after deletion
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Handle the editing of an article
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

      // Make the API call to update the post
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
      <h2>Articles</h2>
      <ul>
        
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>

            
            {user && user.role === 'admin' && (
              <div>
                <button onClick={() => handleEdit(post._id)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ArticlesList;



















