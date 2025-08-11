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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <StatCard
          title="Total Clients"
          value="1,284"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change={{ value: "+8.2%", trend: "up" }}
        />
        <StatCard
          title="Active Care Plans"
          value="426"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          change={{ value: "+12.5%", trend: "up" }}
          variant="info"
        />
        <StatCard
          title="Today's Appointments"
          value="24"
          icon={<CalendarCheck className="h-4 w-4 text-muted-foreground" />}
          change={{ value: "+3", trend: "up" }}
          variant="success"
        />
        <StatCard
          title="Assistive Devices"
          value="712"
          icon={<Armchair className="h-4 w-4 text-muted-foreground" />}
          change={{ value: "+5.3%", trend: "up" }}
          variant="warning"
        />
      </div>

      {/* <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-7">
        <PatientsChart className="lg:col-span-4" />
        <AppointmentsList 
          appointments={appointments} 
          className="mt-0 lg:col-span-3" 
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <RecentActivities activities={activities} className="lg:col-span-2" />
        <UpcomingEvents events={events} className="lg:col-span-2" />
      </div> */}
    </MainLayout>
  );
}
