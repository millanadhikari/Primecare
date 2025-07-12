"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MainLayout } from "@/components/layout/main-layout";
import { StaffDetails } from "./staff-details";
import { getClientById } from "@/app/lib/clientApi";
import { getStaffById } from "@/app/lib/staffApi";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !id) {
      setError("Missing access token or ID.");
      setLoading(false);
      return;
    }

    getStaffById(id as string, token)
      .then((data) => {
        console.log("Fetched staff data:", data?.data);
        setStaff(data);
      })
      .catch((err) => {
        console.error("Failed to fetch staff:", err);
        setError("Failed to fetch staff.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading staff...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!staff) return <p>Client not found.</p>;
  return (
    <MainLayout>
      <StaffDetails staffMember={staff} />
    </MainLayout>
  );
}
