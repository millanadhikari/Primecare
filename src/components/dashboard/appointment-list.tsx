import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar?: string;
  patientInitials: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "checked-in" | "in-progress" | "completed" | "cancelled";
}

interface AppointmentsListProps {
  appointments: Appointment[];
  className?: string;
}

export function AppointmentsList({ appointments, className }: AppointmentsListProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
        <CardDescription>You have {appointments.length} appointments scheduled today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between space-x-4 rounded-md border p-3 transition-all hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={appointment.patientAvatar} />
                  <AvatarFallback>{appointment.patientInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {appointment.patientName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.time} - {appointment.type}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  appointment.status === "scheduled"
                    ? "outline"
                    : appointment.status === "checked-in"
                    ? "secondary"
                    : appointment.status === "in-progress"
                    ? "default"
                    : appointment.status === "completed"
                    ? "outline"
                    : "destructive"
                }
              >
                {appointment.status.replace("-", " ")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}