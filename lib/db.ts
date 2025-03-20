import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getDatabase() {
  const client = await clientPromise
  return client.db("car-rental")
}

// Cars collection functions
export async function getCars(page = 1, limit = 8) {
  const db = await getDatabase()
  const skip = (page - 1) * limit

  // Get total count for pagination
  const totalCount = await db.collection("cars").countDocuments({})

  // Get paginated results
  const cars = await db
    .collection("cars")
    .find({})
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(limit)
    .toArray()

  return {
    cars,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    },
  }
}

export async function getCarById(id: string) {
  const db = await getDatabase()
  return db.collection("cars").findOne({ _id: new ObjectId(id) })
}

export async function createCar(car: any) {
  const db = await getDatabase()
  return db.collection("cars").insertOne(car)
}

export async function updateCar(id: string, car: any) {
  const db = await getDatabase()
  return db.collection("cars").updateOne({ _id: new ObjectId(id) }, { $set: car })
}

export async function deleteCar(id: string) {
  const db = await getDatabase()
  return db.collection("cars").deleteOne({ _id: new ObjectId(id) })
}

// Bookings collection functions
export async function getBookings() {
  const db = await getDatabase()
  return db.collection("bookings").find({}).toArray()
}

export async function createBooking(booking: any) {
  const db = await getDatabase()
  return db.collection("bookings").insertOne(booking)
}

