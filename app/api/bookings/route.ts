import { NextResponse } from "next/server"
import { createBooking, getBookings } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const bookings = await getBookings()
    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create a new booking with the data
    const booking = {
      ...data,
      createdAt: new Date(),
    }

    const result = await createBooking(booking)

    return NextResponse.json({
      success: true,
      booking: { ...booking, id: result.insertedId },
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

