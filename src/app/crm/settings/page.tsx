"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { CloudinaryUsage } from "./cloudinary-usage";
import { NeonUsage } from "./neon-usage";

export default function SettingsPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Settings"
        description="Manage your application settings and integrations."
      />

      <div className="space-y-6">
        <CloudinaryUsage />
        <NeonUsage />

        {/* Placeholder for other settings components */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
            <span className="text-muted-foreground">Email Settings</span>
          </div>
          <div className="h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
            <span className="text-muted-foreground">Notification Settings</span>
          </div>
          <div className="h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
            <span className="text-muted-foreground">Security Settings</span>
          </div>
          <div className="h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
            <span className="text-muted-foreground">Backup Settings</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
