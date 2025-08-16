"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import AppSidebar from "../layout/AppSidebar";
import Dashboard from "@dashboard/components/dashboard";
import Settings from "@dashboard/components/Setting";
import MyCVs from "../components/MyCVs";
import JobsPage from "../components/jobSearch";
import AppHeader from "../layout/AppHeader";
import LoadingSpinner from "../components/loading/loading";
import { CV } from "../data/data";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { CVData } from "@/types/cv-types";

// --- Helper Types ---
type DashboardPageProps = {};
type PathComponentProps = {
  onNavigate: (path: string, sub?: string) => void;
  sub?: string;
  cvs: CV[];
  setCvs: React.Dispatch<React.SetStateAction<CV[]>>;
  addCV: (newCVData: CVData, publish?: boolean) => Promise<void>;
  updateCV: (newCVData: CVData, publish?: boolean) => Promise<void>;
  deleteCV: (id: string | number, title: string) => Promise<void>;
};

// --- Helper Functions ---

function getViewFromSearch(search: string | null) {
  const params = new URLSearchParams(search ?? "");
  const view = params.get("view")
    ? `/${params.get("view")}`.toLowerCase()
    : "/overview";
  const sub = params.get("sub") ?? undefined;
  return { view, sub };
}

export default function DashboardPage(_props: DashboardPageProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // --- State: UI/UX Controls ---
  const [selectedView, setSelectedView] = useState<string>("/overview");
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [editCV, setEditCV] = useState<CV | null>(null);

  // --- State: Data ---
  const [cvs, setCvs] = useState<CV[]>([]);
  const [error, setError] = useState<string | null>(null);

  // --- Pagination/Filter State for Delete Adjustments ---
  const [selectedProfileId] = useState<string>("All");
  const [selectedCreatedAt] = useState<string>("All");
  const [selectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const CVS_PER_PAGE = 10;

  // --- Add/Edit Form State ---
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

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

  // --- API: Fetch User CVs ---
  async function fetchUserCVs(userId?: string) {
    setLoading(true);
    setError(null);
    const url = userId
      ? `/dashboard/api/usersCV?userId=${encodeURIComponent(userId)}`
      : "/dashboard/api/usersCV";
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || res.statusText);
      }
      const data = await res.json();
      setCvs(data);
    } catch (error: any) {
      setError(error?.message || "Failed to load CVs");
      setCvs([]);
      toast.error(error?.message || "Failed to load CVs");
    } finally {
      setLoading(false);
    }
  }

  // --- API: Add New CV ---
  async function addCV(newCVData: CVData, publish: boolean = false, Template: string) {
    setLoading(true);
    setError(null);
    try {
      const body = {
        id: generate24CharString(),
        userId: session?.user?.id,
        profileId: newCVData.personalInfo.fullName || "Unknown",
        templateId: Template,
        title: newCVData.personalInfo.jobTitle || "Untitled CV",
        description: `CV for ${newCVData.personalInfo.fullName || "Unknown"}`,
        export: false,
        content: newCVData,
        status: publish? "active":"inactive",
      };
      const res = await fetch("/dashboard/api/usersCV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          err = {};
        }
        throw new Error(err?.error || res.statusText);
      }
      const created = await res.json();
      setCvs((prev: CV[]) => [...prev, created]);
      toast.success(
        `CV "${created.title}" saved${publish ? " & published" : ""}!`
      );
      setShowAddForm(false);
      setCurrentStep(1);
    } catch (error: any) {
      setError(error?.message || "Failed to add CV");
      toast.error(error?.message || "Failed to add CV");
    } finally {
      setLoading(false);
    }
  }

  // --- API: Update CV ---
  async function updateCV(newCVData: CVData, publish: boolean = false, Template: string) {
    if (!editCV) return;
    setLoading(true);
    setError(null);
    try {
      const body = {
        id: editCV.id,
        content: newCVData,
        title: newCVData.personalInfo.jobTitle || "Untitled CV",
        description: `CV for ${newCVData.personalInfo.fullName || "Unknown"}`,
        templateId: Template,
        status: publish? "active":"inactive",
        updatedAt: new Date().toISOString(),
      };
      const res = await fetch("/dashboard/api/usersCV", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          err = {};
        }
        throw new Error(err?.error || res.statusText);
      }
      const updated = await res.json();
      setCvs((prev: CV[]) =>
        prev.map((cv) => (cv.id === editCV.id ? updated : cv))
      );
      toast.success(
        `CV "${updated.title}" updated${publish ? " & published" : ""}!`
      );
      setEditCV(null);
      setShowAddForm(false);
      setCurrentStep(1);
    } catch (error: any) {
      setError(error?.message || "Failed to update CV");
      toast.error(error?.message || "Failed to update CV");
    } finally {
      setLoading(false);
    }
  }

  // --- API: Delete CV ---
  async function deleteCV(id: string | number, title: string) {
    setLoading(true);
    setError(null);
    try {
      const url = `/dashboard/api/usersCV?id=${encodeURIComponent(String(id))}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          err = {};
        }
        throw new Error(err?.error || res.statusText);
      }
      setCvs((prev: CV[]) => prev.filter((cv) => cv.id !== id));
      toast.success(`CV "${title}" deleted!`);
      // Adjust page if needed after deletion
      setTimeout(() => {
        const newFiltered = cvs
          .filter((cv) => cv.id !== id)
          .filter((cv) => {
            const profileMatch =
              selectedProfileId === "All" ||
              cv.profileId === selectedProfileId;
            const createdAtMatch =
              selectedCreatedAt === "All" ||
              cv.createdAt === selectedCreatedAt;
            const statusMatch =
              selectedStatus === "All" || cv.status === selectedStatus;
            return profileMatch && createdAtMatch && statusMatch;
          });
        const newTotalPages = Math.ceil(newFiltered.length / CVS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      }, 0);
    } catch (error: any) {
      setError(error?.message || "Failed to delete CV");
      toast.error(error?.message || "Failed to delete CV");
    } finally {
      setLoading(false);
    }
  }

  // Generates a random string of 24 alphanumeric characters
  function generate24CharString(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 24; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Fetch CVs on mount (simulate userId for demo)
  useEffect(() => {
    fetchUserCVs(session?.user?.id);
  }, [session?.user?.id]);

  // --- Navigation Handler ---
  const handleNavigate = useCallback(
    (path: string, sub?: string) => {
      setSelectedView(path);
      setSelectedSub(sub);
      const params = new URLSearchParams();
      if (path.toLowerCase() !== "/overview")
        params.set("view", path.replace(/^\//, ""));
      else params.set("view", "Overview");
      if (sub) params.set("sub", sub);
      const url = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", url);
    },
    [pathname]
  );

  // --- Main Path Components Map ---
  type MainContentProps = {
    onNavigate: (path: string, sub?: string) => void;
    sub?: string;
  };

  const PATH_COMPONENTS: {
    [key: string]: React.ComponentType<MainContentProps>;
  } = {
    "/overview": (props: MainContentProps) => <Dashboard cvs={cvs} onNavigate={props.onNavigate} />,
    "/my-cvs": (props: MainContentProps) => (
      <MyCVs
        cvs={cvs}
        addCV={addCV}
        updateCV={updateCV}
        deleteCV={deleteCV}
        onNavigate={props.onNavigate}
      />
    ),
    "/templates": (props: MainContentProps) => (
      <div>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${props.sub === "free"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
              }`}
            onClick={() => props.onNavigate("/templates", "free")}
          >
            Free Templates
          </button>
          <button
            className={`px-3 py-1 rounded ${props.sub === "pro"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
              }`}
            onClick={() => props.onNavigate("/templates", "pro")}
          >
            Pro Templates
          </button>
        </div>
        {props.sub === "pro" ? (
          <div>Pro Templates</div>
        ) : (
          <div>Free Templates</div>
        )}
      </div>
    ),
    "/job-search": () => <JobsPage />,
    "/settings": () => <Settings />,
  };

  // --- Render Main Content ---
  const renderContent = () => {
    const Comp = PATH_COMPONENTS[selectedView] || PATH_COMPONENTS["/overview"];
    return (
      <Comp
        onNavigate={handleNavigate}
        sub={selectedSub}
      />
    );
  };

  // --- Main Render ---
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
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
