import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { OnboardingProvider } from "../../components/onboarding/onboarding-provider";
import { NotificationProvider } from "@/components/notifications/notification-provider";

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
    <AuthProvider>
        <NotificationProvider>
      <OnboardingProvider>{children}</OnboardingProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
