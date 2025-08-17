"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import AppSidebar from "../layout/AppSidebar";
import Dashboard from "@dashboard/components/dashboard";
import Settings from "@dashboard/components/Setting";
import AIResumeAssistant  from "@dashboard/components/AIResumeAssistant";
import MyCVs from "../components/MyCVs";
import JobsPage from "../components/jobSearch";
import AppHeader from "../layout/AppHeader";
import LoadingSpinner from "../components/loading/loading";
import { CV } from "../data/data";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { CVData } from "@/types/cv-types";
import { Job } from "@/types/jobs-types";
import { fetchJobs } from "../utils/getJobs";
import { frontendDeveloperCV } from "@/data/demoCVS/developer/developer-demo-cvs";

// --- Keyword Extraction System ---

type KeywordMap = Record<string, number>;
// Global keyword frequency map (in-memory, not persisted)
const allKeywords: KeywordMap = {};

// --- Helper Functions ---

function getViewFromSearch(search: string | null) {
  const params = new URLSearchParams(search ?? "");
  const view = params.get("view")
    ? `/${params.get("view")}`.toLowerCase()
    : "/overview";
  const sub = params.get("sub") ?? undefined;
  return { view, sub };
}

// Extract and rank keywords from a description
function extractAndRankKeywords(description: string): KeywordMap {
  if (!description) return {};
  const words = description
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/);

  const stopWords = [
    "the", "is", "at", "which", "on", "and", "a", "an", "in", "of", "for", "to", "with", "by", "we", "are", "looking",
    "it", "this", "that", "as", "from", "or", "be", "was", "were", "has", "have", "had", "but", "not", "so", "if", "then", "than", "can", "will", "would", "should", "could", "do", "does", "did", "you", "your", "our", "us", "they", "them", "their", "he", "she", "his", "her", "him", "i", "me", "my", "mine", "about", "also", "just", "out", "up", "down", "over", "under", "again", "more", "most", "some", "such", "no", "yes", "all", "any", "each", "other", "who", "whom", "whose", "when", "where", "why", "how", "what", "been", "because", "into", "too", "very", "there", "here", "after", "before", "between", "during", "while", "both", "few", "many", "much", "every", "own", "same", "new", "old", "off", "even", "may", "might", "get", "got", "getting", "go", "goes", "went", "come", "comes", "came", "see", "seen", "use", "used", "using", "make", "makes", "made", "want", "wants", "wanted", "need", "needs", "needed", "say", "says", "said", "let", "lets", "let's"
  ];

  const keywordMap: KeywordMap = {};

  for (const word of words) {
    if (word.length > 2 && !stopWords.includes(word)) {
      keywordMap[word] = (keywordMap[word] || 0) + 1;
    }
  }
  return keywordMap;
}

// Save keywords with ranking from a string (job description)
function saveKeywords(description: string): void {
  const keywordMap = extractAndRankKeywords(description);
  for (const word in keywordMap) {
    if (Object.prototype.hasOwnProperty.call(keywordMap, word)) {
      allKeywords[word] = (allKeywords[word] || 0) + keywordMap[word];
    }
  }
}

// Remove HTML tags and normalize whitespace
function stripHTML(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function DashboardPage() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // --- UI/UX State ---
  const [selectedView, setSelectedView] = useState<string>("/overview"); // Current main view
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined); // Current subview/tab
  const [loading, setLoading] = useState<boolean>(true); // Global loading spinner
  const [error, setError] = useState<string | null>(null); // Global error message

  // --- CV Data State ---
  const [cvs, setCvs] = useState<CV[]>([]); // All user CVs
  const [editCV, setEditCV] = useState<CV | null>(null); // CV being edited

  // --- Add/Edit Form State ---
  const [showAddForm, setShowAddForm] = useState<boolean>(false); // Show add CV form
  const [currentStep, setCurrentStep] = useState<number>(1); // Step in add/edit CV wizard

  // --- Pagination/Filter State for MyCVs ---
  const [selectedProfileId] = useState<string>("All"); // Filter: profileId
  const [selectedCreatedAt] = useState<string>("All"); // Filter: createdAt
  const [selectedStatus] = useState<string>("All"); // Filter: status
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination: current page
  const CVS_PER_PAGE = 10;

  // --- Job Search State ---
  const [query] = useState(frontendDeveloperCV?.personalInfo?.jobTitle || ""); // Job search query
  const [allJobs, setAllJobs] = useState<Job[]>([]); // All fetched jobs
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    // Saved jobs from localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("savedJobs");
        if (stored && Array.isArray(JSON.parse(stored))) {
          return JSON.parse(stored);
        }
        return [];
      } catch {
        return [];
      }
    }
    return [];
  });

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
        status: publish ? "active" : "inactive",
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
  async function updateCV(newCVData: CVData, publish: boolean = false, Template: string, EditCVID: string | number) {
    setLoading(true);
    setError(null);
    try {
      const body = {
        id: EditCVID,
        content: newCVData,
        title: newCVData.personalInfo.jobTitle || "Untitled CV",
        description: `CV for ${newCVData.personalInfo.fullName || "Unknown"}`,
        templateId: Template,
        status: publish ? "active" : "inactive",
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
        prev.map((cv) => (cv.id === EditCVID ? updated : cv))
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

  // --- Utility: Generate random string for CV id ---
  function generate24CharString(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 24; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // --- Effect: Set loading to false after mount ---
  useEffect(() => {
    setLoading(false);
  }, []);

  // --- Effect: Redirect /dashboard to /dashboard?view=Overview if view is missing ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.get("view")) {
      params.set("view", "Overview");
      const newUrl = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname]);

  // --- Effect: Sync state with query string ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { view, sub } = getViewFromSearch(window.location.search);
    setSelectedView(view);
    setSelectedSub(sub);
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  // --- Effect: Fetch CVs on mount (simulate userId for demo) ---
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserCVs(session.user.id);
    }
  }, [session?.user?.id]);

  // --- Job Normalization ---
  const normalizeJob = useCallback(
    (job: any): Job => ({
      id: job.id || job.jobSlug || job.url,
      url: job.url,
      jobSlug: job.jobSlug,
      jobTitle: job.jobTitle || job.title || "",
      companyName: job.companyName || job.company || "",
      companyLogo: job.companyLogo || job.logo,
      jobIndustry: job.jobIndustry,
      jobType: job.jobType || job.type,
      jobGeo: job.jobGeo,
      jobLevel: job.jobLevel,
      jobExcerpt: job.jobExcerpt,
      jobDescription: job.jobDescription || job.description || "",
      pubDate: job.pubDate,
      publisher: job.publisher,
      salary: job.salary,
      benefits: job.benefits,
      requirements: job.requirements,
      location: job.jobGeo || job.location || "",
      saved: savedJobs.includes(job.id || job.jobSlug || job.url),
      applicationUrl: job.applicationUrl || job.url,
    }),
    [savedJobs]
  );

  // --- Effect: Fetch all jobs and extract keywords from their descriptions ---
  useEffect(() => {
    let isMounted = true;
    const fetchAllJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchJobs(`${query}`);
        const jobs: Job[] = (Array.isArray(data) ? data : []).map(normalizeJob);

        // Save all keywords from all job descriptions (only once, after API data comes)
        jobs.forEach((job) => {
          saveKeywords(stripHTML(job.jobDescription));
        });

        setAllJobs(jobs);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again.");
        setAllJobs([]);
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAllJobs();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, normalizeJob]);

  // --- Main Path Components Map ---
  type MainContentProps = {
    onNavigate: (path: string, sub?: string) => void;
    sub?: string;
    // Add more props as needed for each component
    // For MyCVs, we need: cvs, addCV, updateCV, deleteCV, editCV, setEditCV, showAddForm, setShowAddForm, currentStep, setCurrentStep, error, loading, pagination/filter state
    // For JobsPage, we need: allJobs, savedJobs, setSavedJobs, allKeywords
  };

  const PATH_COMPONENTS: {
    [key: string]: React.ComponentType<MainContentProps>;
  } = {
    "/overview": (props: MainContentProps) => (
      <Dashboard
        allJobs={allJobs}
        cvs={cvs}
        onNavigate={props.onNavigate}
      />
    ),
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
    "/ai-assistant": (props: MainContentProps) => <AIResumeAssistant />,
    "/job-search": (props: MainContentProps) => (
      <JobsPage
        allJobs={allJobs}
        savedJobs={savedJobs}
        setSavedJobs={setSavedJobs}
        setAllJobs={setAllJobs}
        allKeywords={allKeywords}
        onNavigate={props.onNavigate}
        jobMatchingRequestsLeft={10}
      />
    ),
    "/settings": (props: MainContentProps) => <Settings />,
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
