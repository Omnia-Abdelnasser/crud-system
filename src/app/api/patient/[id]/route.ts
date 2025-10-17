/* eslint-disable */
import Patient from "@/models/patients";
import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";

//  DELETE patient
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const patient = await Patient.findByIdAndDelete(id);
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

//  UPDATE patient
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const data = await req.json();
    await connectToDatabase();

    const patient = await Patient.findByIdAndUpdate(id, data, { new: true });
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

//  GET single patient
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const patient = await Patient.findById(id);
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
