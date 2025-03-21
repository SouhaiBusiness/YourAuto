import { NextResponse } from "next/server"
import { createCar, getCars } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Get pagination parameters from URL
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "8")

    // Get paginated cars
    const result = await getCars(page, limit)

    // Add cache headers - cache for 1 minute
    const response = NextResponse.json({
      carsList: result.cars || [],
      pagination: result.pagination,
    })

    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300")

    return response
  } catch (error) {
    console.error("Failed to fetch cars:", error)
    // Return an empty array on error
    return NextResponse.json(
      {
        carsList: [],
        pagination: { total: 0, page: 1, limit: 8, totalPages: 0 },
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create a new car with the data
    const car = {
      name: data.name,
      price: Number.parseFloat(data.price),
      carBrand: data.carBrand,
      carType: data.carType,
      seats: Number.parseInt(data.seats),
      carAvg: Number.parseFloat(data.carAvg),
      image: {
        url: data.imageUrl, // This will still be a base64 string for now
      },
      createdAt: new Date(),
    }

    const result = await createCar(car)

    return NextResponse.json({
      success: true,
      car: { ...car, id: result.insertedId },
    })
  } catch (error) {
    console.error("Error creating car:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create car",
      },
      { status: 500 },
    )
  }
}

