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

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

function SidebarLink({ href, icon, label, isCollapsed }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-muted",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              )}
            >
              {icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted",
        isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}

function NavGroup({ title, children, isCollapsed }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (isCollapsed) {
    return <div className="mt-4">{children}</div>;
  }

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>
      <div className={cn("mt-1 space-y-1", isOpen ? "block" : "hidden")}>
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
  const { user } = useAuth();
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
    logout();
  };
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-4 w-4 " />
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all lg:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-gray-300 bg-card transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[68px]" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-300 px-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-semibold transition-opacity",
              isCollapsed ? "opacity-0" : "opacity-100"
            )}
          >
            <AccessibilityIcon className="h-6 w-6 text-primary" />
            <span
              className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0" : "opacity-100"
              )}
            >
              PrimeCare Plus
            </span>
          </Link>
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
              className="hidden lg:flex bg-red-200"
              onClick={() => onCollapse(!isCollapsed)}
            >
              <Menu className="h-4 w-4 " />
            </Button>
          </div>
        </div>
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
                href="/accessibility"
                icon={<AccessibilityIcon className="h-5 w-5" />}
                label="Accessibility"
                isCollapsed={isCollapsed}
              />
            </NavGroup>
            <NavGroup title="System" isCollapsed={isCollapsed}>
              <SidebarLink
                href="/settings"
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/activity"
                icon={<Activity className="h-5 w-5" />}
                label="Activity Log"
                isCollapsed={isCollapsed}
              />
            </NavGroup>
          </nav>
        </div>
        <div
          className="border-t border-gray-200 p-4 cursor-pointer hover:bg-gray-100"
          // onClick={() => router.push("/crm/profile")}
          onClick={handleLogout}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10">
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
                DR
              </div>
            </div>
            <div
              className={cn(
                "transition-opacity",
                isCollapsed ? "hidden" : "block"
              )}
            >
              <div className="text-sm font-medium">
                {user?.data?.user.firstName} {user?.data?.user.lastName}
              </div>
              <div className="text-xs text-muted-foreground">
                Medical Director
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
