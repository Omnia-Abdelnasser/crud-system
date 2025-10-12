/* eslint-disable */
import connectToDatabase from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // invalid email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }

    // invalid pwd
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }
    // generate token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    const res = NextResponse.json({ message: "Login successful", user });
    // console.log(res)
    // save token in cookies
    res.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (error: any) {
    console.error(" Login error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 },
    );
  }
}
