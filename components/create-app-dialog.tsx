"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CreateAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAppCreated: () => void;
}

export function CreateAppDialog({
  open,
  onOpenChange,
  onAppCreated,
}: CreateAppDialogProps) {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/apps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, identifier }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create app");
      }

      // Reset form
      setName("");
      setIdentifier("");
      onOpenChange(false);
      onAppCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New App</DialogTitle>
          <DialogDescription>
            Create a new app to start tracking analytics. You'll receive a
            unique App ID that you can use in your application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">App Name</Label>
            <Input
              id="name"
              placeholder="My Awesome App"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identifier">
              App Identifier
              <span className="text-xs text-muted-foreground ml-2">
                (e.g., com.company.app)
              </span>
            </Label>
            <Input
              id="identifier"
              placeholder="com.example.myapp"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              pattern="[a-z0-9._-]+"
              title="Only lowercase letters, numbers, dots, dashes, and underscores"
            />
          </div>
          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create App
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
