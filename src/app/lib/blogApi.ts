const production = "https://primebackend.onrender.com";

// const production = "http://localhost:3000";

export async function createBlog(blogData: Record<string, any>, token: string) {
  const res = await fetch(`${production}/api/blog/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create blog");
  }
  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function getBlogs(
  token: string,
  {
    searchQuery = "",
    statusFilter = "all",
    type = "all",
    page = 1,
    limit = 10,
  }: {
    searchQuery?: string;
    statusFilter?: string;
    type?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  if (statusFilter && statusFilter !== "all")
    params.append("status", statusFilter);
  if (type && type !== "all") params.append("type", type);
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  const res = await fetch(
    `${production}/api/blog?${params.toString().toLowerCase()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res) throw new Error("Failed to fetch blogs");
  console.log("Response status:", res);
  return res.json(); // { blogs: [], total: 100 } or similar
}

//delete blog
export async function deleteBlog(token: string, id: string) {
  const res = await fetch(`${production}/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete blog");
  }
  return true;
}

// get blog by id
export async function getBlogById(id: string, token: string) {
  const res = await fetch(`${production}/api/blog/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Ensure fresh data
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch blog");
  }
  const data = await res.json();
  return data; // Adjust if your backend returns differently
}

//update blog
export async function updateBlogbyId(
  id: string,
  blogData: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/blog/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update blog");
  }
  const data = await res.json();
  return data; // Adjust if your backend returns differently
}
