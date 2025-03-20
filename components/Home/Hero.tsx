"use client"
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
       <div className="slideRight">
          <h2 className=" text-[50px] md:text-[60px] font-bold">Drive Your Dreams </h2>
          <h1 className='text-[20px] text-gray-500 pr-20 mt-5'><span className="text-orange-500">YourAuto</span> offers Premium vehicles for every journey, at prices that won't slow you down.</h1>
          <button className='p-2 mt-5 bg-orange-500 text-white rounded-full px-4 hover:scale-105 transition-all '>Explore Gallery</button>
       </div>

       <div className="home-img">
          <Image src='/Mercedes.png' alt='hero' width={400} height={400} className='cover-fit w-full all'/>      
       </div>
    </div>
  )
}

export default Hero
