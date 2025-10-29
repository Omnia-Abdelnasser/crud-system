"use client";
/* eslint-disable */
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { useDeletePatient, usePatients } from "@/lib/hook/usepatient";
import SpinnerColor from "../loading";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const PatientTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data: patients, isLoading, error } = usePatients();
  const deletePatient = useDeletePatient();

  // handle logout
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <SpinnerColor />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-6">
        ⚠️ Failed to load patients
      </p>
    );

  const filterPatients = patients.filter((patient: any) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
          Patients Management
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={() => router.push("/craud/addpatient")}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm transition w-full sm:w-auto"
          >
            <Plus size={18} /> Add Patient
          </Button>

          <Button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-sm transition w-full sm:w-auto"
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      
      <div className="flex justify-center mb-5">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search patients..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 md:w-1/3"
        />
      </div>

      
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-200">
        <table className="min-w-full text-sm sm:text-md text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="py-3 px-4 sm:px-6">#</th>
              <th className="py-3 px-4 sm:px-6">Name</th>
              <th className="py-3 px-4 sm:px-6">Email</th>
              <th className="py-3 px-4 sm:px-6">Age</th>
              <th className="py-3 px-4 sm:px-6">Doctor</th>
              <th className="py-3 px-4 sm:px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filterPatients?.map((patient: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 sm:px-6">{index + 1}</td>
                <td className="py-3 px-4 sm:px-6 font-medium text-gray-800">
                  {patient.name}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {patient.email}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {patient.age}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {patient.doctor}
                </td>
                <td className="py-3 px-4 sm:px-6 text-center space-x-3">
                  <button
                    onClick={() =>
                      router.push(`/craud/updatepatient/${patient._id}`)
                    }
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      deletePatient.mutate(patient._id);
                      toast.success("Patient deleted successfully!");
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filterPatients?.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-500 italic"
                >
                  No patients found 🩺
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;
