// lib/api.ts
export async function getClients(
  token: string,
  {
    searchQuery = "",
    age = "All",
    status = "All",
    page = 1,
    limit = 10,
  }: {
    searchQuery?: string;
    age?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  if (age !== "All") params.append("age", age);
  if (status !== "All") params.append("status", status);

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(
    `http://localhost:3000/api/client?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res) throw new Error("Failed to fetch clients");
  console.log("Response status:", res);
  return res.json(); // { clients: [], total: 100 } or similar
}

export async function deleteClient(token: string, id: string) {
  const res = await fetch(`http://localhost:3000/api/client/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete client");
  }

  return true;
}

export async function getClientById(id: string, token: string) {
  const res = await fetch(`http://localhost:3000/api/client/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Optional: disable Next.js caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch client");
  }

  const data = await res.json();
  return data.data.client; // adjust if your backend returns differently
}

export async function updateClientById(
  id: string,
  updatedData: Record<string, any>,
  token: string
) {
  const res = await fetch(`http://localhost:3000/api/client/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update client");
  }

  const data = await res.json();
  return data.client; // adjust if your backend returns differently
}

export async function createClient(
  clientData: Record<string, any>,
  token: string
) {
  const res = await fetch(`http://localhost:3000/api/client/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create client");
  }

  const data = await res.json();
  return data; // adjust if your backend returns differently
}
