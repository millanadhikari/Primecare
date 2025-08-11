"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDocumentTemplates } from "@/app/lib/documentsApi";

const documentTemplates = [
  {
    id: "ndis-agreement",
    title: "NDIS Service Agreement",
    description: "Standard service agreement for NDIS participants",
    lastUpdated: "2025-04-10",
  },
  {
    id: "incident-report",
    title: "Incident Report",
    description: "Form for reporting incidents and accidents",
    lastUpdated: "2025-04-09",
  },
  {
    id: "pain-diagram",
    title: "Pain Diagram",
    description: "Visual representation of pain locations and types",
    lastUpdated: "2025-04-08",
  },
  {
    id: "progress-notes",
    title: "Progress Notes",
    description: "Clinical documentation of patient progress",
    lastUpdated: "2025-04-07",
  },
  {
    id: "consent-form",
    title: "Consent Form",
    description: "Patient consent for treatment and information sharing",
    lastUpdated: "2025-04-06",
  },
  {
    id: "assessment-form",
    title: "Initial Assessment",
    description: "Comprehensive patient assessment form",
    lastUpdated: "2025-04-05",
  },
];

export default function DocumentsPage() {
  //   const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments =
    templates &&
    templates?.filter((doc) =>
      doc?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const fetchTemplates = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setLoading(true);
    try {
      const data = await getDocumentTemplates({
        page: 1,
        limit: 5,
        nameFilter: searchQuery,
        token,
      });
      setTemplates(data.data); // Using mock data for now
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTemplates();
    console.log("Templates fetched:", templates);
  }, [searchQuery]);
  return (
    <MainLayout>
      <PageHeader
        title="Documents"
        description="Access and manage document templates."
      >
        <Button className="flex items-center gap-2" asChild>
          <Link href="documents/new">
            <Plus className="h-4 w-4" />
            New Template
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex w-full items-center space-x-2 sm:w-auto">
              <Input
                placeholder="Search templates..."
                className="w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments?.map((doc) => (
              <Link
                key={doc.id}
                href={`/crm/documents/${doc.id}`}
                className="block"
              >
                <div className="group rounded-lg border p-4 transition-colors hover:bg-accent">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-md border p-2">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Last updated:{" "}
                    {new Date(doc.updatedAt).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
