"use client";
/* eslint-disable */

import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { useDeletePatient, usePatients } from "@/lib/hook/usepatient";
import SpinnerColor from "../loading";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const PatientTable = () => {
  const router = useRouter();
  const [username, setUserName] = useState("Guest");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name || "Guest");
    } else {
      setUserName("Guest");
    }
  }, []);
  // handle logout
  const handleLogout = () => {
    router.push("/login");
  };

  // get patients
  const { data: patients, isLoading, error } = usePatients();
  const deletePatient = useDeletePatient();

  if (isLoading)
    return (
      <div className="text-center py-[25%] flex justify-center">
        <SpinnerColor />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-6">Failed to load patients</p>
    );

  return (
    <div className="w-full px-2 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Patients {username}
        </h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-4 mb-3">
        <a href="/craud/addpatient">
          <Button className="flex items-center gap-2 px-10 py-2 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-medium transition">
            <Plus size={18} /> Add Patient
          </Button>
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Age</th>
              <th className="py-3 px-4 border-b text-left">Doctor</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients?.map((patient: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{patient.name}</td>
                <td className="py-3 px-4 border-b">{patient.email}</td>
                <td className="py-3 px-4 border-b">{patient.age}</td>
                <td className="py-3 px-4 border-b">{patient.doctor}</td>
                <td className="py-3 px-4 border-b text-center space-x-3">
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
            {patients?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No patients found.
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
