"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AccessibilityIcon,
  Activity,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/app/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

function SidebarLink({ href, icon, label, isCollapsed }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClass =
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-muted";
  const activeClass = isActive
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "";

  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex h-10 w-10 items-center justify-center",
              activeClass
            )}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Link href={href} className={cn(baseClass, activeClass)}>
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}

function NavGroup({
  title,
  children,
  isCollapsed,
}: {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-4">
      {!isCollapsed && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground"
        >
          {title}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "rotate-180" : ""
            )}
          />
        </button>
      )}
      <div className={cn("space-y-1", isOpen ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const initials = `${user?.data?.user?.firstName?.[0] ?? ""}${
    user?.data?.user?.lastName?.[0] ?? ""
  }`;
  if (!user) return null;
  const isAdmin = user?.data?.user?.role === "ADMIN";
  const isCoordinator = user?.data?.user?.role === "COORDINATOR";
  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all lg:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300",
          isCollapsed ? "w-[68px]" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <AccessibilityIcon className="h-6 w-6 text-primary" />
              <span>PrimeCare Plus </span>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCollapse(!isCollapsed)}
              className="hidden lg:flex"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="flex flex-col gap-1 px-2">
            <SidebarLink
              href="/crm"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/crm/clients"
              icon={<Users className="h-5 w-5" />}
              label="Clients"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/appointments"
              icon={<Calendar className="h-5 w-5" />}
              label="Appointments"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/records"
              icon={<ClipboardList className="h-5 w-5" />}
              label="Medical Records"
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/analytics"
              icon={<PieChart className="h-5 w-5" />}
              label="Analytics"
              isCollapsed={isCollapsed}
            />
            {isAdmin && (
              <span>
                <NavGroup title="Administration" isCollapsed={isCollapsed}>
                  <SidebarLink
                    href="/crm/staff"
                    icon={<Users className="h-5 w-5" />}
                    label="Staff Directory"
                    isCollapsed={isCollapsed}
                  />
                  <SidebarLink
                    href="/crm/documents"
                    icon={<FileText className="h-5 w-5" />}
                    label="Documents"
                    isCollapsed={isCollapsed}
                  />
                  <SidebarLink
                    href="/crm/blogs"
                    icon={<BookOpen className="h-5 w-5" />}
                    label="Blog Management"
                    isCollapsed={isCollapsed}
                  />
                  <SidebarLink
                    href="/crm/messages"
                    icon={<MessageSquare className="h-5 w-5" />}
                    label="Messages"
                    isCollapsed={isCollapsed}
                  />
                </NavGroup>
                <NavGroup title="System" isCollapsed={isCollapsed}>
                  <SidebarLink
                    href="/crm/settings"
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                    isCollapsed={isCollapsed}
                  />
                  <SidebarLink
                    href="/crm/activity"
                    icon={<Activity className="h-5 w-5" />}
                    label="Activity Log"
                    isCollapsed={isCollapsed}
                  />
                </NavGroup>
              </span>
            )}
          </nav>
        </div>

        {/* Footer */}
        <div
          className="border-t p-4 hover:bg-muted cursor-pointer"
          onClick={() => router.push("/crm/profile")}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
              <AvatarImage
                src={
                  user?.data?.user.profileImage ??
                  "https://via.placeholder.com/150"
                }
                className="h-full w-full object-cover rounded-full"
                alt="User avatar"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <div className="text-sm font-medium">
                  {user?.data?.user.firstName} {user?.data?.user.lastName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {user?.data?.user?.role}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
