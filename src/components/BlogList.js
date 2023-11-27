// BlogList.js

import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import { Button } from 'react-bootstrap';
import BlogPost from '../components/BlogPost'; 
import '../styles/BlogPost.css'; 


const BlogList = ({ blogs, dispatch }) => {
  const [updatedBlog, setUpdatedBlog] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(blogs.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleUpdate = (index) => {
    setUpdateMode(true);
    setCurrentIndex(index);
    setUpdatedBlog(blogs[index].body);
  };

  const handleUpdateConfirm = () => {
    if (currentIndex !== null) {
      const confirmed = window.confirm('Do you want to update this blog?');
      if (confirmed) {
        dispatch({ type: 'UPDATE_BLOG', payload: { index: currentIndex, updatedBlog } });
        setUpdatedBlog('');
        setUpdateMode(false);
        setCurrentIndex(null);
      }
    }
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm('Do you want to delete this blog?');
    if (confirmed) {
      dispatch({ type: 'DELETE_BLOG', payload: { index } });
    }
  };
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  return (
    <div className='container'>
      <h2>{getGreeting()}</h2>
      {!searchQuery && (
        <>
          <div className="row mt-5">
            {currentPosts.map((blog, index) => (
              <div key={index} className="col-md-3">
                <BlogPost
                  blog={blog}
                  index={index}
                  currentIndex={currentIndex}
                  updateMode={updateMode}
                  updatedBlog={updatedBlog}
                  setUpdatedBlog={setUpdatedBlog}
                  setUpdateMode={setUpdateMode}
                  setCurrentIndex={setCurrentIndex}
                  handleUpdateConfirm={handleUpdateConfirm}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(blogs.length / postsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BlogList;