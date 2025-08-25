"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccessibilityIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { forgotPassword } from "../lib/staffApi";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to trigger password reset
      // For demo purposes, we'll simulate a successful request
      await forgotPassword(email);
      setEmail(""); // Clear the input field
      setIsSubmitted(true);
      toast.success("Reset instructions sent to your email");
    } catch (error) {
      toast.error("Failed to send reset instructions");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <AccessibilityIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            {isSubmitted
              ? "Check your email for reset instructions"
              : "Enter your email to receive reset instructions"}
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                className="w-full mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Button>
              <Link
                href="/crm/login"
                className="flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="text-center">
            <p className="mb-4 text-muted-foreground">
              We have sent password reset instructions to your email. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
            <Link
              href="/crm/login"
              className="flex items-center justify-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
