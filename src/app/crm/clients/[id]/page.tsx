import { MainLayout } from "@/components/layout/main-layout";
import { ClientDetails } from "./client-details";


type Props = {
    params: {
      id: string;
    };
  };

// This function tells Next.js which routes to pre-render during build
export async function generateStaticParams() {
  // In a real application, these IDs would likely come from a database or API
  // For now, we'll pre-render pages for a set of example client IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default function ClientDetailsPage({ params }:Props) {
  // This would normally come from an API/database
  const client = {
    id: params.id,
    name: "James Wilson",
    age: 45,
    email: "james.wilson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    disability: "Mobility Impairment",
    status: "Active",
    careManager: "Dr. Rebecca Chen",
    notes: "Patient shows steady improvement in mobility exercises.",
    emergencyContact: "Sarah Wilson (Wife) - (555) 987-6543",
    insurance: "Healthcare Plus - Policy #12345",
    nextAppointment: "2025-04-15",
  };

  return (
    <MainLayout>
      <ClientDetails client={client} />
    </MainLayout>
  );
}