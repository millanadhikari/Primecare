'use client'
import { MainLayout } from "@/components/layout/main-layout";
import { MessageDetails } from "./message-details";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMessageById } from "@/app/lib/messageApi";

// This function tells Next.js which routes to pre-render during build

export default function MessageDetailsPage() {
  // Mock data that matches the message structure

  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const message = {
  //   id: params.id,
  //   name: "Sarah Johnson",
  //   email: "sarah.johnson@email.com",
  //   phone: "+1 (555) 234-5678",
  //   service: "NDIS Support Coordination",
  //   message:
  //     "Hello, I'm interested in learning more about your NDIS support coordination services. I'm a new participant and would like to understand how you can help me implement my plan effectively. Could we schedule a consultation? I have some specific questions about the process and would appreciate the opportunity to discuss my needs in detail.",
  //   preferredContact: "Email",
  //   isRead: false,
  //   isStarred: false,
  //   isArchived: false,
  //   priority: "High",
  //   receivedAt: "2025-01-10T14:30:00.000Z",
  //   category: "Inquiry",
  //   ipAddress: "192.168.1.100",
  //   userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  //   source: "Website Contact Form",
  //   tags: ["New Client", "NDIS", "Consultation"],
  // };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !id) {
      setError("Missing access token or ID.");
      setLoading(false);
      return;
    }

    getMessageById(id as string)
      .then((data) => {
        console.log("Fetched blog data:", data);
        setMessage(data?.data?.message);
      })
      .catch((err) => {
        console.error("Failed to fetch blog:", err);
        setError("Failed to fetch blog.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading message...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!message) return <p>message not found.</p>;
  return (
    <MainLayout>
      <MessageDetails message={message} />
    </MainLayout>
  );
}
