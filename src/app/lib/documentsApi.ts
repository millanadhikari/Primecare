// const production = "https://primebackend.onrender.com";

const production = "http://localhost:3000";

export async function createDocumentTemplate(
  templateData: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/templates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create document template");
  }

  const data = await res.json();
  return data; // adjust if your backend returns differently
}

// get all document templates
export async function getDocumentTemplates({
  page,
  limit,
  nameFilter,
  token,
}: {
  page?: number;
  limit?: number;
  nameFilter?: string;
  token: string;
}) {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (nameFilter) params.append("nameFilter", nameFilter);

  const res = await fetch(`${production}/api/templates?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Optional: disable Next.js caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch document templates");
  }

  const data = await res.json();
  console.log("Fetched document templates:", data);
  return data.data.templates; // adjust if your backend returns differently
}

//get a single document template by ID
export async function getDocumentTemplateById(id: string, token: string) {
  const res = await fetch(`${production}/api/templates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Optional: disable Next.js caching
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch document template");
  }

  const data = await res.json();
  return data.data.template; // adjust if your backend returns differently
}

// update a document template by ID
export async function updateDocumentTemplate(
  id: string,
  templateData: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/templates/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update document template");
  }

  const data = await res.json();
  return data.data.template; // adjust if your backend returns differently
}
