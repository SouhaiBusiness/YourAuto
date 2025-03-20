import { type NextRequest, NextResponse } from "next/server"
import { createCar, getCars } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters from URL
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "8")

    // Get paginated cars
    const result = await getCars(page, limit)

    return NextResponse.json({
      carsList: result.cars || [],
      pagination: result.pagination,
    })
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

export async function POST(request: NextRequest) {
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
        url: data.imageUrl, // This will now be a base64 string
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

