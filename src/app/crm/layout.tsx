import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "My CRM",
  description: "CRM Dashboard with Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <AuthProvider>{children}</AuthProvider>
   
  );
}
