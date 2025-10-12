//auth api

// register
/* eslint-disable */

export const Register = async (values: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "something error");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};
// login

export const Login = async (values: { email: string; password: string }) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "something error");
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};

// patient api

//get all patients
export const Getpatients = async () => {
  try {
    const res = await fetch("/api/patient", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "something error");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};

// add patient
export const Addpatient = async (values: {
  name: string;
  age: number;
  doctor: string;
}) => {
  try {
    const res = await fetch("/api/patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "something error");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};

// delete patient
export const Deletepatient = async (id: string) => {
  try {
    const res = await fetch(`/api/patient/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "something error");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};

// update patient
export const Updatepatient = async (
  id: string,
  values: { name: string; age: number; doctor: string },
) => {
  try {
    const res = await fetch(`/api/patient/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "something error");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};
// get patient byId
export const GetepatientById = async (id: string) => {
  try {
    const res = await fetch(`/api/patient/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error.message || "server error");
  }
};
