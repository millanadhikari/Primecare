import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { OnboardingProvider } from "../../components/onboarding/onboarding-provider";

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
      <OnboardingProvider>{children}</OnboardingProvider>
    </AuthProvider>
  );
}
