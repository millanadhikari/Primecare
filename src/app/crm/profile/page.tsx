"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { ProfileDetails } from "./profile-details";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { profile } from "console";
export default function ProfilePage() {
  const { user } = useAuth();
  const newUser = user?.data.user;
  // This would normally come from an API/database or authentication context
  function sanitizeNulls<T extends Record<string, any>>(obj: T): T {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = value === null ? "" : value;
    }

    return sanitized as T;
  }

  const sanitizedUser = sanitizeNulls(newUser || {});
  const userProfile = {
    id: "1",
    firstName: "Rebecca",
    lastName: "Chen",
    email: "rebecca.chen@medicare.com",
    role: "Medical Director",
    adminLevel: "Super Admin",
    permissions: ["all", "manage_users"],
    department: "Medical Administration",
    region: "North America",
    isVerified: true,
    profileImage: "",
    profileImagePublicId: "",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Drive, Suite 100",
    emergencyContact: "John Chen (Spouse) - +1 (555) 987-6543",
    specialization: "Internal Medicine",
    licenseNumber: "MD-12345-CA",
    joinedDate: "Jan 15, 2024",
    lastLogin: "10 mins ago",
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
  };

  // useEffect(() => {
  //   // Initialize editedProfile with userProfile when component mounts
  //   console.log("profile-details d", newUser);
  //   console.log("sanitized profile-details d", sanitizedUser);

  //   // const mayaUser = autoSanitize(newUser);
  //   // function autoSanitize(newUser:any) {
  //   //   return Object.fromEntries(
  //   //     Object.entries(newUser).map(([key, value]) => {
  //   //       if (value === null) return [key, ""]; // or use [] / {} / false depending on field
  //   //       return [key, value];
  //   //     })
  //   //   );
  //   // }
  // }, [user]);

  return (
    <MainLayout>
      {/* {user?.data?.user && ( */}
      <ProfileDetails userProfile={userProfile} user={sanitizedUser} />
      {/* )} */}
    </MainLayout>
  );
}
