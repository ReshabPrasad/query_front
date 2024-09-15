import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa'; // Profile Icon
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Navbar = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const logout1 = () => {
    dispatch(logout());
    navigate('/login');
  };

  function profile(){
    navigate('/profile')
  }

  // Open drawer
  const [isOpen,setIsOpen] = useState(false);


  return (
    <>
      <div className="bg-[#024959] flex justify-between items-center h-15 max-w-full px-4 text-white w-full fixed shadow-xl z-[100]">
        {/* Logo */}
        <h1 className="w-full text-xl font-bold text-[#9FC131]">Querify</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex">
          <li className="p-4 hover:bg-[#026773] text-[#6FFFFF]">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 hover:bg-[#026773] text-[#6FFFFF]">
            <Link to="/users">Users</Link>
          </li>
          <li className="p-4 hover:bg-[#026773] text-[#6FFFFF]">
            <Link to="/explore">Explore</Link>
          </li>
        </ul>

        {/* Mobile Navigation Icon */}
        <div className="block md:hidden">
          <AiOutlineMenu size={20} />
        </div>

        {/* Profile Icon and Drawer */}
        <div
          
        >
          <div className="relative inline-block text-left z-[0]" >
                            <div>
                                <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex justify-center w-full shadow-sm px-4 py-2 focus:outline-none"
                                >
                                <BsThreeDotsVertical className="h-8 w-8 p-2 rounded-full hover:bg-gray-950" />
                                </button>
                            </div>

                            {isOpen && (
                                <div
                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 focus:outline-none z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                                >
                                    <div className="py-1" role="none">
                                        <h2
                                            className="block px-4 py-2 text-sm text-white font-semibold hover:cursor-pointer"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick = {profile}
                                        >
                                        Profile
                                        </h2>
                                        <h2
                                            className="block px-4 py-2 text-sm text-white font-semibold hover:cursor-pointer"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={logout1}
                                        >
                                        Logout
                                        </h2>
                                    </div>
                                </div>
                            )}
                        </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex p-4 justify-center">{children}</div>
    </>
  );
};

export default Navbar;
