"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MainLayout } from "@/components/layout/main-layout";
import { DocumentEditor } from "./document-editor";
import { getDocumentTemplateById } from "@/app/lib/documentsApi";

export default function DocumentDetailsPage() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !id) {
      setError("Missing access token or ID.");
      setLoading(false);
      return;
    }

    getDocumentTemplateById(id as string, token)
      .then((data) => {
        console.log("Fetched blog data:", data);
        setTemplate(data);
      })
      .catch((err) => {
        console.error("Failed to fetch blog:", err);
        setError("Failed to fetch blog.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading template...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!template) return <p>Template not found.</p>;
  return (
    <MainLayout>
      <DocumentEditor template={template} />
    </MainLayout>
  );
}
