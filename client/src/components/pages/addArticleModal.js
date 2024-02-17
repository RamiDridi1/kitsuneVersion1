import React, { useState } from 'react';
import axios from 'axios';
import {  useDispatch, useSelector } from 'react-redux'; // Import useSelector from react-redux

const AddArticleModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Fetch the authentication token from Redux state
  const user = useSelector((state) => state.user);

if (user && user.token) {
  console.log('User has a token:', user.token);
} else {
  console.log('User or token is missing.');
}
const dispatch = useDispatch();
const authToken = useSelector((state) => state.user.token);


const config = {
  headers: {
    'x-auth': authToken
  }
};
  const handleAddArticle = async () => {
    try {
      const config = {
        headers: {
          'x-auth': authToken,
        },
      };

      
      await axios.post('http://localhost:5001/api/post/add', { title, body }, config);
      
      onClose(); 
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div>
          <h2>Add Article</h2>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <button onClick={handleAddArticle}>Add Article</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AddArticleModal;



