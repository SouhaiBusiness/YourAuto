"use client"

import React from 'react';

function SearchInput() {
  return (
    <div className="mt-5">
      <h1 className='text-center text-[20px] text-gray-400 mb-3'>
        Search what are you looking for
      </h1>
      <div className='flex justify-center'>
        <div className='flex bg-gray-400 p-1 px-5 gap-2 divide-x rounded-full'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 text-black w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
              />
            </svg>

            <input
              type='text'
              placeholder='location'
              className='p-2 outline-none text-black'
            />
          </div>

          <div>
            <input
              type="date"
              className='p-2 outline-none text-black'
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchInput;
