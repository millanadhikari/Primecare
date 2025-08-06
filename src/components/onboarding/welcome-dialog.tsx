"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Shield,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  BookOpen,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { set } from "date-fns";

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: {
    firstName: string;
    lastName: string;
    role: string;
    isFirstLogin: boolean;
  };
}

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  target?: string;
  content: React.ReactNode;
}

export default function WelcomeDialog({
  isOpen,
  onClose,
  userInfo,
}: WelcomeDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPasswordChange, setShowPasswordChange] = useState(
    userInfo.isFirstLogin
  );
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { updateUser, changePassword } = useAuth();

  const walkthroughSteps: WalkthroughStep[] = [
    {
      id: "welcome",
      title: "Welcome to PrimeCare  Plus!",
      description: "Let's take a quick tour of your new dashboard",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Sparkles className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">
              Welcome, {userInfo.firstName}!
            </h3>
            <p className="text-muted-foreground">
              You're now part of the MediCare Plus team as a {userInfo.role}.
              Let's explore the key features that will help you in your daily
              work.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "dashboard",
      title: "Dashboard Overview",
      description: "Your central hub for all important information",
      icon: <BarChart3 className="h-6 w-6 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">Statistics Cards</span>
              </div>
              <p className="text-xs text-muted-foreground">
                View key metrics like total clients, appointments, and care
                plans
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Charts & Analytics</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Monitor patient visits and track performance trends
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The dashboard gives you a quick overview of your daily activities
            and important metrics.
          </p>
        </div>
      ),
    },
    {
      id: "clients",
      title: "Client Management",
      description: "Manage all your clients and their information",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Client Features</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Add and manage client profiles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Track client status and care plans
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Assign team members to clients
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Filter and search capabilities
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "appointments",
      title: "Appointment Scheduling",
      description: "Schedule and manage appointments efficiently",
      icon: <Calendar className="h-6 w-6 text-orange-500" />,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Scheduling Features</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-orange-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Calendar View</p>
                  <p className="text-xs text-muted-foreground">
                    Visual calendar with drag-and-drop scheduling
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-orange-500 mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Status Tracking</p>
                  <p className="text-xs text-muted-foreground">
                    Track appointment status from scheduled to completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "messages",
      title: "Message Center",
      description: "Handle customer inquiries and communications",
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Communication Hub</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-sm">Unread Messages</span>
                <Badge variant="destructive" className="text-xs">
                  3
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-sm">Starred Messages</span>
                <Badge variant="secondary" className="text-xs">
                  7
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Manage all customer inquiries, mark as read/unread, and respond
                quickly.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "blog",
      title: "Content Management",
      description: "Create and manage blog posts and content",
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <span className="font-medium">Blog Management</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Create and edit blog posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Upload and manage images
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Schedule publications
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                SEO optimization tools
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "settings",
      title: "Settings & Profile",
      description: "Customize your experience and manage your profile",
      icon: <Settings className="h-6 w-6 text-gray-500" />,
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Personalization</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium mb-1">Profile Settings</p>
                <p className="text-xs text-muted-foreground">
                  Update your personal information and preferences
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">System Settings</p>
                <p className="text-xs text-muted-foreground">
                  Configure notifications and integrations
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!passwordData.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    // Simulate API call
    // setTimeout(() => {
    //   setPasswordChanged(true);
    //   toast.success("Password updated successfully");
    //   setTimeout(() => {
    //     setShowPasswordChange(false);
    //     setShowWalkthrough(true);
    //   }, 1000);
    // }, 1000);
    try {
      setPasswordChanged(true);
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
      setShowWalkthrough(true);
    } catch (err) {
      toast.error("Failed to update password");
      console.error("Change password error:", err);
    }
  };

  const handleSkipPasswordChange = () => {
    setShowPasswordChange(false);
    setShowWalkthrough(true);
  };

  const handleNextStep = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinishWalkthrough();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishWalkthrough = async () => {
    setShowWalkthrough(false);
    const updatedProfile = {
      isFirstLogin: false,
    };
    await updateUser(updatedProfile);

    // ✅ Optional: Log or use updated user if needed

    onClose();
    window.location.reload();
    toast.success("Welcome to MediCare Plus! You're all set to get started.");
  };

  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {showPasswordChange && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                  <Shield className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <DialogTitle>Welcome, {userInfo.firstName}!</DialogTitle>
                  <DialogDescription>
                    For security, please change your temporary password
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Change Your Password</CardTitle>
                <CardDescription>
                  Create a strong password to secure your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={handleSkipPasswordChange}>
                    Skip for Now
                  </Button>
                  <Button
                    onClick={handlePasswordChange}
                    disabled={passwordChanged}
                  >
                    {passwordChanged ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Password Updated
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {showWalkthrough && (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {walkthroughSteps[currentStep].icon}
                  <div>
                    <DialogTitle>
                      {walkthroughSteps[currentStep].title}
                    </DialogTitle>
                    <DialogDescription>
                      {walkthroughSteps[currentStep].description}
                    </DialogDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFinishWalkthrough}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Step {currentStep + 1} of {walkthroughSteps.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card>
                <CardContent className="p-6">
                  {walkthroughSteps[currentStep].content}
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={handleFinishWalkthrough}>
                    Skip Tour
                  </Button>
                  <Button onClick={handleNextStep}>
                    {currentStep === walkthroughSteps.length - 1
                      ? "Finish"
                      : "Next"}
                    {currentStep !== walkthroughSteps.length - 1 && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
