'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
// import { AppointmentsList } from "@/components/dashboard/appointments-list";
// import { RecentActivities } from "@/components/dashboard/recent-activities";
// import { PatientsChart } from "@/components/dashboard/patients-chart";
// import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { CalendarCheck, FileText, Users, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample appointment data
const appointments = [
  {
    id: "1",
    patientName: "James Wilson",
    patientInitials: "JW",
    date: "2025-04-10",
    time: "9:00 AM",
    type: "Initial Assessment",
    status: "checked-in" as const,
  },
  {
    id: "2",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    date: "2025-04-10",
    time: "10:30 AM",
    type: "Physical Therapy",
    status: "scheduled" as const,
  },
  {
    id: "3",
    patientName: "Michael Chen",
    patientInitials: "MC",
    date: "2025-04-10",
    time: "11:45 AM",
    type: "Occupational Therapy",
    status: "in-progress" as const,
  },
  {
    id: "4",
    patientName: "Emma Rodriguez",
    patientInitials: "ER",
    date: "2025-04-10",
    time: "2:15 PM",
    type: "Follow-up",
    status: "scheduled" as const,
  },
  {
    id: "5",
    patientName: "David Thompson",
    patientInitials: "DT",
    date: "2025-04-10",
    time: "3:30 PM",
    type: "Speech Therapy",
    status: "scheduled" as const,
  },
];

// Sample activity data
const activities = [
  {
    id: "1",
    description: "New patient record created for Emma Rodriguez",
    user: "Dr. Rebecca Chen",
    time: "10 minutes ago",
    type: "success" as const,
  },
  {
    id: "2",
    description: "Appointment rescheduled for Michael Chen",
    user: "Jennifer Lee, Admin",
    time: "45 minutes ago",
    type: "info" as const,
  },
  {
    id: "3",
    description: "Medical document uploaded for James Wilson",
    user: "Dr. Mark Johnson",
    time: "1 hour ago",
    type: "info" as const,
  },
  {
    id: "4",
    description: "Missed appointment with Sarah Johnson",
    user: "System",
    time: "2 hours ago",
    type: "warning" as const,
  },
  {
    id: "5",
    description: "Insurance verification failed for David Thompson",
    user: "Billing Department",
    time: "Yesterday",
    type: "error" as const,
  },
];

// Sample events data
const events = [
  {
    id: "1",
    title: "Staff Meeting",
    date: "Apr 12",
    time: "9:00 AM - 10:00 AM",
    type: "meeting" as const,
  },
  {
    id: "2",
    title: "New Accessibility Training",
    date: "Apr 15",
    time: "2:00 PM - 4:00 PM",
    type: "training" as const,
  },
  {
    id: "3",
    title: "Quarterly Reports Due",
    date: "Apr 20",
    time: "End of Day",
    type: "deadline" as const,
  },
];

export default function Home() {
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