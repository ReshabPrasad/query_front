import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = ({ children }) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', link: '/' },
    { id: 2, text: 'Users', link: '/users' },
    { id: 3, text: 'Explore', link: '/explore' },
    { id: 4, text: 'Profile', link: '/profile' },
  ];

  return (
    <>
      <div className='bg-[#024959] flex justify-between items-center h-15 max-w-full px-4 text-white w-full fixed shadow-xl'>
        {/* Logo */}
        <h1 className='w-full text-xl font-bold text-[#9FC131]'>Querify</h1>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex'>
          {navItems.map((item) => (
            <li key={item.id} className='p-4 hover:bg-[#026773] text-[#6fffff]'>
              <Link to={item.link}>{item.text}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Logo */}
          <h1 className='w-full text-3xl font-bold text-white m-4'>Querify</h1>

          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <li key={item.id} className='p-4 rounded-xl text-white'>
              <Link to={item.link}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex p-4 justify-center'>{children}</div>
    </>
  );
};

export default Navbar;
