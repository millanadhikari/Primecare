const production = "https://primebackend.onrender.com";

// const production = "http://localhost:3000";

export async function createStaff(
  staffData: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/auth/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staffData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create staff");
  }

  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function getStaffs(
  token: string,
  {
    searchQuery = "",
    status = "All",
    page = 1,
    limit = 10,
  }: {
    searchQuery?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  if (status !== "All") params.append("status", status);

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(`${production}/api/auth/users?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res) throw new Error("Failed to fetch clients");
  console.log("Response status:", res);
  return res.json(); // { clients: [], total: 100 } or similar
}

export async function getStaffById(id: string, token: string) {
  const res = await fetch(`${production}/api/auth/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Optional: disable Next.js caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch staff");
  }

  const data = await res.json();
  // console.log(data)
  return data?.data.user; // adjust if your backend returns differently
}

export async function updateStaffById(
  id: string,
  updatedData: Record<string, any>,
  token: string
) {
  console.log("Updating staff with ID:", id, "Data:", updatedData);
  const res = await fetch(`${production}/api/auth/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update staff");
  }

  const data = await res.json();
  return data.user; // adjust if your backend returns differently
}

// function to delete staff
export async function deleteStaff(token: string, id: string) {
  const res = await fetch(`${production}/api/auth/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete staff");
  }
  return true;
}

//function to get forgot password
export async function forgotPassword(email: string) {
  const res = await fetch(`${production}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to send reset link");
  }

  return true; // or return any success message from your API
}
