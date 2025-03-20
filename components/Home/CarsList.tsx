"use client"

import { useState } from "react"
import CarCard from "./CarCard"
import BookingModal from "../CarBooking/BookingModal"

const CarsList = (props: any) => {
  const [selectedCar, setSelectedCar] = useState<any>()

  // Add a default empty array if carsList is undefined
  const carsList = props.carsList || []

  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {carsList.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No cars available. Please check back later.</p>
        </div>
      ) : (
        carsList.map((car: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              ;(document as any).getElementById("my_modal_4").showModal()
              setSelectedCar(car)
            }}
          >
            <CarCard car={car} />
          </div>
        ))
      )}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_4" className="modal">
        <BookingModal car={selectedCar} />
      </dialog>
    </div>
  )
}

export default CarsList

