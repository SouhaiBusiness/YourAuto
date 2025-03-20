"use client"
import { useEffect, useState } from "react"
import { PiSteeringWheelFill } from "react-icons/pi"
import { MdAirlineSeatReclineNormal } from "react-icons/md"
import { FaGasPump } from "react-icons/fa"
import Image from "next/image"

const CarCard = (props: any) => {
  const [car, setCar] = useState<any>()
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (props.car) {
      setCar(props.car)
    }
  }, [props.car])

  // Return null if car is undefined
  if (!car) return null

  // Handle image error
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="group bg-gray-100 p-2 sm:p-5 hover:bg-white hover:border-[1px] duration-500 cursor-pointer border-orange-500 rounded-3xl m-1 sm:m-5">
      <h2 className="text-[20px] font-medium mb-2">{car.name}</h2>
      <h2 className="text-[28px] font-bold mb-2">
        {car.price}
        <span className="text-[12px] font-light mb-2">$</span>
        <span className="text-[12px] font-light mb-2"> /day</span>
      </h2>
      <div className="flex justify-center items-center">
        {car.image?.url && !imageError ? (
          <Image
            src={car.image.url || "/placeholder.svg"}
            alt={car.name || "Car Image"}
            width={220}
            height={200}
            className="w-[250px] h-[150px] mb-3 object-contain"
            onError={handleImageError}
          />
        ) : (
          <div className="w-[250px] h-[150px] mb-3 flex items-center justify-center bg-gray-200 text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      <div className="flex justify-around group-hover:hidden">
        <div className="text-center text-gray-500">
          <PiSteeringWheelFill className="w-full text-[22px] mb-2" />
          <h2 className="line-clamp-5 text-[14px] font-light text-center">{car.carType}</h2>
        </div>

        <div className="text-center text-gray-500">
          <MdAirlineSeatReclineNormal className="w-full text-[22px] mb-2" />
          <h2 className="line-clamp-5 text-[14px] font-light text-center">{car.seats} Seat</h2>
        </div>

        <div className="text-center text-gray-500">
          <FaGasPump className="w-full text-[22px] mb-2" />
          <h2 className="line-clamp-5 text-[14px] font-light text-center">{car.carAvg} MPG</h2>
        </div>
      </div>

      <button
        className="hidden group-hover:flex bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-lg
       text-white w-full px-5 justify-between"
      >
        Rent Now
        <span className="bg-orange-400 p-1 rounded-md">
          <svg
            width="100"
            height="50"
            viewBox="0 0 100 50"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
          >
            <line x1="10" y1="25" x2="80" y2="25" stroke="black" strokeWidth="4" />
            <polyline points="60,10 80,25 60,40" fill="none" stroke="black" strokeWidth="4" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default CarCard

