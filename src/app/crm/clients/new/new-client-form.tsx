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
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowLeft, CalendarIcon, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/clientApi";

interface NewClientData {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  gender: string;
  dob: Date | undefined;
  address: string;
  unitApartmentNumber: string;
  phone: string;
  email: string;
  religion: string;
  maritalStatus: string;
  nationality: string;
  languageSpoken: string;
}

export function NewClientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [clientData, setClientData] = useState<NewClientData>({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    gender: "",
    dob: undefined,
    address: "",
    unitApartmentNumber: "",
    phone: "",
    email: "",
    religion: "",
    maritalStatus: "",
    nationality: "",
    languageSpoken: "",
  });

  const handleInputChange = (field: keyof NewClientData, value: string) => {
    setClientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setClientData((prev) => ({
      ...prev,
      dob: date,
    }));
  };

  const handleCancel = () => {
    router.push("/crm/clients");
  };

  const handleCreate = async () => {
    // Validate required fields
    if (!clientData.firstName || !clientData.lastName || !clientData.email) {
      toast.error(
        "Please fill in all required fields (First Name, Last Name, Email)"
      );
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for backend
      const backendData = {
        title: clientData.title || null,
        firstName: clientData.firstName,
        middleName: clientData.middleName || null,
        lastName: clientData.lastName,
        gender: clientData.gender || null,
        dob: clientData.dob ? clientData.dob.toISOString() : null,
        address:
          `${clientData.address}${
            clientData.unitApartmentNumber
              ? `, ${clientData.unitApartmentNumber}`
              : ""
          }` || null,
        phone: clientData.phone || null,
        email: clientData.email,
        religion: clientData.religion || null,
        maritalStatus: clientData.maritalStatus || null,
        nationality: clientData.nationality || null,
        languageSpoken: clientData.languageSpoken || null,
        status: "inactive", // Default status
      };

      // Here you would make the API call to create the client
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token");

      // Send create request
      const newClientId = await createClient(backendData, token);
      console.log("Created client ID:", newClientId.data.client.id);

      // Optionally, refresh client list or navigate away
      // Example: refetch clients or router.push('/clients')

      toast.success("Client created successfully");

      // Redirect to the newly created client's detail page
      router.push(`/crm/clients/${newClientId.data.client.id}`);
    } catch (error) {
      toast.error("Failed to create client. Please try again.");
      console.error("Error creating client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Client</h1>
            <p className="text-muted-foreground">Create a new client record</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Creating..." : "Create Client"}
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
                value={clientData.title}
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
                value={clientData.firstName}
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
                value={clientData.middleName}
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
                value={clientData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Display Name */}
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={clientData.displayName}
                onChange={(e) =>
                  handleInputChange("displayName", e.target.value)
                }
                placeholder="Enter display name"
              />
            </div>

            {/* Gender */}
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={clientData.gender}
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
                      !clientData.dob && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {clientData.dob
                      ? format(clientData.dob, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={clientData.dob}
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
                value={clientData.address}
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
                value={clientData.unitApartmentNumber}
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
                value={clientData.phone}
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
                value={clientData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Religion */}
            <div className="grid gap-2">
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                value={clientData.religion}
                onChange={(e) => handleInputChange("religion", e.target.value)}
                placeholder="Enter religion"
              />
            </div>

            {/* Marital Status */}
            <div className="grid gap-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select
                value={clientData.maritalStatus}
                onValueChange={(value) =>
                  handleInputChange("maritalStatus", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                  <SelectItem value="Separated">Separated</SelectItem>
                  <SelectItem value="De facto">De facto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nationality */}
            <div className="grid gap-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={clientData.nationality}
                onChange={(e) =>
                  handleInputChange("nationality", e.target.value)
                }
                placeholder="Enter nationality"
              />
            </div>

            {/* Languages */}
            <div className="grid gap-2">
              <Label htmlFor="languageSpoken">Languages Spoken</Label>
              <Input
                id="languageSpoken"
                value={clientData.languageSpoken}
                onChange={(e) =>
                  handleInputChange("languageSpoken", e.target.value)
                }
                placeholder="Enter languages spoken"
              />
            </div>
          </div>

          {/* Required Fields Note */}
          <div className="text-sm text-muted-foreground">* Required fields</div>
        </CardContent>
      </Card>
    </div>
  );
}
