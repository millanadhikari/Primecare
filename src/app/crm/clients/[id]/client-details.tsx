"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Camera,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  Download,
  Upload,
  ChevronDown,
  CalendarIcon,
  Archive,
  MoreVertical,
  Eye,
  DollarSign,
  Receipt,
  Users,
  Printer,
} from "lucide-react";
import { getClientById, updateClientById } from "@/app/lib/clientApi";
import { v4 as uuidv4 } from "uuid"; // at the top of your file

interface Team {
  id: string;
  name: string;
}

interface Document {
  id: string;
  name: string;

  type: string;
  url?: string;
  uploadedAt: string;
  imagePublicId?: string;
  clientId: string;
}

interface Contact {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  contactNumber?: string;
  relation?: string;
  companyName?: string;
  purchaseOrder?: string;
  referenceNumber?: string;
  isPrimary: boolean;
  isBilling: boolean;
}

interface ClientData {
  id: string;
  title?: string | null;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  phone?: string | null;
  email: string;
  address?: string | null;
  gender?: string | null;
  dob?: string | null;
  maritalStatus?: string | null;
  religion?: string | null;
  nationality?: string | null;
  languageSpoken?: string | null;
  status: string;
  profilePictureUrl?: string | null;
  generalInfo?: string | null;
  usefulInfo?: string | null;
  ndisNumber?: string | null;
  agedCareId?: string | null;
  referenceNumber?: string | null;
  poNumber?: string | null;
  clientType?: string | null;
  smsReminders: boolean;
  invoiceTravel: boolean;
  createdAt: string;
  updatedAt: string;
  teams: Team[];
  documents: Document[];
  forms: Document[];
  contacts: Contact[];
}

interface ClientDetailsProps {
  client: ClientData;
}

const PRODUCTION = "https://primebackend.onrender.com/api";
const LOCAL = "http://localhost:3000/api";

export function ClientDetails({ client }: ClientDetailsProps) {
  const [clientData, setClientData] = useState<ClientData>({
    ...client,
    // Set default values for null fields to prevent controlled/uncontrolled input warnings
    title: client?.title || "",
    firstName: client?.firstName || "",
    middleName: client?.middleName || "",
    lastName: client?.lastName || "",
    phone: client?.phone || "",
    email: client?.email || "",
    address: client?.address || "",
    dob: client?.dob || null,
    gender: client?.gender || "",
    maritalStatus: client?.maritalStatus || "",
    religion: client?.religion || "",
    nationality: client?.nationality || "",
    languageSpoken: client?.languageSpoken || "",
    profilePictureUrl: client?.profilePictureUrl || "",
    generalInfo: client?.generalInfo || "",
    usefulInfo: client?.usefulInfo || "",
    ndisNumber: client?.ndisNumber || "",
    agedCareId: client?.agedCareId || "",
    referenceNumber: client?.referenceNumber || "",
    poNumber: client?.poNumber || "",
    clientType: client?.clientType || "",
    teams: client?.teams || [],
    documents: client?.documents || [],
  });

  const [isEditingDemographic, setIsEditingDemographic] = useState(false);
  const [isEditingPublicInfo, setIsEditingPublicInfo] = useState(false);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(client.contacts || []);
  const [documents, setDocuments] = useState<Document[]>(
    client.documents || []
  );
  const [forms, setForms] = useState<Document[]>(client.forms || []);
  const [invoices, setInvoices] = useState<Document[]>([]);
  const [newContact, setNewContact] = useState<Contact>({
    id: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contactNumber: "",
    relation: "",
    companyName: "",
    purchaseOrder: "",
    referenceNumber: "",
    isPrimary: false,
    isBilling: false,
  });
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Parse DOB if it exists
  const parsedDob = clientData?.dob ? new Date(clientData?.dob) : null;
  const [selectedDob, setSelectedDob] = useState<Date | undefined>(
    parsedDob || undefined
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientData({
          ...clientData,
          profilePictureUrl: reader.result as string,
        });
        toast.success("Profile image updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!clientData) {
      toast.error("Client data not loaded yet");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token");

      // Send partial update for status
      await updateClientById(clientData.id, { status }, token);

      // Re-fetch full client after update
      const refreshedClient = await getClientById(clientData.id, token);
      setClientData(refreshedClient);

      toast.success(`Status updated to ${status}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };
  const handleSaveDemographic = async () => {
    if (!clientData) {
      toast.error("Client data is not ready yet.");
      return;
    }
    const updatedData = {
      title: clientData.title,
      firstName: clientData.firstName,
      middleName: clientData.middleName,
      phone: clientData.phone,
      email: clientData.email,
      address: clientData.address,
      lastName: clientData.lastName,
      gender: clientData.gender,
      nationality: clientData.nationality,
      dob: selectedDob ? selectedDob.toISOString() : clientData.dob,
      maritalStatus: clientData.maritalStatus,
      religion: clientData.religion,
      languageSpoken: clientData.languageSpoken,
    };
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      await updateClientById(clientData.id, updatedData, token!);
      const refreshedClient = await getClientById(clientData.id, token);
      setClientData(refreshedClient);
      setIsEditingDemographic(false);
      toast.success("Demographic details updated successfully");
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update demographic details");
    }
  };

  const handleSavePublicInfo = async () => {
    if (!clientData) {
      toast.error("Client data not loaded yet");
      return;
    }

    const updatedData = {
      generalInfo: clientData.generalInfo,
      usefulInfo: clientData.usefulInfo,
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token");

      // Send update to backend
      await updateClientById(clientData.id, updatedData, token);

      // Re-fetch fresh client data
      const refreshedClient = await getClientById(clientData.id, token);
      setClientData(refreshedClient);

      setIsEditingPublicInfo(false);
      toast.success("Public information updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update public information");
    }
  };
  const handleSaveSettings = async () => {
    if (!clientData) {
      toast.error("Client data not loaded yet");
      return;
    }

    const updatedData = {
      ndisNumber: clientData.ndisNumber,
      agedCareId: clientData.agedCareId,
      referenceNumber: clientData.referenceNumber,
      poNumber: clientData.poNumber,
      clientType: clientData.clientType,
      teams: {
        set: clientData.teams.map((team) => ({ id: team.id, name: team.name })),
      },
      smsReminders: clientData.smsReminders,
      invoiceTravel: clientData.invoiceTravel,
    };
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token");

      // Update on backend
      await updateClientById(clientData.id, updatedData, token);

      // Refresh full client data
      const refreshedClient = await getClientById(clientData.id, token);
      setClientData(refreshedClient);

      setIsEditingSettings(false);
      toast.success("Settings updated successfully");
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings");
    }
  };

  const handleAddContact = () => {
    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      toast.error("Please fill in required fields");
      return;
    }

    const contact = {
      ...newContact,
      id: (contacts.length + 1).toString(),
    };

    setContacts([...contacts, contact]);
    setNewContact({
      id: "",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contactNumber: "",
      relation: "",
      companyName: "",
      purchaseOrder: "",
      referenceNumber: "",
      isPrimary: false,
      isBilling: false,
    });
    setIsAddingContact(false);
    toast.success("Contact added successfully");
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  const handleFileUpload =
    (type: "documents" | "forms" | "invoices", clientId: string) =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const token = localStorage.getItem("accessToken");
      const files = e.target.files;

      if (!files || files.length === 0) {
        toast.error("No file selected");
        return;
      }

      const uploadedDocs: Document[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch(`${PRODUCTION}/upload`, {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          console.log("Upload response:", data);

          if (!res.ok || !data.url) {
            throw new Error(data.error || "Upload failed");
          }

          const newDoc: Document = {
            id: uuidv4(), // Generate unique ID
            name: file.name,
            type: type,
            url: data.url,
            imagePublicId: data.publicId,
            uploadedAt: new Date().toISOString(),
            clientId: clientId,
          };

          uploadedDocs.push(newDoc);
          console.log("Uploaded document:", newDoc);
        } catch (error: any) {
          toast.error(`Failed to upload ${file.name}`);
          console.error("Upload error:", error);
        }
      }

      // Update local state based on type
      if (uploadedDocs.length > 0) {
        switch (type) {
          case "documents":
            setDocuments((prev) => [...prev, ...uploadedDocs]);
            break;
          case "forms":
            setForms((prev) => [...prev, ...uploadedDocs]);
            break;
          case "invoices":
            setInvoices((prev) => [...prev, ...uploadedDocs]);
            break;
        }

        // Update on backend
        const updatedData = {
          documents: {
            create: uploadedDocs.map((doc) => ({
              name: doc.name,
              type: doc.type,
              url: doc.url,
              uploadedAt: doc.uploadedAt,
              imagePublicId: doc.imagePublicId,
              // userId: doc.userId, // optional if available
            })),
          },
        };

        console.log("Sending to backend:", updatedData);
        await updateClientById(clientId, updatedData, token);

        toast.success(`${uploadedDocs.length} ${type} uploaded successfully`);
      }
    };

  const handleDeleteFile = async (
    type: "documents" | "forms" | "invoices",
    doc: any
  ) => {
    const token = localStorage.getItem("accessToken");

    if (type === "documents") {
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    } else if (type === "forms") {
      setForms((prev) => prev.filter((f) => f.id !== doc.id));
    } else if (type === "invoices") {
      setInvoices((prev) => prev.filter((i) => i.id !== doc.id));
    }
    try {
      const deleteFile = await fetch(`${PRODUCTION}/upload`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: doc.imagePublicId }),
      });

      console.log("Delete file response:", deleteFile);

      const updatedData = {
        documents: {
          delete: [{ id: doc.id }],
        },
      };
      await updateClientById(clientData.id, updatedData, token);
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Failed to delete file:", error);
      toast.error("Failed to delete file");
    }
  };

  const handleArchiveClient = () => {
    toast.success("Client has been archived");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  useEffect(() => {
    console.log("Client data loaded:", clientData);
  }, []);
  if (!clientData) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Header with Profile and Actions */}
      <div className="md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={clientData?.profilePictureUrl || ""} />
            <AvatarFallback className="text-lg w-full">
              {clientData.firstName[0]}
              {clientData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {clientData.firstName}{" "}
              {clientData.middleName && `${clientData.middleName} `}
              {clientData.lastName}
            </h1>
            <p className="text-muted-foreground">Client ID: {clientData.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <Select value={clientData.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Manage
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" />
                Add Expense
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Receipt className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                Print Roster
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Demographic Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Demographic Details</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingDemographic(!isEditingDemographic)}
          >
            {isEditingDemographic ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isEditingDemographic ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isEditingDemographic && (
              <div className="flex flex-col items-center gap-4 md:col-span-2 lg:col-span-1">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={clientData?.profilePictureUrl || ""} />
                    <AvatarFallback className="text-lg w-full">
                      {clientData.firstName[0]}
                      {clientData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Camera className="h-4 w-4" />
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </Label>
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label>Title</Label>
              <Select
                value={clientData.title}
                onValueChange={(value) =>
                  setClientData({ ...clientData, title: value })
                }
                disabled={!isEditingDemographic}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>First Name</Label>
              <Input
                value={clientData.firstName || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, firstName: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Middle Name</Label>
              <Input
                value={clientData.middleName || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, middleName: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Last Name</Label>
              <Input
                value={clientData.lastName || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, lastName: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                value={clientData.phone || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, phone: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={clientData.email || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, email: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Textarea
                value={clientData.address || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, address: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select
                value={clientData.gender}
                onValueChange={(value) =>
                  setClientData({ ...clientData, gender: value })
                }
                disabled={!isEditingDemographic}
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
            <div className="grid gap-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !selectedDob && "text-muted-foreground"
                    )}
                    disabled={!isEditingDemographic}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDob ? format(selectedDob, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDob}
                    onSelect={setSelectedDob}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Marital Status</Label>
              <Select
                value={clientData.maritalStatus}
                onValueChange={(value) =>
                  setClientData({ ...clientData, maritalStatus: value })
                }
                disabled={!isEditingDemographic}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Religion</Label>
              <Input
                value={clientData.religion || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, religion: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Nationality</Label>
              <Input
                value={clientData.nationality || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, nationality: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Language Spoken</Label>
              <Input
                value={clientData.languageSpoken || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    languageSpoken: e.target.value,
                  })
                }
                disabled={!isEditingDemographic}
              />
            </div>
          </div>
          {isEditingDemographic && (
            <Button onClick={handleSaveDemographic} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving" : "Save Changes"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Public Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Public Information</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingPublicInfo(!isEditingPublicInfo)}
          >
            {isEditingPublicInfo ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isEditingPublicInfo ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>General Information</Label>
              <Textarea
                value={clientData.generalInfo || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, generalInfo: e.target.value })
                }
                disabled={!isEditingPublicInfo}
                placeholder="Add general information..."
                className="placeholder:text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label>Useful Information</Label>
              <Textarea
                value={clientData.usefulInfo || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, usefulInfo: e.target.value })
                }
                disabled={!isEditingPublicInfo}
                placeholder="Add useful information..."
                className="placeholder:text-sm"
              />
            </div>
          </div>
          {isEditingPublicInfo && (
            <Button onClick={handleSavePublicInfo} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Settings</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingSettings(!isEditingSettings)}
          >
            {isEditingSettings ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isEditingSettings ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>NDIS Number</Label>
              <Input
                value={clientData.ndisNumber || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, ndisNumber: e.target.value })
                }
                disabled={!isEditingSettings}
              />
            </div>
            <div className="grid gap-2">
              <Label>Aged Care Recipient ID</Label>
              <Input
                value={clientData.agedCareId || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, agedCareId: e.target.value })
                }
                disabled={!isEditingSettings}
              />
            </div>
            <div className="grid gap-2">
              <Label>Reference Number</Label>
              <Input
                value={clientData.referenceNumber || ""}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    referenceNumber: e.target.value,
                  })
                }
                disabled={!isEditingSettings}
              />
            </div>
            <div className="grid gap-2">
              <Label>P.O. Number</Label>
              <Input
                value={clientData.poNumber || ""}
                onChange={(e) =>
                  setClientData({ ...clientData, poNumber: e.target.value })
                }
                disabled={!isEditingSettings}
              />
            </div>
            <div className="grid gap-2">
              <Label>Client Type</Label>
              <Select
                value={clientData.clientType}
                onValueChange={(value) =>
                  setClientData({ ...clientData, clientType: value })
                }
                disabled={!isEditingSettings}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Self Managed">Self Managed</SelectItem>
                  <SelectItem value="Plan Managed">Plan Managed</SelectItem>
                  <SelectItem value="NDIS Managed">NDIS Managed</SelectItem>
                  <SelectItem value="Level 1 Aged Care">
                    Level 1 Aged Care
                  </SelectItem>
                  <SelectItem value="Level 2 Aged Care">
                    Level 2 Aged Care
                  </SelectItem>
                  <SelectItem value="Level 3 Aged Care">
                    Level 3 Aged Care
                  </SelectItem>
                  <SelectItem value="Level 4 Aged Care">
                    Level 4 Aged Care
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Team</Label>
              <Select
                value={
                  clientData.teams.length > 0 ? clientData.teams[0].name : ""
                }
                onValueChange={(value) => {
                  // Update teams array with selected team
                  const updatedTeams = [{ id: "1", name: value }];
                  setClientData({ ...clientData, teams: updatedTeams });
                }}
                disabled={!isEditingSettings}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Team Alpha">Team Alpha</SelectItem>
                  <SelectItem value="Team Beta">Team Beta</SelectItem>
                  <SelectItem value="Team Gamma">Team Gamma</SelectItem>
                  <SelectItem value="Team Delta">Team Delta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Enable SMS Reminders</Label>
              <Switch
                checked={clientData.smsReminders}
                onCheckedChange={(checked) =>
                  setClientData({ ...clientData, smsReminders: checked })
                }
                disabled={!isEditingSettings}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Invoice Travel Option</Label>
              <Switch
                checked={clientData.invoiceTravel}
                onCheckedChange={(checked) =>
                  setClientData({ ...clientData, invoiceTravel: checked })
                }
                disabled={!isEditingSettings}
              />
            </div>
          </div>
          {isEditingSettings && (
            <Button onClick={handleSaveSettings} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving" : "Save Changes"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="md:flex md:flex-row md:items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <div className="flex items-center gap-2 mt-3">
            <Input
              type="file"
              multiple
              className="hidden"
              id="documents-upload"
              onChange={handleFileUpload("documents", clientData.id)}
            />
            <Button asChild size="sm">
              <label htmlFor="documents-upload">
                <Upload className="mr-2 h-4 w-4" />
                Add Documents
              </label>
            </Button>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* {doc.size && `${doc.size} • `}Uploaded on{" "} */}
                      {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFile("documents", doc)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {documents.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No documents uploaded yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Forms */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Forms</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              multiple
              className="hidden"
              id="forms-upload"
              // onChange={handleFileUpload("forms")}
            />
            <Button asChild size="sm">
              <label htmlFor="forms-upload">
                <Upload className="mr-2 h-4 w-4" />
                Add Forms
              </label>
            </Button>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{form.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* {form?.size && `${form.size} • `}Uploaded on{" "} */}
                      {formatDate(form.uploadedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFile("forms", form.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {forms.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No forms uploaded yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader className="md:flex md:flex-row md:items-center justify-between">
          <CardTitle>Invoices</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              multiple
              className="hidden"
              id="invoices-upload"
              // onChange={handleFileUpload("invoices")}
            />
            <Button asChild size="sm">
              <label htmlFor="invoices-upload">
                <Upload className="mr-2 h-4 w-4" />
                Add Invoices
              </label>
            </Button>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{invoice.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* {invoice.size && `${invoice.size} • `}Uploaded on{" "} */}
                      {formatDate(invoice.uploadedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFile("invoices", invoice.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {invoices.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No invoices uploaded yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Contacts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Additional Contacts</CardTitle>
          <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Enter the contact information below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Select
                    value={newContact.title}
                    onValueChange={(value) =>
                      setNewContact({ ...newContact, title: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>First Name *</Label>
                  <Input
                    value={newContact.firstName || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Last Name *</Label>
                  <Input
                    value={newContact.lastName || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={newContact.email || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <Label>Address</Label>
                  <Textarea
                    value={newContact.address || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, address: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Contact Number</Label>
                  <Input
                    value={newContact.contactNumber || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Relation</Label>
                  <Input
                    value={newContact.relation || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, relation: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Company Name</Label>
                  <Input
                    value={newContact.companyName || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Purchase Order</Label>
                  <Input
                    value={newContact.purchaseOrder || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        purchaseOrder: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <Label>Reference Number</Label>
                  <Input
                    value={newContact.referenceNumber || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        referenceNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="primary"
                    checked={newContact.isPrimary}
                    onCheckedChange={(checked) =>
                      setNewContact({ ...newContact, isPrimary: checked })
                    }
                  />
                  <Label htmlFor="primary">Primary Contact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="billing"
                    checked={newContact.isBilling}
                    onCheckedChange={(checked) =>
                      setNewContact({ ...newContact, isBilling: checked })
                    }
                  />
                  <Label htmlFor="billing">Billing Contact</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingContact(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddContact}>Add Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {contacts.length > 0 ? (
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Relation</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {contact.title} {contact.firstName} {contact.lastName}
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.contactNumber}</TableCell>
                      <TableCell>{contact.relation}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {contact.isPrimary && (
                            <Badge variant="default" className="text-xs">
                              Primary
                            </Badge>
                          )}
                          {contact.isBilling && (
                            <Badge variant="secondary" className="text-xs">
                              Billing
                            </Badge>
                          )}
                        </div>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteContact(contact.id)}
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
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No additional contacts added yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Archive Client */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Archive Client</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will archive the client and you will not be able to see the
            client in your list. If you wish to access the client, please go to
            the Archive sub-menu.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Archive className="mr-2 h-4 w-4" />
                Archive Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Archive Client</DialogTitle>
                <DialogDescription>
                  Are you sure you want to archive {clientData.firstName}{" "}
                  {clientData.lastName}? This action will remove them from your
                  active client list.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive" onClick={handleArchiveClient}>
                  Archive Client
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
