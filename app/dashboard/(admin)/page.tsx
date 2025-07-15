"use client";

import { useState, useEffect, useCallback, JSX } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import AppSidebar from "../layout/AppSidebar";
import Dashboard from "@dashboard/components/dashboard";
import Settings from "@dashboard/components/Setting";
import AIResumeAssistant from "@dashboard/components/AIResumeAssistant";
import MyCVs from "../components/MyCVs";
import JobsPage from "../components/jobSearch";

// Helper to parse the current view/subview from the query string
function getViewFromSearch(search: string | null) {
  const params = new URLSearchParams(search ?? "");
  const view = params.get("view") ? `/${params.get("view")}` : "/overview"; // Default to /Overview
  const sub = params.get("sub") ?? undefined;
  return { view, sub };
}

// All main and sub routes/components
const PATH_COMPONENTS: Record<
  string,
  (props: { onNavigate: (path: string, sub?: string) => void; sub?: string }) => JSX.Element
> = {
  "/overview": (props) => <Dashboard {...props} />,
  "/my-cvs": () => <MyCVs />,
  "/templates": (props) => (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            props.sub === "free" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => props.onNavigate("/templates", "free")}
        >
          Free Templates
        </button>
        <button
          className={`px-3 py-1 rounded ${
            props.sub === "pro" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => props.onNavigate("/templates", "pro")}
        >
          Pro Templates
        </button>
      </div>
      {props.sub === "pro" ? <div>Pro Templates</div> : <div>Free Templates</div>}
    </div>
  ),
  "/job-search": (props) => <JobsPage />,
  "/settings": (props) => <Settings {...props} />,
};

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedView, setSelectedView] = useState<string>("/overview");
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);

  // ✅ Redirect /dashboard to /dashboard?view=Overview if view is missing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.get("view")) {
      params.set("view", "Overview");
      const newUrl = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname]);

  // ✅ Sync state with query string
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { view, sub } = getViewFromSearch(window.location.search);
    setSelectedView(view);
    setSelectedSub(sub);
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  // ✅ Navigation handler
  const handleNavigate = useCallback(
    (path: string, sub?: string) => {
      setSelectedView(path);
      setSelectedSub(sub);
      const params = new URLSearchParams();
      if (path !== "/Overview") params.set("view", path.replace(/^\//, ""));
      else params.set("view", "Overview");
      if (sub) params.set("sub", sub);
      const url = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", url);
    },
    [pathname]
  );

  const renderContent = () => {
    const Comp = PATH_COMPONENTS[selectedView] || PATH_COMPONENTS["/overview"];
    return Comp({ onNavigate: handleNavigate, sub: selectedSub });
  };

  return (
    <div className="flex">
      <AppSidebar
        onNavigate={handleNavigate}
        selectedView={selectedView}
        selectedSub={selectedSub}
      />
      <main className="w-full">{renderContent()}</main>
    </div>
  );
}
