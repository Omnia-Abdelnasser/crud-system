import z from "zod";

// loginSchema.ts
export const loginSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

// registerSchema.ts
export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().min(3, "Email must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

//  add patientSchema.ts
export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(3, "Email must be at least 3 characters long"),

  age: z.coerce.number().min(1, "Age is required"),

  doctor: z.string().min(1, "Doctor's name is required"),
});

// update patient schema
