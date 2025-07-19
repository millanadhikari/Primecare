"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Filter,
  Trash2,
  MoreVertical,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteClient, getClients } from "@/app/lib/clientApi";
import { SkeletonRow } from "@/components/layout/SkeletonRow";

export default function ClientsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [newClient, setNewClient] = useState({
    name: "",
    age: "",
    disability: "",
    careManager: "",
  });

  const fetchClients = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    setLoading(true);
    try {
      const data = await getClients(token, {
        searchQuery,
        age: ageFilter,
        status: statusFilter,
        page: currentPage,
        limit: recordsPerPage,
      });
      console.log("Fetched clients:", data.data);

      setClients(data?.data?.clients);
      setCurrentPage(data?.data?.pagination?.page || 1);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClients();
  }, [searchQuery, ageFilter, statusFilter, currentPage, recordsPerPage]);

  const handleAddClient = () => {
    if (
      !newClient.name ||
      !newClient.age ||
      !newClient.disability ||
      !newClient.careManager
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const client = {
      id: (clients.length + 1).toString(),
      name: newClient.name,
      age: parseInt(newClient.age),
      disability: newClient.disability,
      status: "New",
      lastVisit: new Date().toLocaleDateString("en-US", {
        month: "short",

        year: "numeric",
      }),
      careManager: newClient.careManager,
    };

    setClients([...clients, client]);
    setNewClient({ name: "", age: "", disability: "", careManager: "" });
    toast.success("Client added successfully");
  };
  const handleDeleteClient = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Missing access token");
      return;
    }

    try {
      await deleteClient(token, id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      toast.success("Client deleted successfully");
    } catch (err: any) {
      console.error("Error deleting client:", err);
      toast.error(err.message || "Failed to delete client");
    }
  };

  // Filter and search logic
  const filteredClients = useMemo(() => {
    return clients?.filter((client) => {
      const matchesSearch = client?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesAge =
        ageFilter === "All" ||
        (ageFilter === "Adults" && client.age >= 18) ||
        (ageFilter === "Children" && client.age < 18);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" &&
          (client.status === "Active" || client.status === "New")) ||
        (statusFilter === "Inactive" && client.status === "Inactive");

      return matchesSearch && matchesAge && matchesStatus;
    });
  }, [clients, searchQuery, ageFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredClients?.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentClients = filteredClients?.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === "age") {
      setAgeFilter(value);
    } else if (filterType === "status") {
      setStatusFilter(value);
    }
  };

  const handleRecordsPerPageChange = (value: string) => {
    setRecordsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleAddNewClient = () => {
    router.push("/crm/clients/new");
  };

  function calculateAge(dob: string | Date): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }

  return (
    <MainLayout>
      <PageHeader
        title="Clients"
        description="View and manage all client records."
      >
        <Button onClick={handleAddNewClient}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6 px-2">
          <div className="flex flex-col space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <Input
                  placeholder="Search clients..."
                  className="w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={ageFilter}
                  onValueChange={(value) => handleFilterChange("age", value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Ages</SelectItem>
                    <SelectItem value="Adults">Adults</SelectItem>
                    <SelectItem value="Children">Children</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button> */}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Care Manager
                    </TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading
                    ? // Render 5 skeleton rows
                      Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    : currentClients?.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">
                            {client.firstName} {client.lastName}
                          </TableCell>
                          <TableCell>{calculateAge(client.dob)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {client.phone}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                client.status === "active"
                                  ? "default"
                                  : client.status === "New"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {client.status === "active" && "Active"}
                              {client.status === "inactive" && "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {client.email}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {client.careManager}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(`/crm/clients/${client.id}`)
                                  }
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteClient(client.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mt-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredClients?.length)} of{" "}
                  {filteredClients?.length} items
                </span>
                <Select
                  value={recordsPerPage?.toString()}
                  onValueChange={handleRecordsPerPageChange}
                >
                  <SelectTrigger className="w-[80px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>records per page</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current page
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
