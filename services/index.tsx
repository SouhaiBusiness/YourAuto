// Updated services with better error handling, default values, and pagination

export const getCarsList = async (page = 1, limit = 8) => {
  try {
    const response = await fetch(`/api/cars?page=${page}&limit=${limit}`)

    if (!response.ok) {
      console.error("Error fetching cars:", response.statusText)
      return {
        carsList: [],
        pagination: { total: 0, page, limit, totalPages: 0 },
      }
    }

    const data = await response.json()

    // Make sure we're returning the expected format
    return {
      carsList: data.carsList || [], // Ensure we always return an array
      pagination: data.pagination || { total: 0, page, limit, totalPages: 0 },
    }
  } catch (error) {
    console.error("Error fetching cars:", error)
    return {
      carsList: [],
      pagination: { total: 0, page, limit, totalPages: 0 },
    }
  }
}

export const getStoreLocations = async () => {
  // You can implement this with MongoDB later
  // For now, return mock data
  return {
    storesLocations: [
      { address: "New York, NY" },
      { address: "Los Angeles, CA" },
      { address: "Chicago, IL" },
      { address: "Houston, TX" },
      { address: "Miami, FL" },
    ],
  }
}

export const createBooking = async (bookingData: any) => {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      console.error("Error creating booking:", response.statusText)
      return false
    }

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("Error creating booking:", error)
    return false
  }
}

