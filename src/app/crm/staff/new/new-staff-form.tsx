"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowLeft, CalendarIcon, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createStaff } from "@/app/lib/staffApi";
import { Spinner } from "@/components/ui/spinner";

interface NewStaffData {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dob: Date | undefined;
  address: string;
  unitApartmentNumber: string;
  phone: string;
  email: string;
  emergencyContact: string;
  employmentType: string;
  role: string;
  sendOnboardingEmail: boolean;
  inviteStaffViaSMS: boolean;
}

export function NewStaffForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [staffData, setStaffData] = useState<NewStaffData>({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: undefined,
    address: "",
    unitApartmentNumber: "",
    phone: "",
    email: "",
    emergencyContact: "",
    employmentType: "",
    role: "",
    sendOnboardingEmail: false,
    inviteStaffViaSMS: false,
  });

  const handleInputChange = (
    field: keyof NewStaffData,
    value: string | boolean
  ) => {
    setStaffData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setStaffData((prev) => ({
      ...prev,
      dob: date,
    }));
  };

  const handleCancel = () => {
    router.push("/crm/staff");
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleCreate = async () => {
    // Validate required fields
    if (
      !staffData.firstName ||
      !staffData.lastName ||
      !staffData.email ||
      !staffData.role ||
      !staffData.employmentType
    ) {
      toast.error(
        "Please fill in all required fields (First Name, Last Name, Email, Role, Employment Type)"
      );
      return;
    }

    setIsLoading(true);

    try {
      // Generate random password
      const randomPassword = generateRandomPassword();

      // Prepare data for backend
      const backendData = {
        title: staffData.title || null,
        firstName: staffData.firstName,
        middleName: staffData.middleName || null,
        lastName: staffData.lastName,
        gender: staffData.gender || null,
        dob: staffData.dob ? staffData.dob.toISOString() : null,
        address:
          `${staffData.address}${
            staffData.unitApartmentNumber
              ? `, ${staffData.unitApartmentNumber}`
              : ""
          }` || null,
        phone: staffData.phone || null,
        email: staffData.email,
        emergencyContact: staffData.emergencyContact || null,
        employmentType: staffData.employmentType,
        role: staffData.role,
        password: randomPassword,
        defaultPassword: randomPassword,
        sendOnboardingEmail: staffData.sendOnboardingEmail,
        inviteStaffViaSMS: staffData.inviteStaffViaSMS,
      };

      // Here you would make the API call to create the staff member
      console.log("Creating staff member with data:", backendData);

      // Here you would make the API call to create the client
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token");
      // Simulate API call
      const newStaffId = await createStaff(backendData, token);

      toast.success("Staff member created successfully");

      // Redirect to the newly created staff member's detail page
      router.push(`/crm/staff/${newStaffId.data.user.id}`);
    } catch (error) {
      toast.error("Failed to create staff member. Please try again.");
      console.error("Error creating staff member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex items-center justify-between">
        <div className="md:flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Staff Member</h1>
            <p className="text-muted-foreground">
              Create a new staff member record
            </p>
          </div>
        </div>
        <div className="pt-4 md:pt-0 flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                Creating.. <Spinner className="text-white" />
              </div>
            ) : (
              "Create Staff Member"
            )}
          </Button>
        </div>
      </div>

      {/* Demographic Details Form */}
      <Card>
        <CardHeader>
          <CardTitle>Demographic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Select
                value={staffData.title}
                onValueChange={(value) => handleInputChange("title", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                  <SelectItem value="Prof">Prof</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* First Name */}
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={staffData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Middle Name */}
            <div className="grid gap-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={staffData.middleName}
                onChange={(e) =>
                  handleInputChange("middleName", e.target.value)
                }
                placeholder="Enter middle name"
              />
            </div>

            {/* Last Name */}
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={staffData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Gender */}
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={staffData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div className="grid gap-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !staffData.dob && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {staffData.dob
                      ? format(staffData.dob, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={staffData.dob}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Address */}
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={staffData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter street address"
                className="min-h-[80px]"
              />
            </div>

            {/* Unit/Apartment Number */}
            <div className="grid gap-2">
              <Label htmlFor="unitApartmentNumber">Unit/Apartment Number</Label>
              <Input
                id="unitApartmentNumber"
                value={staffData.unitApartmentNumber}
                onChange={(e) =>
                  handleInputChange("unitApartmentNumber", e.target.value)
                }
                placeholder="Unit/Apt number"
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={staffData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={staffData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Emergency Contact */}
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={staffData.emergencyContact}
                onChange={(e) =>
                  handleInputChange("emergencyContact", e.target.value)
                }
                placeholder="Enter emergency contact details"
              />
            </div>

            {/* Employment Type */}
            <div className="grid gap-2">
              <Label htmlFor="employmentType">Employment Type *</Label>
              <Select
                value={staffData.employmentType}
                onValueChange={(value) =>
                  handleInputChange("employmentType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contractor">Contractor</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={staffData.role}
                onValueChange={(value) => handleInputChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="COORDINATOR">Coordinator</SelectItem>
                  <SelectItem value="CLIENT">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendOnboardingEmail"
                checked={staffData.sendOnboardingEmail}
                onCheckedChange={(checked) =>
                  handleInputChange("sendOnboardingEmail", checked as boolean)
                }
              />
              <Label htmlFor="sendOnboardingEmail">Send Onboarding Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inviteStaffViaSMS"
                checked={staffData.inviteStaffViaSMS}
                onCheckedChange={(checked) =>
                  handleInputChange("inviteStaffViaSMS", checked as boolean)
                }
              />
              <Label htmlFor="inviteStaffViaSMS">Invite Staff via SMS</Label>
            </div>
          </div>

          {/* Required Fields Note */}
          <div className="text-sm text-muted-foreground">* Required fields</div>
        </CardContent>
      </Card>
    </div>
  );
}
