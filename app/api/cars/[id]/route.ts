import { type NextRequest, NextResponse } from "next/server"
import { deleteCar, getCarById, updateCar } from "@/lib/db"

// Using a different approach for typing params
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const car = await getCarById(context.params.id)

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ car })
  } catch (error) {
    console.error("Error fetching car:", error)
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Update the car with the data
    const car = {
      name: data.name,
      price: Number.parseFloat(data.price),
      carBrand: data.carBrand,
      carType: data.carType,
      seats: Number.parseInt(data.seats),
      carAvg: Number.parseFloat(data.carAvg),
      image: {
        url: data.imageUrl,
      },
      updatedAt: new Date(),
    }

    const result = await updateCar(context.params.id, car)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      car: { ...car, id: context.params.id },
    })
  } catch (error) {
    console.error("Error updating car:", error)
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const result = await deleteCar(context.params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting car:", error)
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 })
  }
}

