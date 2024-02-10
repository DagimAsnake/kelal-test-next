"use client"
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { createPost } from '@/features/crud/crudSlice';

const Add = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [song, setSong] = useState({
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setSong((prevSong) => ({
      ...prevSong,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleAddSong = () => {
    const validationErrors = {};

    if (!song.title) {
      validationErrors.title = 'Title is required.';
    }
    if (!song.body) {
      validationErrors.body = 'Artist is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(createPost(song));
    router.push('/')

    setSong({
      title: '',
      body: '',
    });
    setErrors({});
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl text-center font-bold mb-4'>Add a Song</h1>

      <div className='max-w-md mx-auto bg-white p-4 rounded-md shadow-md'>
        <div className='mb-4'>
          <label htmlFor='title' className='font-semibold'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className={`${
              errors.title ? 'border-red-500' : ''
            } w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={song.title}
            onChange={handleInputChange}
            onBlur={() => handleBlur('title')}
          />
          {errors.title && (
            <p className='text-red-500 text-xs italic'>{errors.title}</p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='body' className='font-semibold'>
            Body
          </label>
          <input
            type='text'
            id='body'
            name='body'
            className={`${
              errors.body ? 'border-red-500' : ''
            } w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={song.body}
            onChange={handleInputChange}
            onBlur={() => handleBlur('body')}
          />
          {errors.body && (
            <p className='text-red-500 text-xs italic'>{errors.body}</p>
          )}
        </div>

        <button
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-full flex items-center justify-center'
          onClick={handleAddSong}
        >
          <FaPlus className='mr-2' />
          Add Song
        </button>
      </div>
    </div>
  );
};

export default Add;
