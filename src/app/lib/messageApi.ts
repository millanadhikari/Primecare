const production = "https://primebackend.onrender.com";

// const production = "http://localhost:3000";

// function to create a new message
export async function createMessage(messageData: Record<string, any>) {
  const res = await fetch(`${production}/api/message/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send message");
  }
  const data = await res.json();
  return data; // adjust if your backend returns differently
}

// function to get messages with optional filters
export async function getMessages({
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
} = {}) {
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  if (statusFilter && statusFilter !== "all")
    params.append("status", statusFilter);
  if (type && type !== "all") params.append("type", type);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(
    `${production}/api/message?${params.toString().toLocaleLowerCase()}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res) throw new Error("Failed to fetch messages");

  return res.json(); // { messages: [], total: 100 } or similar
}

// function to delete a message
export async function deleteMessage(messageId: string) {
  const res = await fetch(`${production}/api/message/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete message");
  }
  return res.json(); // adjust if your backend returns differently
}

// function to update a message
export async function updateMessage(
  messageId: string,
  messageData: Record<string, any>
) {
  const res = await fetch(`${production}/api/message/${messageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update message");
  }
  return res.json(); // adjust if your backend returns differently
}

//function to get message by id
export async function getMessageById(messageId: string) {
  const res = await fetch(`${production}/api/message/${messageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update message");
  }
  return res.json(); // adjust if your backend returns differently
}
