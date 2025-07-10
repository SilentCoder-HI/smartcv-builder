"use client";

import { useState } from "react";
import {
  Trash2,
  ExternalLink,
  Loader2,
  User,
  PieChart,
  Link,
  Settings2,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import UserAddressCard from "./user-profile/UserAddressCard";
import UserInfoCard from "./user-profile/UserInfoCard";
import UserMetaCard from "./user-profile/UserMetaCard";

type SectionType = "menu" | "account" | "usage" | "links" | "other";

export default function SettingsPage() {
  const [view, setView] = useState<SectionType>("menu");
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Account deleted!");
      setLoading(false);
    }, 2000);
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setView("menu")}
        className="rounded-full"
      >
        <ArrowLeft />
      </Button>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  return (
    <div className="mx-auto p-6 min-h-screen">
      {view === "menu" && (
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="flex justify-start gap-3"
            onClick={() => setView("account")}
          >
            <User size={18} />
            Account
          </Button>
          <Button
            variant="outline"
            className="flex justify-start gap-3"
            onClick={() => setView("usage")}
          >
            <PieChart size={18} />
            Usage
          </Button>
          <Button
            variant="outline"
            className="flex justify-start gap-3"
            onClick={() => setView("links")}
          >
            <Link size={18} />
            Links
          </Button>
          <Button
            variant="outline"
            className="flex justify-start gap-3"
            onClick={() => setView("other")}
          >
            <Settings2 size={18} />
            Other
          </Button>
        </div>
      )}

      {view === "account" && (
        <>
        <UserMetaCard/>
        <UserInfoCard/>
        <UserAddressCard/>
        </>
      )}

      {view === "usage" && (
        <div className="space-y-6">
          {renderHeader("Usage")}

          <div>
            <p className="mb-1 text-sm font-medium">📄 CVs Created (3 / 5)</p>
            <Progress value={(3 / 5) * 100} />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">🤖 AI Uses (2 / 10)</p>
            <Progress value={(2 / 10) * 100} />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">📤 Exports (5 / 10)</p>
            <Progress value={(5 / 10) * 100} />
          </div>

          <Button variant="outline">Upgrade to Pro</Button>
        </div>
      )}

      {view === "links" && (
        <div className="space-y-4">
          {renderHeader("Links")}
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" placeholder="https://github.com/username" />
          </div>
          <div>
            <Label htmlFor="portfolio">Portfolio</Label>
            <Input id="portfolio" placeholder="https://yourportfolio.com" />
          </div>
          <Button className="mt-2">Save Links</Button>
        </div>
      )}

      {view === "other" && (
        <div className="space-y-4">
          {renderHeader("Other")}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ExternalLink size={16} />
            Contact Support
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 size={16} />}
            Delete Account
          </Button>
        </div>
      )}
    </div>
  );
}
