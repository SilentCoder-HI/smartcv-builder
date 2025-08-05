"use client";

import { useState, useEffect, useCallback, JSX } from "react";
import { usePathname } from "next/navigation";
import AppSidebar from "../layout/AppSidebar";
import Dashboard from "@dashboard/components/dashboard";
import Settings from "@dashboard/components/Setting";
import MyCVs from "../components/MyCVs";
import JobsPage from "../components/jobSearch";
import AppHeader from "../layout/AppHeader";
import LoadingSpinner from "../components/loading/loading";

// Helper to parse the current view/subview from the query string
function getViewFromSearch(search: string | null) {
  const params = new URLSearchParams(search ?? "");
  const view = params.get("view") ? `/${params.get("view")}`.toLowerCase() : "/overview";
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
          className={`px-3 py-1 rounded ${props.sub === "free" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => props.onNavigate("/templates", "free")}
        >
          Free Templates
        </button>
        <button
          className={`px-3 py-1 rounded ${props.sub === "pro" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => props.onNavigate("/templates", "pro")}
        >
          Pro Templates
        </button>
      </div>
      {props.sub === "pro" ? <div>Pro Templates</div> : <div>Free Templates</div>}
    </div>
  ),
  "/job-search": () => <JobsPage />,
  "/settings": (props) => <Settings {...props} />,
};

export default function DashboardPage() {
  const pathname = usePathname();

  const [selectedView, setSelectedView] = useState<string>("/overview");
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Set loading to false after mount
  useEffect(() => {
    setLoading(false);
  }, []);

  // Redirect /dashboard to /dashboard?view=Overview if view is missing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.get("view")) {
      params.set("view", "Overview");
      const newUrl = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname]);

  // Sync state with query string
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { view, sub } = getViewFromSearch(window.location.search);
    setSelectedView(view);
    setSelectedSub(sub);
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  // Navigation handler
  const handleNavigate = useCallback(
    (path: string, sub?: string) => {
      setSelectedView(path);
      setSelectedSub(sub);
      const params = new URLSearchParams();
      if (path.toLowerCase() !== "/overview") params.set("view", path.replace(/^\//, ""));
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
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <AppSidebar
        onNavigate={handleNavigate}
        selectedView={selectedView}
        selectedSub={selectedSub}
      />
      <div className="flex flex-col w-full">
        <AppHeader />
        <main className="flex-1 overflow-auto">
          {loading ? <LoadingSpinner /> : renderContent()}
        </main>
      </div>
    </div>
  );
}
