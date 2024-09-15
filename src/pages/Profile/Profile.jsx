import React from 'react';
import HomeLayout from '../../Layout/HomeLayout';
import { MdLogout, MdDelete, MdDone } from 'react-icons/md';
import { RiUserFollowFill } from 'react-icons/ri';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <HomeLayout>
      <section className="min-h-screen relative pt-5 bg-gray-950">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <a href="/profile-image" className="w-max">
              <img
                src="/profile-image"
                alt="user-avatar-image"
                className="rounded-full w-32 h-32 object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center sm:items-end justify-between mb-3">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-white mb-1">
                John Doe
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500">
                johndoe@example.com
              </p>
              <div className="flex items-center gap-4">
                <p className="mt-2 font-normal text-base leading-7 text-gray-400">
                  500 Followers
                </p>
                <span className="font-bold text-gray-400">.</span>
                <p className="mt-2 font-normal text-base leading-7 text-gray-400">
                  300 Following
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="py-2 px-5 text-sm text-gray-300 items-center border-r-[1px] border-gray-300">
                Registered Jan 1, 2023
              </div>
              <div className="rounded-md px-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="none">
                  <path
                    className="stroke-gray-300 transition-all duration-500"
                    d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                    stroke="#374151"
                  />
                </svg>
                <p className="px-2 py-2 text-sm font-medium items-center text-gray-300">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-800 h-[1px] mb-2"></div>
          <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row rounded-md w-full py-1.5 md:py-3">
                <div
                  className="hover:cursor-pointer text-light-blue-light rounded-md bg-gray-800 hover:text-white inline-flex items-center mr-4 px-4 py-2 text-gray-400 gap-4"
                  title="Logout"
                >
                  <MdLogout className="w-5 h-5" /> Logout
                </div>
                <div
                  className="hover:cursor-pointer text-light-blue-light bg-gray-800 hover:text-white inline-flex items-center mr-4 px-4 rounded-md py-2 text-gray-400 gap-4"
                  title="Delete account"
                >
                  <MdDelete className="w-5 h-5" /> Delete Account
                </div>
                <Link
                  to="/following"
                  className="hover:cursor-pointer text-light-blue-light bg-gray-800 hover:text-white inline-flex items-center mr-4 px-4 rounded-md py-2 text-gray-400 gap-4"
                  title="Following"
                >
                  <RiUserFollowFill className="w-5 h-5" /> Following
                </Link>
                <Link
                  to="/followers"
                  className="hover:cursor-pointer text-light-blue-light bg-gray-800 hover:text-white inline-flex items-center mr-4 px-4 rounded-md py-2 text-gray-400 gap-4"
                  title="Followers"
                >
                  <IoPerson className="w-5 h-5" /> Followers
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              <Link to="/questions">
                <button className="py-2 px-5 rounded-md bg-gray-800 text-white text-base transition-all hover:bg-slate-700">
                  10 Questions
                </button>
              </Link>
              <Link to="/answers">
                <button className="py-2 px-5 rounded-md bg-gray-800 text-white text-base transition-all hover:bg-slate-700">
                  5 Solutions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default ProfilePage;
