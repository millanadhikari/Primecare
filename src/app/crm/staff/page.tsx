"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserPlus, Filter, Trash2, MoreVertical, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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
  },
];

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchQuery, setSearchQuery] = useState("");
  const [newStaff, setNewStaff] = useState({
    name: "",
    gender: "",
    role: "",
    email: "",
    mobile: "",
    employmentType: "",
    jobTitle: "",
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role || !newStaff.jobTitle) {
      toast.error("Please fill in all required fields");
      return;
    }

    const staffMember = {
      id: (staff.length + 1).toString(),
      ...newStaff,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      lastLogin: "Never",
      onboardingStatus: "Pending",
    };

    setStaff([...staff, staffMember]);
    setNewStaff({
      name: "",
      gender: "",
      role: "",
      email: "",
      mobile: "",
      employmentType: "",
      jobTitle: "",
    });
    toast.success("Staff member added successfully");
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id));
    toast.success("Staff member deleted successfully");
  };

  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        title="Staff Directory"
        description="Manage your medical staff and personnel."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the staff member&aspos;s information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={newStaff.gender}
                    onValueChange={(value:string) => setNewStaff({ ...newStaff, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newStaff.role}
                    onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical Director">Medical Director</SelectItem>
                      <SelectItem value="Physician">Physician</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Therapist">Therapist</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={newStaff.jobTitle}
                    onChange={(e) => setNewStaff({ ...newStaff, jobTitle: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    value={newStaff.mobile}
                    onChange={(e) => setNewStaff({ ...newStaff, mobile: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select
                    value={newStaff.employmentType}
                    onValueChange={(value) => setNewStaff({ ...newStaff, employmentType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStaff}>Add Staff Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex w-full items-center space-x-2 sm:w-auto">
              <Input
                placeholder="Search staff..."
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

          <div className="mt-6 overflow-hidden rounded-md border border-gray-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Mobile</TableHead>
                  <TableHead className="hidden xl:table-cell">Employment Type</TableHead>
                  <TableHead className="hidden xl:table-cell">Job Title</TableHead>
                  <TableHead className="hidden lg:table-cell">Joined Date</TableHead>
                  <TableHead className="hidden md:table-cell">Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staffMember) => (
                  <TableRow key={staffMember.id}>
                    <TableCell className="font-medium">{staffMember.name}</TableCell>
                    <TableCell>{staffMember.gender}</TableCell>
                    <TableCell>{staffMember.role}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {staffMember.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {staffMember.mobile}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {staffMember.employmentType}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {staffMember.jobTitle}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {staffMember.joinedDate}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {staffMember.lastLogin}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          staffMember.onboardingStatus === "Completed"
                            ? "default"
                            : staffMember.onboardingStatus === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {staffMember.onboardingStatus}
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
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteStaff(staffMember.id)}
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
        </CardContent>
      </Card>
    </MainLayout>
  );
}