/* eslint-disable */
import Patient from "@/models/patients";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

// delete a patient
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const patient = await Patient.findByIdAndDelete(params.id);
    if (!patient) {
      return NextResponse.json({ error: "patient not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "patient deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 },
    );
  }
}

// update a patient
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const patient = await Patient.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    if (!patient) {
      return NextResponse.json({ error: "patient not found" }, { status: 404 });
    }
    return NextResponse.json(patient, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 },
    );
  }
}

// get  patient
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 
  await connectToDatabase();

  const patient = await Patient.findById(id);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json(patient, { status: 200 });
}
