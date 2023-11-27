import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from 'react-modal';
import '../styles/BlogForm.css';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

const BlogForm = ({ addBlog }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    addBlog({ blog: data });
    closeModal();
  };

  return (
    <>
      <button type="button" className="btn btn-success" onClick={openModal}>
        Add
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post Modal"
      >
        <form onSubmit={handleSubmit(onSubmit)} className='Form'>
          <div>
            <label>Title</label>
            <input
              type="text"
              {...register('title')}
            />
            <p className="error-message">{errors.title?.message}</p>
          </div>

          <div>
            <label>Body</label>
            <textarea
              {...register('body')}
            />
            <p className="error-message">{errors.body?.message}</p>
          </div>

          <button type="submit" className="btn btn-success">
            Create Post
          </button>
        </form>
      </Modal>
    </>
  );
};

export default BlogForm;
