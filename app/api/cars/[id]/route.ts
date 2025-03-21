import { NextResponse } from "next/server";
import { deleteCar, getCarById, updateCar } from "@/lib/db";

// ✅ Ensure `context` is correctly typed
export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ error: "Missing car ID" }, { status: 400 });
    }

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

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ error: "Missing car ID" }, { status: 400 });
    }

    const data = await req.json();

    const car = {
      name: data.name,
      price: Number.parseFloat(data.price),
      carBrand: data.carBrand,
      carType: data.carType,
      seats: Number.parseInt(data.seats),
      carAvg: Number.parseFloat(data.carAvg),
      image: { url: data.imageUrl },
      updatedAt: new Date(),
    };

    const result = await updateCar(id, car);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, car: { ...car, id } });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ error: "Missing car ID" }, { status: 400 });
    }

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
