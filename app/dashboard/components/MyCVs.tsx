"use client";

/**
 * MyCVs Component (API-integrated, improved loading, CRUD, and UX)
 * ---------------------------------------------------------------
 * - Uses new /dashboard/api/usersCV route for all CRUD operations (GET, POST, PUT, DELETE)
 * - Shows spinner while loading data from MongoDB
 * - Shows clear messages for empty, error, and loading states
 * - All add/edit/delete actions use API and update UI accordingly
 * - Well-commented and logically sorted for clarity and maintainability
 * - Improved error handling for API issues
 * - Improved Download: Uses print CSS for automatic pagination, page numbers in footer, and includes template styles for proper rendering.
 * - Simplified PDF generation without manual measurement for better reliability.
 */

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  FileText,
  Moon,
  Sun,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { CV } from "../data/data";
import { CVData, CVForm } from "@dashboard/components/CV/cv-form";
import { TemplateSelector } from "./CV/template-selector";
import PreviewEditor from "./CV/preview-editor";
const TemplateRenderer = dynamic(() => import("@dashboard/components/TemplateRenderer"), { ssr: false });
import { TemplateMeta } from "@/types/template-types";
import { htmltemplates } from "@/data/TempleteIndex";
import { useSession } from "next-auth/react";
// --- Types ---
type CVStatus = "draft" | "published";

// --- Constants ---
const CVS_PER_PAGE = 9;

// --- Helper Functions ---

function getUnique<T>(arr: T[], key: keyof T): string[] {
  return Array.from(new Set(arr.map((item) => String(item[key]))));
}

function formatDate(dateString: string): string {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// --- Page size mapping for layout ---
const PAGE_SIZES: Record<"A4" | "Letter" | "Legal", { width: string; height: string }> = {
  A4: { width: "210mm", height: "297mm" },
  Letter: { width: "8.5in", height: "11in" },
  Legal: { width: "8.5in", height: "14in" },
};

type MyCVsProps = {
  cvs: CV[];
  onNavigate?: (path: string, sub?: string) => void;
  updateCV: (newData: CVData, publish: boolean, Template: string, EditCVID: string | number) => void;
  addCV: (newData: CVData, publish: boolean, Template: string) => void;
  deleteCV: (id: string | number, title: string) => void;
  selectedTemplateId?: string;
};

export default function MyCVs({
  cvs,
  updateCV,
  addCV,
  deleteCV,
  onNavigate,
  selectedTemplateId,
}: MyCVsProps) {
  const { data: session } = useSession();
  // --- Theme and Routing ---
  const { theme = "light", setTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  // --- Refs ---
  const mainRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const hiddenPaginateRef = useRef<HTMLDivElement>(null);

  // --- State: CVs and Form Data ---
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    hobbies: [],
  });
  // --- State: UI/UX Controls ---
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCV, setPreviewCV] = useState<CV | null>(null);
  const [editCV, setEditCV] = useState<CV | null>(null);
  const [downloadCV, setDownloadCV] = useState<CV | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadLayout, setDownloadLayout] = useState<"A4" | "Letter" | "Legal">("A4");
  const [downloadFormat, setDownloadFormat] = useState<"PDF">("PDF");

  // --- State: Pagination and Filters ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedCreatedAt, setSelectedCreatedAt] = useState<string>("All");

  // --- State: Template Selection ---
  const [selectedTemplate, setSelectedTemplate] = useState<string>(selectedTemplateId || "");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMeta | undefined>(undefined);

  // --- Loading/Error State ---
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Memoized Data ---
  const allTemplates: TemplateMeta[] = useMemo(
    () => htmltemplates.filter((t) => t.styles),
    []
  );
  const selectedCVTemplate = useMemo(
    () => htmltemplates.find((t) => t.templateId === selectedTemplate),
    [selectedTemplate]
  );
  const profileOptions = useMemo(() => getUnique(cvs, "profileId"), [cvs]);
  const uniqueDates = useMemo(() => {
    const dates = cvs.map((cv) => cv.createdAt);
    const unique = Array.from(new Set(dates));
    return unique.sort(
      (a, b) =>
        new Date(b || "").getTime() - new Date(a || "").getTime()
    );
  }, [cvs]);

  // --- Derived Data ---
  const totalCVs = cvs.length;
  const draftCount = cvs.filter((cv) => cv.status === "inactive").length;
  const publishedCount = cvs.filter((cv) => cv.status === "active").length;

  // --- Filtering and Pagination ---
  const filteredCVs = useMemo(() => {
    return cvs.filter((cv) => {
      const profileMatch =
        selectedProfileId === "All" || cv.profileId === selectedProfileId;
      const createdAtMatch =
        selectedCreatedAt === "All" || cv.createdAt === selectedCreatedAt;
      const statusMatch =
        selectedStatus === "All" ||
        (selectedStatus === "published"
          ? cv.status === "active"
          : selectedStatus === "draft"
            ? cv.status === "inactive"
            : false);
      return profileMatch && createdAtMatch && statusMatch;
    });
  }, [cvs, selectedProfileId, selectedCreatedAt, selectedStatus]);

  const totalPages = Math.ceil(filteredCVs.length / CVS_PER_PAGE);
  const paginatedCVs = useMemo(
    () =>
      filteredCVs.slice(
        (currentPage - 1) * CVS_PER_PAGE,
        currentPage * CVS_PER_PAGE
      ),
    [filteredCVs, currentPage]
  );

  // --- Effects ---

  // Sync page state with URL query parameter
  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    if (!isNaN(pageParam)) setCurrentPage(pageParam);
  }, [searchParams]);

  // If selectedTemplateId prop changes, update state
  useEffect(() => {
    if (selectedTemplateId) {
      setSelectedTemplate(selectedTemplateId);
    }
  }, [selectedTemplateId]);

  // --- API Error Handling Wrappers ---
  function safeApiCall<T extends (...args: any[]) => any>(
    fn: T,
    errorMsg: string
  ) {
    return async (...args: Parameters<T>) => {
      setLoading(true);
      setError(null);
      try {
        await fn(...args);
      } catch (err: any) {
        setError(errorMsg + (err?.message ? `: ${err.message}` : ""));
        toast.error(errorMsg + (err?.message ? `: ${err.message}` : ""));
      } finally {
        setLoading(false);
      }
    };
  }

  // --- Save CV (Add/Edit) with error handling ---
  const saveCVFromForm = safeApiCall(
    (newCVData: CVData, publish: boolean, Template: string) => {
      if (editCV) {
        return updateCV(newCVData, publish, Template, editCV.id);
      } else {
        return addCV(newCVData, publish, Template);
      }
    },
    "Failed to save CV"
  );

  // --- Render Step Content for Add/Edit Modal ---
  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return (
          <CVForm
            cvData={cvData}
            setCvData={setCvData}
            onNext={nextStep}
            scrollRef={mainRef}
            show={() => setShowAddForm(false)}
            onSave={(data) => {
              setCvData(data);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            cvData={cvData}
            onNext={nextStep}
            onPrev={prevStep}
            scrollRef={mainRef}
          />
        );
      case 3:
        return (
          <div className="max-w-full mx-auto space-y-8">
            {/* Top Bar with Actions */}
            <div className="sticky top-0 left-0 z-40 w-full bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 py-3 shadow-md rounded-b-xl transition-all duration-300 gap-3">
              <div className="flex gap-3 items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
                >
                  {theme === "dark" ? (
                    <Sun className="w-6 h-6" />
                  ) : (
                    <Moon className="w-6 h-6" />
                  )}
                </Button>
                <Button
                  onClick={prevStep}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
                  disabled={loading}
                >
                  <ArrowLeft className="w-5 h-5" /> Previous Tab
                </Button>
                {/* Draft/Publish/Download actions moved into PreviewEditor */}
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowAddForm(false)}
                className="ml-auto text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-5 py-2.5 rounded-lg transition"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
            <div>
              {/* CV Preview Section */}
              <PreviewEditor
                UserCV={cvData}
                userTemplate={selectedTemplate}
                onCVChange={setCvData}
                onSaveDraft={(cv, templateId) => saveCVFromForm(cv, false, templateId)}
                onPublish={(cv, templateId) => saveCVFromForm(cv, true, templateId)}
                loading={loading}
              />
            </div>
            {loading && (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                <span className="ml-3 text-blue-500 font-semibold">Saving...</span>
              </div>
            )}
            {error && (
              <div className="flex justify-center items-center py-4">
                <span className="text-red-500 font-semibold">{error}</span>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  }

  // --- Filter Handlers ---
  function handleProfileChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedProfileId(e.target.value);
    setCurrentPage(1);
  }
  function handleCreatedAtChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCreatedAt(e.target.value);
    setCurrentPage(1);
  }
  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  }
  function resetFilters() {
    setSelectedProfileId("All");
    setSelectedCreatedAt("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  }

  // --- Step Navigation ---
  const steps = [
    { id: 1, title: "Personal Information", description: "Enter your details" },
    { id: 2, title: "Choose Template", description: "Select your style" },
    { id: 3, title: "Preview & Save", description: "Finalize your CV" },
  ];
  function nextStep() {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
    mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      requestAnimationFrame(() => {
        mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  // --- Theme Toggle ---
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // --- CV Actions ---

  /**
   * Go to a specific page in pagination.
   */
  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("view", "my-cvs");
    router.push(`/dashboard?${params.toString()}`);
    setCurrentPage(page);
  }

  // --- Download/Export logic with print CSS for pagination and page numbers ---

  // Download the HTML as PDF using the export-pdf API route
  async function generateAndDownloadPDF(layout: "A4" | "Letter" | "Legal") {
    if (!downloadCV) return;
    setError(null);
    setDownloadingId(downloadCV.id);

    try {
      // 1. Render the CV HTML in a hidden div
      await new Promise((r) => setTimeout(r, 100));

      const container = hiddenPaginateRef.current;
      if (!container) throw new Error("Renderer not ready");

      const contentHtml = container.innerHTML;

      const template = allTemplates.find(
        (t) => t.templateId === downloadCV.templateId
      );
      const pageSize = PAGE_SIZES[layout];

      const css = `
        @page {
          size: ${pageSize.width} ${pageSize.height};
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 8pt;
            color: #777;
          }
        }
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        .pdf-section {
          page-break-inside: avoid;
          break-inside: avoid;
        }
      `;

      const docHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <style>
              ${css}
              ${template?.styles || ""}
            </style>
          </head>
          <body>
            ${contentHtml}
          </body>
        </html>
      `;

      // 2. Send request to server
      const response = await fetch("/dashboard/api/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: docHtml }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate PDF");
      }

      const blob = await response.blob();
      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      // 5. Also allow opening in new tab (debugging / fallback)
      // Also trigger download in browser
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${session?.user?.name || "cv"}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success("PDF ready!");
    } catch (err: any) {
      setError(err?.message || "Failed to download PDF");
      toast.error(err?.message || "Failed to download PDF");
    } finally {
      setDownloadingId(null);
      setShowDownloadModal(false);
      setTimeout(() => setDownloadCV(null), 0);
    }
  }

  // --- Download/Export logic: called from Download modal ---
  async function exportSelectedCV() {
    await generateAndDownloadPDF(downloadLayout);
  }

  /**
   * Show preview modal for a CV.
   */
  function handlePreviewCV(cv: CV) {
    // Find the template for this CV
    const userTemplateObj = allTemplates.find(
      (tpl) => tpl.templateId === cv.templateId
    );
    setPreviewTemplate(userTemplateObj);
    setPreviewCV(cv);
    setShowPreview(true);
  }

  /**
   * Start editing a CV.
   */
  function handleEditCV(cv: CV) {
    setEditCV(cv);
    setCvData(cv.content);
    setSelectedTemplate(cv.templateId || "");
    setShowAddForm(true);
    setCurrentStep(1);
  }

  // --- Delete a CV by id, with confirmation and page adjustment. ---
  const handleDeleteCV = safeApiCall(
    (id: number | string, title: string) => {
      if (
        typeof window !== "undefined" &&
        window.confirm(`Are you sure you want to delete "${title}"?`)
      ) {
        return deleteCV(id, title);
      }
    },
    "Failed to delete CV"
  );

  // --- Render ---
  return (
    <div className="max-w-7xl py-8 px-6 sm:px-8 min-h-screen">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#1a73e8] dark:text-[#60a5fa]" />
          <h1 className="text-4xl font-extrabold text-[#22223b] dark:text-white tracking-tight">
            My CVs
          </h1>
        </div>
        <Button
          onClick={() => {
            setShowAddForm((v) => !v);
            setEditCV(null);
            setCvData({
              personalInfo: {
                fullName: "",
                jobTitle: "",
                email: "",
                phone: "",
              },
              education: [],
              experience: [],
              skills: [],
              certifications: [],
              hobbies: [],
            });
            setSelectedTemplate(selectedTemplateId || "");
            setCurrentStep(1);
          }}
          className={`flex items-center gap-2 justify-center font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 ${showAddForm
            ? "bg-gray-400 hover:bg-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800 text-white"
            : "bg-[#1a73e8] hover:bg-[#1760c4] dark:bg-[#2563eb] dark:hover:bg-[#1e40af] text-white"
            }`}
          variant="secondary"
          disabled={loading}
        >
          <Plus className="w-5 h-5" /> Add CV
        </Button>
      </div>

      {/* Statistics */}
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        {/* Total CVs */}
        <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 border-l-4 border-[#3b82f6]">
          <div className="rounded-xl p-3 flex items-center justify-center bg-[#e0edfd] dark:bg-transparent">
            <FileText className="h-5 w-5 text-[#3b82f6] dark:text-[#60a5fa]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#3b82f6] dark:text-[#60a5fa]">
              Total CVs
            </div>
            <div className="text-3xl font-extrabold text-[#22223b] dark:text-white leading-tight">
              {totalCVs}
            </div>
          </div>
        </div>
        {/* Drafts */}
        <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 border-l-4 border-[#f59e42]">
          <div className="rounded-xl p-3 flex items-center justify-center bg-[#fff7e6] dark:bg-transparent">
            <Edit className="h-5 w-5 text-[#f59e42] dark:text-[#fbbf24]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#f59e42] dark:text-[#fbbf24]">
              Drafts
            </div>
            <div className="text-3xl font-extrabold text-[#22223b] dark:text-white leading-tight">
              {draftCount}
            </div>
          </div>
        </div>
        {/* Published */}
        <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 border-l-4 border-[#10b981]">
          <div className="rounded-xl p-3 flex items-center justify-center bg-[#e6f9f3] dark:bg-transparent">
            <FileText className="h-5 w-5 text-[#10b981] dark:text-[#34d399]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#10b981] dark:text-[#34d399]">
              Published
            </div>
            <div className="text-3xl font-extrabold text-[#22223b] dark:text-white leading-tight">
              {publishedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="mb-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-7 border-0">
        <form className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Profile Filter */}
          <div className="flex flex-col min-w-[160px] w-full">
            <label
              htmlFor="filterProfile"
              className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] mb-1"
            >
              Profile
            </label>
            <select
              id="filterProfile"
              value={selectedProfileId}
              onChange={handleProfileChange}
              className="rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm transition"
              disabled={loading}
            >
              <option value="All">All Profiles</option>
              {profileOptions.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </div>
          {/* Created At Filter */}
          <div className="flex flex-col min-w-[180px] w-full">
            <label
              htmlFor="filterCreatedAt"
              className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] mb-1"
            >
              Created At
            </label>
            <select
              id="filterCreatedAt"
              value={selectedCreatedAt}
              onChange={handleCreatedAtChange}
              className="rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm transition"
              disabled={loading}
            >
              <option value="All">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {formatDate(date || "")}
                </option>
              ))}
            </select>
          </div>
          {/* Status Filter */}
          <div className="flex flex-col min-w-[120px] w-full">
            <label
              htmlFor="filterStatus"
              className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] mb-1"
            >
              Status
            </label>
            <select
              id="filterStatus"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm transition"
              disabled={loading}
            >
              <option value="All">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          {/* Reset Button */}
          <div className="flex flex-col min-w-[100px] w-full">
            <label className="text-xs font-semibold text-transparent mb-1">
              &nbsp;
            </label>
            <button
              type="button"
              onClick={resetFilters}
              title="Reset Filters"
              aria-label="Reset Filters"
              className="flex items-center gap-1 px-3 py-2 rounded-md border border-[#e0e7ef] dark:border-[#23262f] text-[#1a73e8] dark:text-[#60a5fa] bg-[#f7f7fa] dark:bg-[#23262f] hover:bg-[#e3f0fc] dark:hover:bg-[#1e293b] font-semibold text-sm transition"
              disabled={loading}
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </form>
      </section>

      {/* Add/Edit CV Modal */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setShowAddForm(false);
            setEditCV(null);
            setCurrentStep(1);
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl h-full shadow-2xl w-full overflow-hidden max-w-screen no-scrollbar relative max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            {renderStepContent()}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && previewCV && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 my-5 rounded-2xl shadow-2xl p-8 w-full max-w-[794px] no-scrollbar relative overflow-y-auto max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Preview: {previewCV.title}
              </h2>
              <Button variant="ghost" onClick={() => setShowPreview(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <TemplateRenderer
              cvData={previewCV.content}
              template={previewTemplate}
            />
          </div>
        </div>
      )}

      {/* Download Options Modal */}
      {showDownloadModal && downloadCV && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowDownloadModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md no-scrollbar relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Download Options</h3>
              <button
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowDownloadModal(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Format</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="format"
                      value="PDF"
                      checked={downloadFormat === "PDF"}
                      onChange={() => setDownloadFormat("PDF")}
                    />
                    PDF
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Layout</label>
                <select
                  value={downloadLayout}
                  onChange={(e) => setDownloadLayout(e.target.value as any)}
                  className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="Letter">Letter (8.5 × 11 in)</option>
                  <option value="Legal">Legal (8.5 × 14 in)</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border text-sm"
                onClick={() => setShowDownloadModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-[#1a73e8] text-white text-sm disabled:opacity-60"
                onClick={exportSelectedCV}
                disabled={!!downloadingId}
              >
                {downloadingId ? "Generating..." : "Download"}
              </button>
            </div>
            {error && (
              <div className="mt-4 text-center text-red-500 text-sm font-semibold">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden renderer for PDF export (ref logic) */}
      <div className="fixed -left-[9999px] -top-[9999px] w-[210mm] h-auto bg-white" aria-hidden="true">
        <div ref={downloadRef} className="bg-white">
          {downloadCV && (
            <div id="cv-preview">
              <TemplateRenderer
                cvData={downloadCV.content}
                template={allTemplates.find((t) => t.templateId === downloadCV.templateId)}
              />
            </div>
          )}
        </div>
      </div>
      {/* Hidden renderer for getting content HTML */}
      <div
        ref={hiddenPaginateRef}
        style={{
          // position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "210mm",
          height: "auto",
          background: "#fff",
          zIndex: 666666,
          pointerEvents: "none",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        {downloadCV && (
          <TemplateRenderer
            cvData={downloadCV.content}
            template={allTemplates.find((t) => t.templateId === downloadCV.templateId)}
          />
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
          <span className="ml-4 text-blue-500 font-semibold text-lg">Loading CVs...</span>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="flex justify-center items-center py-8">
          <span className="text-red-500 font-semibold text-lg">{error}</span>
        </div>
      )}

      {/* CVs List */}
      {!loading && !error && (
        <section className="mb-12">
          {filteredCVs.length === 0 ? (
            cvs.length === 0 ? (
              // No CVs at all
              <div className="text-center text-[#8a8fa3] dark:text-[#a3aed6] py-16 text-lg font-medium select-none">
                No CVs found. Add a new one to get started.
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setEditCV(null);
                    setCvData({
                      personalInfo: {
                        fullName: "",
                        jobTitle: "",
                        email: "",
                        phone: "",
                      },
                      education: [],
                      experience: [],
                      skills: [],
                      certifications: [],
                      hobbies: [],
                    });
                    setSelectedTemplate(selectedTemplateId || "");
                    setCurrentStep(1);
                  }}
                  className="mt-4 block mx-auto text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
                >
                  Add New CV
                </button>
              </div>
            ) : (
              // No CVs for current filters
              <div className="text-center text-[#8a8fa3] dark:text-[#a3aed6] py-16 text-lg font-medium select-none">
                No CVs found for the selected filters.
                <button
                  onClick={resetFilters}
                  className="mt-4 block mx-auto text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )
          ) : (
            // CVs Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginatedCVs.map((cv) => (
                <article
                  key={cv.id}
                  className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col border-0 hover:shadow-xl transition-all duration-200 ${cv.status === "inactive"
                    ? "border-l-4 border-[#f59e42] dark:border-[#fbbf24]"
                    : "border-l-4 border-[#10b981] dark:border-[#34d399]"
                    }`}
                >
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Title and Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-xl text-[#22223b] dark:text-white line-clamp-1">
                        {cv.title}
                      </h4>
                      <div className="rounded-xl p-2 flex items-center justify-center bg-[#e0edfd] dark:bg-transparent">
                        <FileText className="w-6 h-6 text-[#1a73e8] dark:text-[#60a5fa]" />
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-[#64748b] dark:text-[#a3aed6] text-sm mb-2 line-clamp-2">
                      {cv.description}
                    </div>
                    {/* Dates */}
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="text-xs text-[#64748b] dark:text-[#a3aed6] flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#94a3b8] dark:text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm0 2V3h8v1H6zm-1 2h10v10H5V6z"></path></svg>
                        <span>{formatDate(cv.createdAt || "")}</span>
                      </span>
                      <span className="text-xs text-[#94a3b8] dark:text-[#64748b] flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#94a3b8] dark:text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M12 8v4l3 1m5-5a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{formatDate(cv.updatedAt)}</span>
                      </span>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2 border-t border-[#e0e7ef] dark:border-[#23262f] pt-3">
                      <button
                        type="button"
                        onClick={() => handlePreviewCV(cv)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#1a73e8] dark:text-[#60a5fa] hover:bg-[#e3f0fc] dark:hover:bg-[#1e293b] text-xs font-semibold transition hover:scale-105 transform"
                        disabled={loading}
                      >
                        <Eye className="w-4 h-4" /> Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditCV(cv)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#10b981] dark:text-[#34d399] hover:bg-[#e6fbe6] dark:hover:bg-[#1e3a1e] text-xs font-semibold transition hover:scale-105 transform"
                        disabled={loading}
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCV(cv.id, cv.title)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#ea4335] dark:text-[#f87171] hover:bg-[#fdeaea] dark:hover:bg-[#3f1e1e] text-xs font-semibold transition hover:scale-105 transform"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDownloadLayout("A4");
                          setDownloadFormat("PDF");
                          setDownloadCV(cv);
                          setShowDownloadModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#f59e42] dark:text-[#fbbf24] hover:bg-[#fff7e6] dark:hover:bg-[#3f2e1e] text-xs font-semibold transition hover:scale-105 transform"
                        disabled={loading}
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Pagination */}
      {!loading && !error && filteredCVs.length > 0 && totalPages > 1 && (
        <section className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1f2937] shadow-md rounded-xl px-4 py-2">
            <button
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50 transition"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              aria-label="Previous page"
            >
              <ChevronLeft className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            </button>
            <span className="px-4 py-1 text-blue-800 dark:text-blue-300 font-semibold text-sm border rounded-md bg-blue-50 dark:bg-[#2c3e50]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50 transition"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              aria-label="Next page"
            >
              <ChevronRight className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}