"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
// import { AppointmentsList } from "@/components/dashboard/appointments-list";
// import { RecentActivities } from "@/components/dashboard/recent-activities";
// import { PatientsChart } from "@/components/dashboard/patients-chart";
// import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { CalendarCheck, FileText, Users, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useOnboarding } from "@/components/onboarding/onboarding-provider";
import { useAuth } from "../context/AuthContext";
import { useSocketNotifications } from "@/hooks/use-socket-notifications";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function Home() {
  const { showWelcome } = useOnboarding();
  const { user, loading } = useAuth();

  useSocketNotifications(user?.data?.user?.id);
  useEffect(() => {
    if (loading) return;

    if (user?.data?.user) {
      console.log("✅ Logged in user:", user);

      // ✅ Use isFirstLogin directly from backend
      if (user?.data?.user?.isFirstLogin) {
        setTimeout(() => {
          showWelcome(user?.data?.user);
        }, 200);
      }
    }

    console.log("User onboarding check complete.");
  }, [loading, user, showWelcome]);
  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Dr. Chen. Here's what's happening today."
      >
        <Button>
          <CalendarCheck className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </PageHeader>

  <AdminDashboard/>
    </MainLayout>
  );
}
