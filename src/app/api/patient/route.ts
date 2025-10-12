/* eslint-disable */
import connectToDatabase from "@/lib/db";
import Patient from "@/models/patients";
import { NextResponse } from "next/server";

// get all patients
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const patients = await Patient.find();

    return NextResponse.json(patients, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 },
    );
  }
}
// add a patient
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.email || !data.age || !data.doctor) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const existpatient = await Patient.findOne({ email: data.email });

    if (existpatient) {
      return NextResponse.json(
        { error: "Patient already exists" },
        { status: 400 },
      );
    }

    const newPatient = new Patient(data);
    await newPatient.save();

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 },
    );
  }
}
