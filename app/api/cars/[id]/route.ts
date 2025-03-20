import { type NextRequest, NextResponse } from "next/server";
import { deleteCar, getCarById, updateCar } from "@/lib/db";

// Define the correct type for context
interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, context: Params) {
  try {
    const { id } = context.params;
    const car = await getCarById(id);

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ car });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: Params) {
  try {
    const { id } = context.params;
    const data = await req.json();

    // Update the car with the data
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
      updatedAt: new Date(),
    };

    const result = await updateCar(id, car);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      car: { ...car, id },
    });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Params) {
  try {
    const { id } = context.params;
    const result = await deleteCar(id);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
