'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex justify-between items-center p-3 px-5 shadow-md '>
      {/* Logo */}
      <div className='flex flex-col justify-center items-center '>
         <Image src='/Mercedes.png' alt='logo' width={95} height={95} />
         <span className="text-orange-500 font-bold mt-[-17px] translate-x-[22px]  rotate-[-19deg]">YourAuto</span>
      </div>

      {/* Hamburger Menu Icon (Mobile) */}
      <div className='lg:hidden cursor-pointer' onClick={toggleMenu}>
        {isMenuOpen ? (
          // Close (X) Icon
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        )}
      </div>

      {/* Navigation Links (Desktop) */}
      <div className='hidden lg:flex gap-5'>
        <Link href='/'>
          <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
            Home
          </h2>
        </Link>
        <Link href='/gallery'>
          <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
            Gallery
          </h2>
        </Link>
        <Link href='/about'>
          <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
            About Us
          </h2>
        </Link>
        <Link href='/contact'>
          <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
            Contact
          </h2>
        </Link>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`lg:hidden fixed top-18 left-0 w-full h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col gap-3 p-5 justify-center items-center'>
          <Link href='/'>
            <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
              Home
            </h2>
          </Link>
          <Link href='/gallery'>
            <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
              Gallery
            </h2>
          </Link>
          <Link href='/about'>
            <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
              About Us
            </h2>
          </Link>
          <Link href='/contact'>
            <h2 className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white font-bold cursor-pointer'>
              Contact
            </h2>
          </Link>
        </div>
      </div>

      {/* Clerk Authentication (Desktop and Mobile) */}
      <div className='hidden lg:block '>
        <SignedIn>
          <UserButton
            userProfileUrl='/dashboard?tab=profile'
            appearance={{
              elements: {
                userButtonAvatarBox: 'custom-user-button', // Add a custom class
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Link href='/sign-in'>
            <button className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white'>
              Sign In
            </button>
          </Link>
        </SignedOut>
      </div>

      {/* Clerk Authentication (Mobile) */}
      <div className='lg:hidden'>
        <SignedIn>
          <UserButton userProfileUrl='/dashboard?tab=profile' />
        </SignedIn>
        <SignedOut>
          <Link href='/sign-in'>
            <button className='hover:bg-orange-500 px-3 p-2 text-orange-500 rounded-full hover:text-white'>
              Sign In
            </button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;
