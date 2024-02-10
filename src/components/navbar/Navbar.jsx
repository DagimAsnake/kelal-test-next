import Link from 'next/link';
import { FaMusic } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white py-4'>
      <div className='container max-w-screen-md mx-auto flex justify-between items-center'>
        <Link href='/' className='text-lg font-bold flex items-center ml-2'>
          <FaMusic className='mr-2' />
          Song App
        </Link>
        <div>
          <Link href='/' className='mr-4'>
            Home
          </Link>
          <Link href='/add' className='mr-4'>
            Add
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
