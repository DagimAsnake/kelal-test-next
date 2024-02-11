'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { GiLoveSong } from 'react-icons/gi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostById,
  deletePost,
  selectPostById,
  selectLoading,
  selectError,
} from '@/features/crud/crudSlice';

const Details = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { detailsId } = params;

  const song = useSelector((state) => selectPostById(state, detailsId));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getPostById(detailsId));
  }, [dispatch, detailsId]);

  const songList = song

  const handleDelete = () => {
    dispatch(deletePost(detailsId));
    router.push('/');
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
      <div className='max-w-md mx-auto bg-white p-4 rounded-md shadow-md'>
        <h1 className='text-2xl text-center font-bold mb-4'>
          {songList?.title}
        </h1>
        <div className='flex items-center justify-center mb-4'>
          <GiLoveSong className='text-4xl text-red-500 mr-2' />
          <p className='text-xl'>{songList?.body}</p>
        </div>
        <div className='flex justify-center'>
          <Link
            href={`/edit/${songList?._id}`}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2 flex items-center'
          >
            <FaEdit className='mr-2' />
            Edit
          </Link>
          <button
            className='bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center'
            onClick={handleDelete}
          >
            <FaTrash className='mr-2' />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
