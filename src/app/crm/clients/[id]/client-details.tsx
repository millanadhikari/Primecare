"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Upload, File, Trash2, Camera } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

interface ClientDetailsProps {
  client: {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    disability: string;
    status: string;
    careManager: string;
    notes: string;
    emergencyContact: string;
    insurance: string;
    nextAppointment: string;
  };
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [documents, setDocuments] = useState<Document[]>([]);

  let fullName = client.name;
  let nameParts = fullName.trim().split(" ");
  let initials = "";

  if (nameParts.length >= 2) {
    initials = nameParts[0][0] + nameParts[1][0];
    console.log(initials); // Output: "JW"
  } else {
    console.log("Full name must include at least first and last name.");
  }
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newDocuments: Document[] = Array.from(files).map((file, index) => ({
        id: (documents.length + index + 1).toString(),
        name: file.name,
        type: file.type,
        uploadedAt: new Date().toLocaleDateString(),
        size: `${(file.size / 1024).toFixed(2)} KB`,
      }));

      setDocuments([...documents, ...newDocuments]);
      toast.success("Documents uploaded successfully");
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast.success("Document deleted successfully");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex items-center gap-4">
          <span className="absolute left-10 top-1">
            {/* <Camera /> */}
          </span>
          <span className="bg-gray-300 rounded-full h-20  w-20 flex items-center justify-center text-bold text-xl ">
            {/* {client.name.charAt(0).toUpperCase()} */}
            {initials}
          </span>

          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">Client ID: {client.id}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Clients
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input value={client.name} />
                </div>
                <div className="grid gap-2">
                  <Label>Age</Label>
                  <Input type="number" value={client.age} />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" value={client.email} />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={client.phone} />
                </div>
                <div className="grid gap-2">
                  <Label>Address</Label>
                  <Textarea value={client.address} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Disability Type</Label>
                  <Input value={client.disability} />
                </div>
                <div className="grid gap-2">
                  <Label>Care Manager</Label>
                  <Input value={client.careManager} />
                </div>
                <div className="grid gap-2">
                  <Label>Insurance Details</Label>
                  <Input value={client.insurance} />
                </div>
                <div className="grid gap-2">
                  <Label>Emergency Contact</Label>
                  <Input value={client.emergencyContact} />
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea value={client.notes} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-8">
                  <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Drag and drop files here, or click to select files
                      </p>
                      <Input
                        type="file"
                        multiple
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileUpload}
                      />
                      <Button asChild>
                        <label htmlFor="file-upload">Choose Files</label>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <File className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.size} • Uploaded on {doc.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Add appointment notes..." />
                </div>
                <Button className="w-fit">Schedule Appointment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
