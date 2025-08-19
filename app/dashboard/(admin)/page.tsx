"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import AppSidebar from "../layout/AppSidebar";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("@dashboard/components/dashboard"), { ssr: false });
const Settings = dynamic(() => import("@dashboard/components/Setting"), { ssr: false });
const AIResumeAssistant = dynamic(() => import("@dashboard/components/AIResumeAssistant"), { ssr: false });
const MyCVs = dynamic(() => import("../components/MyCVs"), { ssr: false });
const JobsPage = dynamic(() => import("../components/jobSearch"), { ssr: false });
import AppHeader from "../layout/AppHeader";
import LoadingSpinner from "../components/loading/loading";
import { CV } from "../data/data";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { CVData } from "@/types/cv-types";
import { Job } from "@/types/jobs-types";
import TemplatesSelector from "../components/Templates";

// --- Keyword Extraction System ---

type KeywordMap = Record<string, number>;
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

function saveKeywords(description: string): void {
  const keywordMap = extractAndRankKeywords(description);
  for (const word in keywordMap) {
    if (Object.prototype.hasOwnProperty.call(keywordMap, word)) {
      allKeywords[word] = (allKeywords[word] || 0) + keywordMap[word];
    }
  }
}

function stripHTML(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function DashboardPage() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // --- UI/UX State ---
  const [selectedView, setSelectedView] = useState<string>("/overview");
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCVloaded, setisCVloaded] = useState<boolean>(false);
  const [jobloading, setjobloading] = useState<[boolean, String]>([true, ""]);
  const [error, setError] = useState<string | null>(null);

  // --- CV Data State ---
  const [cvs, setCvs] = useState<CV[]>([]);
  const [editCV, setEditCV] = useState<CV | null>(null);

  // --- Add/Edit Form State ---
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // --- Pagination/Filter State for MyCVs ---
  const [selectedProfileId] = useState<string>("All");
  const [selectedCreatedAt] = useState<string>("All");
  const [selectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userSeletjob, setuserSeletjob] = useState<Job | null>(null);

  // --- Template Selection State ---
  // This state will hold the selected templateId from TemplatesSelector
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const CVS_PER_PAGE = 10;

  // --- Job Search State ---
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
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
    setError(null);
    setLoading(true);
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
      setisCVloaded(true)
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

  function generate24CharString(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 24; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.get("view")) {
      params.set("view", "Overview");
      const newUrl = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { view, sub } = getViewFromSearch(window.location.search);
    setSelectedView(view);
    setSelectedSub(sub);
  }, [typeof window !== "undefined" ? window.location.search : ""]);

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

  async function fetchAllJobs(userId?: string) {
    setLoading(true);
    setError("");
    try {
      if (!userId) {
        setError("No user ID found. Please log in again.");
        setAllJobs([]);
        setLoading(false);
        return;
      }
      const response = await fetch("/dashboard/api/fetchjobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      if (!response.ok) {
        setjobloading([false, "api error"]);
        throw new Error(`API error: ${response.status}`);
      }

      const jobs: Job[] = (Array.isArray(data) ? data : []).map(normalizeJob);

      if (Array.isArray(data) && (data as any).error === "No CVs found for user") {
        setjobloading([false, "no cvs"]);
      } else if (jobs.length === 0) {
        setjobloading([false, "No CV found. Please create a new CV to see job recommendations."]);
      } else {
        setjobloading([false, "api error"]);
      }

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
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserCVs(session.user.id);
      fetchAllJobs(session.user.id);
    }
  }, [session?.user?.id]);

  // --- Main Path Components Map ---
  type MainContentProps = {
    onNavigate: (path: string, sub?: string) => void;
    sub?: string;
  };

  function HandleUserjob(job: Job) {
    setuserSeletjob(job);
  }

  // Handler for when a template is selected in TemplatesSelector
  function handleTemplateSelect(templateId: string) {
    setSelectedTemplateId(templateId);
    // After selecting a template, navigate to /my-cvs and pass the templateId as a prop
    setSelectedView("/my-cvs");
    setSelectedSub(undefined);
  }

  const PATH_COMPONENTS: {
    [key: string]: React.ComponentType<MainContentProps>;
  } = {
    "/overview": (props: MainContentProps) => (
      <Dashboard
        allJobs={allJobs}
        cvs={cvs}
        onNavigate={props.onNavigate}
        jobloading={jobloading}
      />
    ),
    "/my-cvs": (props: MainContentProps) => (
      <MyCVs
        cvs={cvs}
        addCV={addCV}
        updateCV={updateCV}
        deleteCV={deleteCV}
        onNavigate={props.onNavigate}
        // Pass the selectedTemplateId as a prop (string or undefined)
        selectedTemplateId={selectedTemplateId || undefined}
      />
    ),
    "/templates": (props: MainContentProps) => (
      <TemplatesSelector onUseTemplate={handleTemplateSelect} />
    ),
    "/ai-assistant": (props: MainContentProps) => <AIResumeAssistant job={userSeletjob} cvs={cvs} />,
    "/job-search": (props: MainContentProps) => (
      <JobsPage
        allJobs={allJobs}
        savedJobs={savedJobs}
        setSavedJobs={setSavedJobs}
        setAllJobs={setAllJobs}
        allKeywords={allKeywords}
        onNavigate={props.onNavigate}
        jobMatchingRequestsLeft={10}
        cvs={cvs}
        userSelectjob={HandleUserjob}
      />
    ),
    "/settings": (props: MainContentProps) => <Settings />,
  };

  const renderContent = () => {
    const Comp = PATH_COMPONENTS[selectedView] || PATH_COMPONENTS["/overview"];
    return (
      <Comp
        onNavigate={handleNavigate}
        sub={selectedSub}
      />
    );
  };

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
