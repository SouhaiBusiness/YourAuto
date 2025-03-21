"use client"

import Hero from "@/components/Home/Hero"
import SearchInput from "@/components/Home/SearchInput"
import CarsFiltersOption from "@/components/Home/CarsFiltersOption"
import { getCarsList } from "@/services"
import { useEffect, useState } from "react"
import CarsList from "@/components/Home/CarsList"
import ToastMsg from "@/components/ToastMsg"
import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext"
import { Pagination } from "@/components/ui/pagination"

export default function Home() {
  const [carsList, setCarsList] = useState<any>([])
  const [carsOrgList, setCarsOrgList] = useState<any>([])
  const [showToastMsg, setShowToastMsg] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [limit] = useState<number>(8) // Number of cars per page

  useEffect(() => {
    getCarList_()
  }, [currentPage]) // Fetch cars when page changes

  const getCarList_ = async () => {
    setIsLoading(true)
    try {
      const result: any = await getCarsList(currentPage, limit)
      setCarsList(result?.carsList || [])
      setCarsOrgList(result?.carsList || [])
      setTotalPages(result?.pagination?.totalPages || 1)
    } catch (error) {
      console.error("Error fetching cars:", error)
      // Set empty arrays as fallback
      setCarsList([])
      setCarsOrgList([])
    } finally {
      setIsLoading(false)
    }
  }

  const filterCarList = (brand: string) => {
    if (!carsOrgList || carsOrgList.length === 0) return

    if (brand === "all") {
      // Show all cars when "All Brands" is selected
      setCarsList(carsOrgList)
      return
    }

    const filterList = carsOrgList.filter((item: any) => item.carBrand === brand)
    setCarsList(filterList)
  }

  const orderCarList = (order: string) => {
    if (!carsOrgList || carsOrgList.length === 0) return;
  
    const orderValue = Number(order); // Convert string to number
    const sortedData = [...carsOrgList].sort((a, b) => (orderValue === -1 ? a.price - b.price : b.price - a.price));
  
    setCarsList(sortedData);
  };

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    if (showToastMsg) {
      setTimeout(() => {
        setShowToastMsg(false)
      }, 4000)
    }
  }, [showToastMsg])

  return (
    <div className="p-5 sm:px-10 md:px-20">
      <BookCreatedFlagContext.Provider value={{ showToastMsg, setShowToastMsg }}>
        <Hero />
        {/*<SearchInput />*/}
        <CarsFiltersOption
          carsList={carsOrgList}
          orderCarList={(value: string) => orderCarList(value)}
          setBrand={(value: string) => filterCarList(value)}
        />
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <CarsList carsList={carsList} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
        {showToastMsg ? <ToastMsg msg={"You successfully Rent the car !"} /> : null}
      </BookCreatedFlagContext.Provider>
    </div>
  )
}

