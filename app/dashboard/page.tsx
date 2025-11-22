"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { CreateAppDialog } from "@/components/create-app-dialog";
import { AnalyticsView } from "@/components/analytics-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface App {
  id: string;
  name: string;
  identifier: string;
  appId: string;
  logs?: any[];
  _count?: {
    logs: number;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [apps, setApps] = useState<App[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  // Fetch apps on mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchApps();
    }
  }, [status]);

  // Fetch app details when selected
  useEffect(() => {
    if (selectedAppId) {
      fetchAppDetails(selectedAppId);
    }
  }, [selectedAppId]);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/apps");
      const data = await response.json();
      setApps(data.apps || []);

      // Auto-select first app if none selected
      if (!selectedAppId && data.apps.length > 0) {
        setSelectedAppId(data.apps[0].id);
      }
    } catch (error) {
      console.error("Error fetching apps:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppDetails = async (appId: string) => {
    try {
      setAppLoading(true);
      const response = await fetch(`/api/apps/${appId}`);
      const data = await response.json();
      setSelectedApp(data.app);
    } catch (error) {
      console.error("Error fetching app details:", error);
    } finally {
      setAppLoading(false);
    }
  };

  const handleAppCreated = () => {
    fetchApps();
  };

  const handleSelectApp = (appId: string) => {
    setSelectedAppId(appId);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AppSidebar
        apps={apps}
        selectedAppId={selectedAppId}
        onSelectApp={handleSelectApp}
        onCreateApp={() => setCreateDialogOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1">
        <div className="container py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
              Welcome back, {session.user.name || session.user.email}!
            </h1>
            <p className="text-muted-foreground">
              Manage your apps and track analytics
            </p>
          </div>

          {/* Content Area */}
          {appLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : selectedApp ? (
            <AnalyticsView app={selectedApp} />
          ) : apps.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Get Started with LocaleOS Analytics</CardTitle>
                <CardDescription>
                  Create your first app to start tracking analytics and user behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No apps yet. Click the "Create App" button in the sidebar to get started!
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">
                  Select an app from the sidebar to view analytics
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create App Dialog */}
      <CreateAppDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onAppCreated={handleAppCreated}
      />
    </div>
  );
}
