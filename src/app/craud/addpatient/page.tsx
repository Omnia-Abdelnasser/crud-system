/* eslint-disable */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { patientSchema } from "@/lib/formschema";
import { useAddPatient } from "@/lib/hook/usepatient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddPatientPage = () => {
  const router = useRouter();

  const addPatient = useAddPatient();

  const form = useForm<any>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      doctor: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      addPatient.mutate(values, {
        onSuccess: () => {
          toast.success("Patient added successfully!",{
            style: {
               backgroundColor: "#22c55e", 
               color: "#fff",
            },
          });
          form.reset();
          router.push("/craud");
        },
        onError: () => {
          toast.error("Failed to add patient. Please try again.");
        },
      });
    } catch (error) {
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-lg">

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Add Patient
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter patient name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter patient email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter patient age"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter doctor name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              Add Patient
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddPatientPage;
