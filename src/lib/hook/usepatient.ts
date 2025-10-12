"use client";
/* eslint-disable */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Addpatient, Deletepatient, Getpatients, Updatepatient } from "../api";

//  get patients
export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: Getpatients,
  });
};

//  add patient
export const useAddPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addPatient"],
    mutationFn: Addpatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

// delete patient
export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: Deletepatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

// update patient
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      Updatepatient(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
