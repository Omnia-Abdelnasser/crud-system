import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    age: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 90,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
    },

    doctor: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  },
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
