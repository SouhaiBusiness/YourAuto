"use client"

import { useEffect, useState } from "react"

function CarsFiltersOption({ carsList, setBrand, orderCarList }: any) {
  // Use the same car brands as in the dashboard for consistency
  const carBrands = ["Mercedes", "BMW", "Audi", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia"]

  // State to track which brands actually have cars in the database
  const [availableBrands, setAvailableBrands] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (carsList && carsList.length > 0) {
      // Create a set of brands that exist in the current car list
      const brandSet = new Set<string>()
      carsList.forEach((car: any) => {
        if (car.carBrand) {
          brandSet.add(car.carBrand)
        }
      })
      setAvailableBrands(brandSet)
    }
  }, [carsList])

  return (
    <div className="mt-10 flex items-center justify-between">
      <div>
        <h2 className="text-[30px] font-bold">Cars Catalog</h2>
        <h2>Explore our magazine of cars, you might surely like it!</h2>
      </div>

      <div className="flex gap-5">
        <select
          defaultValue=""
          className="select border border-gray-300 rounded-md p-2"
          onChange={(e) => orderCarList(e.target.value)}
        >
          <option value="" disabled>
            Price
          </option>
          <option value={1}>Max to Min</option>
          <option value={-1}>Min to Max</option>
        </select>

        <select
          defaultValue=""
          className="select border border-gray-300 rounded-md p-2 w-full md:block max-w-xs hidden"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="" disabled>
            Brand
          </option>
          {/* Show all brands option */}
          <option value="all">All Brands</option>

          {/* Map through the predefined car brands */}
          {carBrands.map(
            (brand, index) =>
              // Only show brands that have cars in the database
              availableBrands.has(brand) && (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ),
          )}
        </select>
      </div>
    </div>
  )
}

export default CarsFiltersOption

