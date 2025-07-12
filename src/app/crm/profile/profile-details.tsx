"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Camera,
  Check,
  Key,
  Pencil,
  X,
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  CalendarIcon,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  adminLevel: string;
  permissions: string[];
  department: string;
  region: string;
  isVerified: boolean;
  profileImage: string;
  profileImagePublicId: string | null;
  phone: string;
  address: string;
  emergencyContact: string;
  specialization: string;
  licenseNumber: string;
  joinedDate: string;
  lastLogin?: string;
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

// export interface UserProfile {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: 'ADMIN' | string;
//   adminLevel: 'SUPER' | string;
//   permissions: string[];
//   department: string | null;
//   region: string | null;
//   isVerified: boolean;
//   profileImage: string | null;
//   isActive: boolean;
//   clientId: string | null;
//   company: string | null;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface AdminProfile extends UserProfile {
//   phone: string;
//   address: string;
//   emergencyContact: string;
//   specialization: string;
//   licenseNumber: string;
//   joinedDate: string;
//   lastLogin: string;
//   twoFactorEnabled: boolean;
//   emailNotifications: boolean;
//   smsNotifications: boolean;
// }

interface ProfileDetailsProps {
  userProfile: UserProfile;
  user: UserProfile;
}

export function ProfileDetails({ userProfile, user }: ProfileDetailsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user);
  const { updateUser, changePassword } = useAuth();
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [joinedDate, setJoinedDate] = useState<Date | undefined>(() => {
    if (!user.joinedDate) return undefined; // handle null or undefined
    const parsed = new Date(user.joinedDate);
    return isNaN(parsed.getTime()) ? undefined : parsed; // handle invalid date
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  // const handleProfileImageChange = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     // 🔁 DELETE OLD IMAGE if exists
  //     if (editedProfile.profileImagePublicId) {
  //       await fetch("http://localhost:3000/api/upload", {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           publicId: editedProfile.profileImagePublicId,
  //         }),
  //       });
  //     }

  //     // 📤 UPLOAD NEW IMAGE
  //     const response = await fetch("http://localhost:3000/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     console.log("Upload response:", data);
  //     if (response.ok && data.url) {
  //       setEditedProfile({
  //         ...editedProfile,
  //         profileImage: data.url,
  //         profileImagePublicId: data.publicId,
  //       });
  //       // await updateUser(setEditedProfile);
  //       console.log("lksjdf", editedProfile);
  //       toast.success("Profile image uploaded");
  //     } else {
  //       throw new Error("Upload failed");
  //     }
  //   } catch (err) {
  //     toast.error("Image upload failed");
  //     console.error("Upload error:", err);
  //   }
  // };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedProfileImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // const handleSave = async () => {
  //   try {
  //     const updatedProfile = {
  //       ...editedProfile,
  //       joinedDate,
  //       dob: null,
  //       lastLogin: new Date(),
  //     };

  //     console.log("Saving profile:", updatedProfile);

  //     await updateUser(updatedProfile); // this sends profileImage URL
  //     toast.success("Profile updated");
  //     setIsEditing(false);

  //     window.location.reload();
  //   } catch (err) {
  //     toast.error("Update failed");
  //   }
  // };
  const handleSave = async () => {
    setLoading(true);
    try {
      let profileImageUrl = editedProfile.profileImage;
      let profileImagePublicId = editedProfile.profileImagePublicId;

      // 🔁 DELETE OLD IMAGE if a new image is selected
      if (selectedProfileImage && profileImagePublicId) {
        await fetch("http://localhost:3000/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: profileImagePublicId }),
        });
      }

      // 📤 UPLOAD NEW IMAGE
      if (selectedProfileImage) {
        const formData = new FormData();
        formData.append("file", selectedProfileImage);

        const response = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok || !data.url) throw new Error("Image upload failed");

        profileImageUrl = data.url;
        profileImagePublicId = data.publicId;
        toast.success("Profile image uploaded");
        setLoading(false);
      }

      // 📝 Update user with image + other data
      const updatedProfile = {
        ...editedProfile,
        profileImage: profileImageUrl,
        profileImagePublicId,
        joinedDate,
        dob: null,
        lastLogin: new Date(),
      };

      console.log("Saving profile:", updatedProfile);

      await updateUser(updatedProfile);
      toast.success("Profile updated");
      setIsEditing(false);
      setSelectedProfileImage(null); // clear selected image
      window.location.reload();
    } catch (err) {
      toast.error("Update failed");
      console.error("Save error:", err);
    }
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
    if (!passwordData.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error("Failed to update password");
      console.error("Change password error:", err);
    }
  };

  const handlePermissionToggle = (permission: string) => {
    const updatedPermissions = editedProfile.permissions.includes(permission)
      ? editedProfile.permissions.filter((p: any) => p !== permission)
      : [...editedProfile.permissions, permission];

    setEditedProfile({ ...editedProfile, permissions: updatedPermissions });
  };

  const formatDateTime = (isoString: string | null | undefined) => {
    if (!isoString) return "Invalid date";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid date";

    return format(date, "PPP 'at' p");
  };

  const formatDateTimeISO = (isoString: string) => {
    return isoString;
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={
                          previewUrl
                            ? previewUrl
                            : editedProfile?.profileImage ||
                              "/default-avatar.png"
                        }
                      />{" "}
                      <AvatarFallback className="text-lg">
                        {editedProfile?.firstName[0]}
                        {editedProfile?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
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
                    )}
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">
                      {editedProfile.firstName} {editedProfile.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {editedProfile.role}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <Badge
                        variant={
                          editedProfile.isVerified ? "default" : "secondary"
                        }
                      >
                        {editedProfile.isVerified ? "Verified" : "Unverified"}
                      </Badge>
                      <Badge variant="outline">
                        {editedProfile.adminLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>First Name</Label>
                      <Input
                        value={editedProfile.firstName}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Last Name</Label>
                      <Input
                        value={editedProfile.lastName}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={editedProfile.email}
                        disabled
                        className="pl-10 bg-muted"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email address cannot be changed
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={editedProfile?.phone}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        value={editedProfile.address}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            address: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="pl-10 min-h-[80px]"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Emergency Contact</Label>
                    <Input
                      value={editedProfile.emergencyContact}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          emergencyContact: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button disabled={loading} onClick={handleSave}className="w-full">
                    <Check className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Joined Date</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Date Joined</span>
                    </div>
                    {isEditing ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !joinedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {joinedDate
                              ? format(joinedDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={joinedDate}
                            onSelect={(date) => date && setJoinedDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span className="font-medium">
                        {formatDateTime(editedProfile.joinedDate)}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <div className="text-xs text-muted-foreground">
                      ISO8601: {joinedDate?.toISOString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Login</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatDateTime(editedProfile.lastLogin)}
                    </div>
                    {/* <div className="text-xs text-muted-foreground">
                      ISO8601: {formatDateTimeISO(editedProfile.lastLogin)}
                    </div> */}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Account Status</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Select
                    value={editedProfile.role}
                    onValueChange={(value) =>
                      setEditedProfile({ ...editedProfile, role: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical Director">
                        Medical Director
                      </SelectItem>
                      <SelectItem value="Senior Physician">
                        Senior Physician
                      </SelectItem>
                      <SelectItem value="Physician">Physician</SelectItem>
                      <SelectItem value="Nurse Manager">
                        Nurse Manager
                      </SelectItem>
                      <SelectItem value="Registered Nurse">
                        Registered Nurse
                      </SelectItem>
                      <SelectItem value="Administrator">
                        Administrator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Admin Level</Label>
                  <Select
                    value={editedProfile.adminLevel}
                    onValueChange={(value) =>
                      setEditedProfile({ ...editedProfile, adminLevel: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Cordinator</SelectItem>
                      <SelectItem value="User">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Select
                    value={editedProfile.department}
                    onValueChange={(value) =>
                      setEditedProfile({ ...editedProfile, department: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical Administration">
                        Medical Administration
                      </SelectItem>
                      <SelectItem value="Clinical Services">
                        Clinical Services
                      </SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                      <SelectItem value="Therapy Services">
                        Therapy Services
                      </SelectItem>
                      <SelectItem value="Support Services">
                        Support Services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Region</Label>
                  <Select
                    value={editedProfile.region}
                    onValueChange={(value) =>
                      setEditedProfile({ ...editedProfile, region: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North America">
                        North America
                      </SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                      <SelectItem value="Latin America">
                        Latin America
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Specialization</Label>
                <Input
                  value={editedProfile.specialization}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      specialization: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="grid gap-2">
                <Label>License Number</Label>
                <Input
                  value={editedProfile.licenseNumber}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      licenseNumber: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="space-y-2">
                  {[
                    "all",
                    "manage_users",
                    "view_reports",
                    "edit_documents",
                    "manage_appointments",
                  ].map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center space-x-2"
                    >
                      <Switch
                        id={permission}
                        checked={editedProfile.permissions.includes(permission)}
                        onCheckedChange={() =>
                          handlePermissionToggle(permission)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={permission} className="capitalize">
                        {permission.replace("_", " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
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
                <Button onClick={handlePasswordChange} className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={editedProfile.twoFactorEnabled}
                    onCheckedChange={(checked: any) =>
                      setEditedProfile({
                        ...editedProfile,
                        twoFactorEnabled: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Account Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Your account verification status
                    </p>
                  </div>
                  <Badge
                    variant={editedProfile.isVerified ? "default" : "secondary"}
                  >
                    {editedProfile.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={editedProfile.emailNotifications}
                  onCheckedChange={(checked: any) =>
                    setEditedProfile({
                      ...editedProfile,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={editedProfile.smsNotifications}
                  onCheckedChange={(checked: any) =>
                    setEditedProfile({
                      ...editedProfile,
                      smsNotifications: checked,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
