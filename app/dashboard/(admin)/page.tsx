"use client";

import { useState } from "react";
import AppSidebar from "../layout/AppSidebar";
import Dashboard from "@dashboard/components/dashboard"
import Settings from "@dashboard/components/Setting";
import AIResumeAssistant from "@dashboard/components/AIResumeAssistant";
import MyCVs from "../components/MyCVs";
// import other components as needed...

export default function DashboardPage() {
  const [selectedPath, setSelectedPath] = useState("/");

  const renderContent = () => {
    switch (selectedPath) {
      case "/":
        return <Dashboard />
      case "/my-cvs":
        return <MyCVs/>;
      case "/ai-assistant":
        return <AIResumeAssistant />
      case "/templates/free":
        return <div>Free Templates</div>;
      case "/templates/pro":
        return <div>Pro Templates</div>;
      case "/settings":
        return <Settings />
      // ... other cases
      default:
        return <Dashboard />
    }
  };

  return (
    <div className="flex">
      <AppSidebar onNavigate={(path) => setSelectedPath(path)} />
      <main className="w-full">{renderContent()}</main>
    </div>
  );
}
