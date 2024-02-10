"use client"
import { useEffect } from 'react';
import Link from 'next/link';
import { GiLoveSong } from 'react-icons/gi';
import {  useDispatch, useSelector } from 'react-redux';
import { getAllPosts, selectAllPosts, selectLoading  } from '@/features/crud/crudSlice';

const Home  = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectLoading);


  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  const songList = posts

  if (loading) {
    return <div className='text-2xl font-bold my-4 text-center'>Loading...</div>;
  }

  return (
    <div className='container mx-auto px-3'>
      <h1 className='text-2xl font-bold my-4 text-center'>
        Welcome CRUD app
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {songList?.map((song) => (
          <div key={song?.id} className='bg-gray-100 p-4 rounded-md shadow-md'>
            <div className='text-lg font-bold flex items-center justify-center'>
              <GiLoveSong className='ml-3' />
              <h2 className='text-xl font-semibold pt-2 mb-2 text-center'>
                {song.title}
              </h2>
            </div>
            <div className='flex justify-center'>
              <Link
                href={`/details/${song.id}`}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
