/* eslint-disable */

import connectToDatabase from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password, username } = await req.json();

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Database connection error" },
      { status: 500 },
    );
  }
}
