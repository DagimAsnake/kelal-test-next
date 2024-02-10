'use client';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  updatePost,
  getPostById,
  selectPostById,
  selectLoading,
  selectError,
} from '@/features/crud/crudSlice';

const Edit = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { editId } = params;

  const songList = useSelector((state) => selectPostById(state, editId));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getPostById(editId));
  }, [dispatch, editId]);

  const [song, setSong] = useState({
    title: songList.title,
    body: songList.body,
    _id:  editId,
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
      validationErrors.body = 'Body is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

      const updatedSongData = {
        postId: editId, // Pass the postId
        postData: {     // Pass the updated data
          title: song.title,
          body: song.body,
        },
      };

    dispatch(updatePost(updatedSongData));
    router.push(`/details/${editId}`);

    setErrors({});
  };


  if (loading) {
    return (
      <div className='text-2xl font-bold my-4 text-center'>Loading...</div>
    );
  }

  if (error) {
    return (
      <div className='text-2xl font-bold my-4 text-center'>Error: {error}</div>
    );
  }

  if (!song) {
    return (
      <div className='text-2xl font-bold my-4 text-center'>Song not found</div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl text-center font-bold mb-4'>Edit a Song</h1>

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
          Update Song
        </button>
      </div>
    </div>
  );
};

export default Edit;
