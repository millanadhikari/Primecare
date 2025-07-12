"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronDown,
  Edit,
  Eye,
  EyeOff,
  Key,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
  CalendarIcon,
  Download,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getStaffById, updateStaffById } from "@/app/lib/staffApi";

interface Document {
  id: string;
  category: string;
  name: string;
  expiresAt: string;
  lastUpdate: string;
  status: "Valid" | "Expired" | "Expiring Soon";
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  dob: string;
  languageSpoken: string;
  isActive: boolean;
  profileImage: string;
  role: string;
  specialization: string;
  lastLogin: string;
  documents: Document[];
  kinName: string;
  kinPhone: string;
  kinEmail: string;
  kinRelation: string;
  emergencyContact: string;
  useKinAsEmergency: boolean;
}

interface StaffDetailsProps {
  staffMember: StaffMember;
}

export function StaffDetails({ staffMember }: StaffDetailsProps) {
  const router = useRouter();
  const [staffData, setStaffData] = useState<StaffMember>({
    ...staffMember, // Spread first
    firstName: staffMember?.firstName || "",
    lastName: staffMember?.lastName || "",
    phone: staffMember?.phone || "",
    email: staffMember?.email || "",
    dob: staffMember?.dob || null,
    address: staffMember?.address || "",
    gender: staffMember?.gender || "",
    languageSpoken: staffMember?.languageSpoken || "",
    profileImage: staffMember?.profileImage || "",
    specialization: staffMember?.specialization || "",
    kinName: staffMember?.kinName || "",
    kinPhone: staffMember?.kinPhone || "",
    kinEmail: staffMember?.kinEmail || "",
    kinRelation: staffMember?.kinRelation || "",
    emergencyContact: staffMember?.emergencyContact || "",
    role: staffMember?.role || "CLIENT",
    isActive: staffMember?.isActive ?? true,
    useKinAsEmergency: staffMember?.useKinAsEmergency ?? false,
    documents: staffMember?.documents || [],
    lastLogin: staffMember?.lastLogin || "",
  });
  const [isEditingDemographic, setIsEditingDemographic] = useState(false);
  const [isEditingLogin, setIsEditingLogin] = useState(false);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [isEditingCompliance, setIsEditingCompliance] = useState(false);
  const [isEditingKin, setIsEditingKin] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);

  const parsedDob = staffData?.dob ? new Date(staffData?.dob) : null;
  const [selectedDob, setSelectedDob] = useState<Date | undefined>(
    parsedDob || undefined
  );

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });

  const [documents, setDocuments] = useState<Document[]>(
    staffData.documents || []
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStaffData({ ...staffData, profileImage: reader.result as string });
        toast.success("Profile image updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDemographic = async () => {
    // const updatedData = {
    //   ...staffData,
    //   dob: selectedDob ? selectedDob.toISOString() : staffData.dob
    // };
    const updatedData = {
      firstName: staffData.firstName,

      phone: staffData.phone,
      email: staffData.email,
      address: staffData.address,
      lastName: staffData.lastName,
      gender: staffData.gender,

      dob: selectedDob ? selectedDob.toISOString() : staffData.dob,

      languageSpoken: staffData.languageSpoken,
    };
    // setStaffData(updatedData);
    try {
      const token = localStorage.getItem("accessToken");
      await updateStaffById(staffData.id, updatedData, token!);
      const refreshedClient = await getStaffById(staffData.id, token);
      setStaffData(refreshedClient);
      setIsEditingDemographic(false);
      toast.success("Demographic details updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update demographic details");
    }
  };

  const handleSaveLogin = () => {
    setIsEditingLogin(false);
    toast.success("Login details updated successfully");
  };

  const handleSaveSettings = async () => {
    try {
      const updatedData = {
        isActive: staffData.isActive,
        role: staffData.role,
      };

      const token = localStorage.getItem("accessToken");
      await updateStaffById(staffData.id, updatedData, token!);

      const refreshedClient = await getStaffById(staffData.id, token);
      setStaffData(refreshedClient);

      setIsEditingSettings(false);
      toast.success("Settings updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings");
    }
  };

  const handleSaveKin = async () => {
    try {
      const updatedData = {
        kinName: staffData.kinName,
        kinRelation: staffData.kinRelation,
        kinPhone: staffData.kinPhone,
        kinEmail: staffData.kinEmail,
      };

      const token = localStorage.getItem("accessToken");
      await updateStaffById(staffData.id, updatedData, token!);

      const refreshedClient = await getStaffById(staffData.id, token);
      setStaffData(refreshedClient);
      console.log(refreshedClient)

      setIsEditingKin(false);
      toast.success("Next of Kin updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings");
    }
  };

  const handleSaveEmergency = () => {
    setIsEditingEmergency(false);
    toast.success("Emergency contact updated successfully");
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    // try {
    //   const token = localStorage.getItem("accessToken");
    //   await updateStaffById(staffData.id, passwordData, token!);
    //   const refreshedClient = await getStaffById(staffData.id, token);
    //   setStaffData(refreshedClient);

    //   toast.success("Password updated successfully");
    //   setPasswordData({
    //     newPassword: "",
    //     confirmPassword: "",
    //   });
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Failed to update demographic details");
    // }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newDocs: Document[] = Array.from(files).map((file, index) => ({
        id: (Date.now() + index).toString(),
        category: "General",
        name: file.name,
        expiresAt: "2025-12-31",
        lastUpdate: new Date().toISOString(),
        status: "Valid" as const,
      }));

      setDocuments([...documents, ...newDocs]);
      toast.success("Documents uploaded successfully");
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast.success("Document deleted successfully");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'at' p");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Link and Profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/crm/staff")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Staff List
          </Button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={staffData.profileImage || ""} />
            <AvatarFallback className="text-lg">
              {staffData.firstName[0]}
              {staffData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {staffData.firstName} {staffData.lastName}
            </h1>
            <p className="text-muted-foreground">Staff ID: {staffData.id}</p>
            <Badge variant={staffData.isActive ? "default" : "secondary"}>
              {staffData.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Manage
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Add Shift</DropdownMenuItem>
            <DropdownMenuItem>Communication</DropdownMenuItem>
            <DropdownMenuItem>Timesheet</DropdownMenuItem>
            <DropdownMenuItem>Calendar</DropdownMenuItem>
            <DropdownMenuItem>Documents</DropdownMenuItem>
            <DropdownMenuItem>Resend Onboarding Email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                    <AvatarImage src={staffData?.profileImage || ""} />
                    <AvatarFallback className="text-lg">
                      {staffData?.firstName[0]}
                      {staffData?.lastName[0]}
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
              <Label>First Name</Label>
              <Input
                value={staffData?.firstName || ""}
                onChange={(e) =>
                  setStaffData({ ...staffData, firstName: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Last Name</Label>
              <Input
                value={staffData?.lastName || ""}
                onChange={(e) =>
                  setStaffData({ ...staffData, lastName: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                value={staffData?.phone || ""}
                onChange={(e) =>
                  setStaffData({ ...staffData, phone: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={staffData?.email || ""}
                onChange={(e) =>
                  setStaffData({ ...staffData, email: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Textarea
                value={staffData?.address || ""}
                onChange={(e) =>
                  setStaffData({ ...staffData, address: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select
                value={staffData?.gender || ""}
                onValueChange={(value) =>
                  setStaffData({ ...staffData, gender: value })
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
              <Label>Language Spoken</Label>
              <Input
                value={staffData.languageSpoken || ""}
                onChange={(e) =>
                  setStaffData({ ...staffData, languageSpoken: e.target.value })
                }
                disabled={!isEditingDemographic}
              />
            </div>
          </div>
          {isEditingDemographic && (
            <Button onClick={handleSaveDemographic} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              Update
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Login Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Login</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingLogin(!isEditingLogin)}
          >
            {isEditingLogin ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isEditingLogin ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Login Email</Label>
              <Input value={staffData.email} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Last Logged In</Label>
              <Input value={formatDateTime(staffData?.lastLogin)} disabled />
            </div>
            {isEditingLogin && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="grid gap-2">
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button onClick={handlePasswordChange} className="w-fit">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            )}
          </div>
          {isEditingLogin && !isEditingLogin && (
            <Button onClick={handleSaveLogin} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              Update
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
              <Label>Status</Label>
              <Select
                value={staffData.isActive ? "Active" : "Inactive"}
                onValueChange={(value) =>
                  setStaffData({ ...staffData, isActive: value === "Active" })
                }
                disabled={!isEditingSettings}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select
                value={staffData.role}
                onValueChange={(value) =>
                  setStaffData({ ...staffData, role: value })
                }
                disabled={!isEditingSettings}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="COORDINATOR">COORDINATOR</SelectItem>
                  <SelectItem value="CLIENT">CLIENT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label>Job Title</Label>
              <Input
                value={staffData.specialization}
                onChange={(e) =>
                  setStaffData({ ...staffData, specialization: e.target.value })
                }
                disabled={!isEditingSettings}
                placeholder="Enter job title"
              />
            </div>
          </div>
          {isEditingSettings && (
            <Button onClick={handleSaveSettings} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              Update
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Compliance</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              multiple
              className="hidden"
              id="compliance-upload"
              onChange={handleFileUpload}
            />
            <Button asChild size="sm">
              <label htmlFor="compliance-upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </label>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Expires At</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{formatDate(doc.expiresAt)}</TableCell>
                    <TableCell>{formatDate(doc.lastUpdate)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "Valid"
                            ? "default"
                            : doc.status === "Expiring Soon"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {documents.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No compliance documents uploaded yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Next of Kin */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Next of Kin</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingKin(!isEditingKin)}
          >
            {isEditingKin ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isEditingKin ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={staffData?.kinName}
                onChange={(e) =>
                  setStaffData({ ...staffData, kinName: e.target.value })
                }
                disabled={!isEditingKin}
              />
            </div>
            <div className="grid gap-2">
              <Label>Relation</Label>
              <Input
                value={staffData.kinRelation}
                onChange={(e) =>
                  setStaffData({ ...staffData, kinRelation: e.target.value })
                }
                disabled={!isEditingKin}
              />
            </div>
            <div className="grid gap-2">
              <Label>Contact</Label>
              <Input
                value={staffData.kinPhone}
                onChange={(e) =>
                  setStaffData({ ...staffData, kinPhone: e.target.value })
                }
                disabled={!isEditingKin}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={staffData.kinEmail}
                onChange={(e) =>
                  setStaffData({ ...staffData, kinEmail: e.target.value })
                }
                disabled={!isEditingKin}
              />
            </div>
          </div>
          {isEditingKin && (
            <Button onClick={handleSaveKin} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              Update
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Emergency Contact</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingEmergency(!isEditingEmergency)}
          >
            {isEditingEmergency ? (
              <X className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {isEditingEmergency ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useKinAsEmergency"
                checked={staffData.useKinAsEmergency ?? false}
                onCheckedChange={(checked) => {
                  const useKin = checked as boolean;
                  setStaffData({
                    ...staffData,
                    useKinAsEmergency: useKin,
                    emergencyContact: useKin
                      ? `${staffData.kinName} - ${staffData.kinPhone}`
                      : staffData.emergencyContact,
                  });
                }}
                disabled={!isEditingEmergency}
              />
              <Label htmlFor="useKinAsEmergency">
                Nominate next of kin as emergency contact
              </Label>
            </div>
            <div className="grid gap-2">
              <Label>Emergency Contact</Label>
              <Textarea
                value={staffData.emergencyContact || ""}
                onChange={(e) =>
                  setStaffData({
                    ...staffData,
                    emergencyContact: e.target.value,
                  })
                }
                disabled={!isEditingEmergency || staffData.useKinAsEmergency}
                placeholder="Enter emergency contact details"
              />
            </div>
          </div>
          {isEditingEmergency && (
            <Button onClick={handleSaveEmergency} className="w-fit">
              <Save className="mr-2 h-4 w-4" />
              Update
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
