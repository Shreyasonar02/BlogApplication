// App.js
import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Search from './components/Search';
import useFetch from './hooks/useFetch';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload.blogs };
    case 'ADD_BLOG':
      const newBlog = {
        ...action.payload.blog,
        date: action.payload.blog.date || new Date().toISOString(),
      };
      return { ...state, blogs: [newBlog, ...state.blogs] };
    case 'DELETE_BLOG':
      return { ...state, blogs: state.blogs.filter((_, index) => index !== action.payload.index) };
    case 'UPDATE_BLOG':
      const updatedBlogs = state.blogs.map((blog, index) =>
        index === action.payload.index ? { ...blog, body: action.payload.updatedBlog } : blog
      );
      return { ...state, blogs: updatedBlogs };
    default:
      return state;
  }
};

const App = () => {
  const { data: posts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [state, dispatch] = useReducer(reducer, { blogs: [] });

  useEffect(() => {
    if (posts) {
      
      const blogsWithDefaultDate = posts.map((post) => ({
        ...post,
        date: post.date || new Date().toISOString(),
      }));

      dispatch({ type: 'SET_BLOGS', payload: { blogs: blogsWithDefaultDate } });
    }
  }, [posts]);

  return (
    <Router>
      <div className="body" style={{ backgroundImage: 'url("src/landing.jpg")', backgroundSize: 'cover' }}>

        <div className="Task-Bar" style={{ backgroundColor: 'black', color: 'white',padding: '25px'}}>
          <h1>Blog Posts</h1>
          <div className='Content' style={{ marginTop: '10px' }}>
            <Link to="/">
              <Button variant="outline-light">Home</Button>
            </Link>
            <Link to="/add" style={{ marginLeft: '10px' }}>
              <Button variant="outline-light">Create Post</Button>
            </Link>
            <Link to="/search" style={{ marginLeft: '10px' }}>
              <Button variant="outline-light">Search</Button>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<BlogList blogs={state.blogs} dispatch={dispatch} />} />
          <Route path="/add" element={<BlogForm addBlog={dispatch} />} />
          <Route path="/search" element={<Search blogs={state.blogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
