"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MainLayout } from "@/components/layout/main-layout";
import { ClientDetails } from "./client-details";
import { getClientById } from "@/app/lib/clientApi";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !id) {
      setError("Missing access token or ID.");
      setLoading(false);
      return;
    }

    getClientById(id as string, token)
      .then((data) => {
        console.log("Fetched client data:", data);
        setClient(data);
      })
      .catch((err) => {
        console.error("Failed to fetch client:", err);
        setError("Failed to fetch client.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading client...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!client) return <p>Client not found.</p>;
  return (
    <MainLayout>
      <ClientDetails client={client} />
    </MainLayout>
  );
}
