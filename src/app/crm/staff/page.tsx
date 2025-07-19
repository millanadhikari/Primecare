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
  Lock,
  CalendarIcon,
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
import { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getStaffs } from "@/app/lib/staffApi";
import { SkeletonRow } from "@/components/layout/SkeletonRow";

// Sample staff data
const initialStaff = [
  {
    id: "1",
    name: "Dr. Rebecca Chen",
    gender: "Female",
    role: "Medical Director",
    email: "rebecca.chen@medicare.com",
    mobile: "+1 (555) 123-4567",
    employmentType: "Full-time",
    jobTitle: "Medical Director",
    joinedDate: "Jan 15, 2024",
    lastLogin: "10 mins ago",
    onboardingStatus: "Completed",
    username: "rebecca.chen",
    hasAccount: true,
  },
  {
    id: "2",
    name: "Dr. Mark Johnson",
    gender: "Male",
    role: "Physician",
    email: "mark.johnson@medicare.com",
    mobile: "+1 (555) 234-5678",
    employmentType: "Full-time",
    jobTitle: "Senior Physician",
    joinedDate: "Mar 1, 2024",
    lastLogin: "2 hours ago",
    onboardingStatus: "Completed",
    username: "mark.johnson",
    hasAccount: true,
  },
  {
    id: "3",
    name: "Sarah Williams",
    gender: "Female",
    role: "Nurse",
    email: "sarah.williams@medicare.com",
    mobile: "+1 (555) 345-6789",
    employmentType: "Part-time",
    jobTitle: "Registered Nurse",
    joinedDate: "Mar 15, 2024",
    lastLogin: "1 day ago",
    onboardingStatus: "In Progress",
    username: "",
    hasAccount: false,
  },
];

export default function StaffDirectoryPage() {
  const router = useRouter();
  const [staff, setStaff] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id));
    toast.success("Staff member deleted successfully");
  };

  const handleCreateAccount = (staffMember: any) => {
    const updatedStaff = staff.map((s) => {
      if (s.id === staffMember.id) {
        return {
          ...s,
          hasAccount: true,
          username: s.email.split("@")[0],
          lastLogin: "Never",
        };
      }
      return s;
    });
    setStaff(updatedStaff);
    toast.success("Account created successfully");
  };

  const handleAddNewStaff = () => {
    router.push("/crm/staff/new");
  };

  const filteredStaff = useMemo(() => {
    return staff?.filter((staff) => {
      const matchesSearch = staff?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" &&
          (staff.status == "Active" || staff.status === "New")) ||
        (statusFilter === "Inactive" && staff.status === "Inactive");

      return matchesSearch && matchesStatus;
    });
  }, [staff, searchQuery, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff?.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentStaffs = filteredStaff?.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === "status") {
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

  const fetchStaffs = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    setLoading(true);
    try {
      const data = await getStaffs(token, {
        searchQuery,
        status: statusFilter,
        page: currentPage,
        limit: recordsPerPage,
      });
      console.log("Fetched staffs:", data.data);

      setStaff(data?.data?.users);
      setCurrentPage(data?.data?.pagination?.page || 1);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStaffs();
  }, [searchQuery, statusFilter, currentPage, recordsPerPage]);

  return (
    <MainLayout>
      <PageHeader
        title="Staff Directory"
        description="Manage your medical staff and personnel."
      >
        <Button onClick={handleAddNewStaff}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6  px-2 ">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex w-full items-center space-x-2 sm:w-auto">
              <Input
                placeholder="Search staff..."
                className="w-full sm:w-[300px] placeholder:text-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {/* <Label className="text-sm font-medium">Joined Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    // selected={staffData.dob}
                    // onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
              {/* <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button> */}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Mobile</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Employment Type
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Job Title
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Joined Date
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Login
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? // Render 5 skeleton rows
                    Array.from({ length: 5 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  : currentStaffs?.map((staffMember) => (
                      <TableRow key={staffMember.id}>
                        <TableCell className="font-medium">
                          {staffMember?.firstName} {staffMember?.lastName}
                        </TableCell>
                        <TableCell>{staffMember.gender}</TableCell>
                        <TableCell>{staffMember.role}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {staffMember.email}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {staffMember.phone}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {staffMember.employmentType}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {staffMember.jobTitle}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {new Date(
                            staffMember.joinedDate
                          ).toLocaleDateString()}{" "}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {staffMember.lastLogin}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              staffMember.isActive ? "default" : "outline"
                            }
                          >
                            {staffMember.isActive ? 'Active' : "Inactive"}
                          </Badge>
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
                                  router.push(`/crm/staff/${staffMember.id}`)
                                }
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {!staffMember.hasAccount && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleCreateAccount(staffMember)
                                  }
                                >
                                  <Lock className="mr-2 h-4 w-4" />
                                  Create Account
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  handleDeleteStaff(staffMember.id)
                                }
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
          <div className="mt-3 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredStaff?.length)} of{" "}
                {filteredStaff?.length} items
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
                        <span className="px-2 text-muted-foreground">...</span>
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
        </CardContent>
      </Card>
    </MainLayout>
  );
}
