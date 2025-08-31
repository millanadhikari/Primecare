const production = "https://primebackend.onrender.com";

// const production = "http://localhost:3000";

export async function createProject(
  projectData: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create project");
  }
  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function getProjects(
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

  const res = await fetch(`${production}/api/projects?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json(); // { projects: [], total: 100 } or similar
}

export async function createTask(taskData: Record<string, any>, token: string) {
  const res = await fetch(`${production}/api/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create task");
  }

  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function getTasks(
  token: string,
  {
    projectId,
    status = "All",
    page = 1,
    limit = 10,
  }: {
    projectId?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  const params = new URLSearchParams();

  if (projectId) params.append("projectId", projectId);
  if (status !== "All") params.append("status", status);

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(`${production}/api/tasks/${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json(); // { tasks: [], total: 100 } or similar
}

export async function updateProject(
  projectId: string,
  updates: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update project");
  }

  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function deleteProject(projectId: string, token: string) {
  const res = await fetch(`${production}/api/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete project");
  }
  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function updateTask(
  taskId: string,
  updates: Record<string, any>,
  token: string
) {
  const res = await fetch(`${production}/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update task");
  }

  const data = await res.json();
  return data; // adjust if your backend returns differently
}

export async function deleteTask(taskId: string, token: string) {
  const res = await fetch(`${production}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete task");
  }

  return res; // adjust if your backend returns differently
}
