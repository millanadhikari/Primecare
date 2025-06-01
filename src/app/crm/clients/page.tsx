"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { UserPlus, Filter, Trash2, MoreVertical, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Sample clients data
const initialClients = [
  {
    id: "1",
    name: "James Wilson",
    age: 45,
    disability: "Mobility Impairment",
    status: "Active",
    lastVisit: "Apr 5, 2025",
    careManager: "Dr. Rebecca Chen",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    age: 32,
    disability: "Visual Impairment",
    status: "Active",
    lastVisit: "Apr 2, 2025",
    careManager: "Dr. Mark Johnson",
  },
  {
    id: "3",
    name: "Michael Chen",
    age: 56,
    disability: "Hearing Loss",
    status: "Active",
    lastVisit: "Mar 30, 2025",
    careManager: "Dr. Rebecca Chen",
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    age: 28,
    disability: "Developmental Disability",
    status: "New",
    lastVisit: "Apr 8, 2025",
    careManager: "Dr. Rebecca Chen",
  },
  {
    id: "5",
    name: "David Thompson",
    age: 61,
    disability: "Mobility Impairment",
    status: "Inactive",
    lastVisit: "Feb 12, 2025",
    careManager: "Dr. Mark Johnson",
  },
  {
    id: "6",
    name: "Lisa Williams",
    age: 42,
    disability: "Multiple Sclerosis",
    status: "Active",
    lastVisit: "Mar 25, 2025",
    careManager: "Dr. Jennifer Lee",
  },
  {
    id: "7",
    name: "Robert Garcia",
    age: 55,
    disability: "Chronic Pain",
    status: "Active",
    lastVisit: "Apr 1, 2025",
    careManager: "Dr. Jennifer Lee",
  },
  {
    id: "8",
    name: "Michelle Kim",
    age: 37,
    disability: "Cerebral Palsy",
    status: "Active",
    lastVisit: "Mar 28, 2025",
    careManager: "Dr. Mark Johnson",
  },
];

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [newClient, setNewClient] = useState({
    name: "",
    age: "",
    disability: "",
    careManager: "",
  });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.age || !newClient.disability || !newClient.careManager) {
      toast.error("Please fill in all required fields");
      return;
    }

    const client = {
      id: (clients.length + 1).toString(),
      name: newClient.name,
      age: parseInt(newClient.age),
      disability: newClient.disability,
      status: "New",
      lastVisit: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      careManager: newClient.careManager,
    };

    setClients([...clients, client]);
    setNewClient({ name: "", age: "", disability: "", careManager: "" });
    toast.success("Client added successfully");
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
    toast.success("Client deleted successfully");
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        title="Clients"
        description="View and manage all client records."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter the client&aspos;s information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 ">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={newClient.age}
                  onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="disability">Disability</Label>
                <Input
                  id="disability"
                  value={newClient.disability}
                  onChange={(e) => setNewClient({ ...newClient, disability: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="careManager">Care Manager</Label>
                <Input
                  id="careManager"
                  value={newClient.careManager}
                  onChange={(e) => setNewClient({ ...newClient, careManager: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddClient}>Add Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-6 border-red-300">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex w-full items-center space-x-2 sm:w-auto">
              <Input
                placeholder="Search clients..."
                className="w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-md border border-gray-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="hidden md:table-cell">Disability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                  <TableHead className="hidden lg:table-cell">Care Manager</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody  >
                {filteredClients.map((client) => (
                  <TableRow   key={client.id}>
                    <TableCell className="text-md pl-4 ">{client.name}</TableCell>
                    <TableCell>{client.age}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.disability}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.status === "Active"
                            ? "default"
                            : client.status === "New"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.lastVisit}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {client.careManager}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/crm/clients/${client.id}`)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}