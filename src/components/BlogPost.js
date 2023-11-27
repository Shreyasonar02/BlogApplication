// BlogPost.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FiEdit, FiTrash, FiEye } from 'react-icons/fi'; 
import '../styles/BlogPost.css'; 

const BlogPost = ({
  blog,
  index,
  currentIndex,
  updateMode,
  updatedBlog,
  setUpdatedBlog,
  setUpdateMode,
  setCurrentIndex,
  handleUpdateConfirm,
  handleUpdate,
  handleDelete,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className='Post mt-3'>
      <h3 className="post-title">{blog.title}</h3>
      {!showFullContent && <p>{blog.body.slice(0, 100)}...</p>}
      {showFullContent && <p>{blog.body}</p>}
      <p>Date: {new Date(blog.date).toLocaleDateString()}</p>
      <div className="button-container">
        {updateMode && currentIndex === index && (
          <div>
            <textarea
              value={updatedBlog}
              onChange={(e) => setUpdatedBlog(e.target.value)}
            />
            <Button variant="success" onClick={handleUpdateConfirm}>
              Save <FiEye />
            </Button>
          </div>
        )}
        {!updateMode && (
          <>
            <Button variant="info" onClick={() => setShowFullContent(!showFullContent)}>
              {showFullContent ? 'Read Less' : 'Read More'} <FiEye />
            </Button>
            <Button variant="warning" onClick={() => handleUpdate(index)}>
              Edit <FiEdit />
            </Button>
            <Button variant="danger" onClick={() => handleDelete(index)}>
              Delete <FiTrash />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
