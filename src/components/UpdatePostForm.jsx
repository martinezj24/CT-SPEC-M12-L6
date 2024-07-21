import React, { useState } from 'react';
import axios from 'axios';

const UpdatePostForm = ({ post, onPostUpdated }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, { title, body });
      onPostUpdated(); 
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
};

export default UpdatePostForm;
