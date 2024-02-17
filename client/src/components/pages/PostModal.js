// AddArticleModal.js
import React, { useState } from 'react';
import axios from 'axios';

const AddArticleModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddArticle = async () => {
    try {
      // Perform validation if needed

      // Send a request to add the new article
      await axios.post('http://localhost:5001/api/post/add', {
        title,
        body,
        // Add other properties if needed
      });

      // Close the modal after adding the article
      onClose();
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>
        <h2>Add New Article</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button onClick={handleAddArticle}>Add Article</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddArticleModal;
