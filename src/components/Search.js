import React, { useState } from 'react';
import '../styles/Search.css';


const Search = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const renderPosts = (posts) =>
    posts.map(({ title, body, date }, index) => (
      <div key={index} className="Post">
        <h3>{title}</h3>
        <p>{body}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
      </div>
    ));

  return (
    <div className='content-view'>
      <h2>Search Posts</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!e.target.value.trim()) {
              setSearchResults([]);
            }
          }}
        />
        <button className="btn btn-info" onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchQuery ? renderPosts(searchResults) : renderPosts(blogs)}
    </div>
  );
};

export default Search;
