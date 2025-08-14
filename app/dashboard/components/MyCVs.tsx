"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
  Link,
} from "lucide-react";
import { FaBars } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { CV } from "../data/data";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CVData, CVForm } from "@dashboard/components/CV/cv-form";
import { TemplateSelector } from "./CV/template-selector";
import PreviewEditor from "./CV/preview-editor";
import { useTheme } from "next-themes";
import html2canvas from "html2canvas";
import TemplateRenderer from "@/components/TemplateRenderer";
import { TemplateMeta } from "@/types/template-types";
import { templates } from "@/data/TempleteIndex";

type CVStatus = "draft" | "published";

// Helper: get unique values from array of objects
function getUnique<T>(arr: T[], key: keyof T): string[] {
  return Array.from(new Set(arr.map((item) => String(item[key]))));
}

// Helper: Format date consistently
const formatDate = (dateString: string) => {
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
};

const CVS_PER_PAGE = 9;

export default function MyCVs() {
  const { theme, setTheme } = useTheme();
  const templateRef = useRef<HTMLDivElement>(null);

  // Main CVs array state
  const [cvs, setCvs] = useState<CV[]>([]);

  // Form data for controlled form inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    profileId: "",
    createdAt: "",
    status: "draft" as CVStatus,
  });

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

  const [showAddForm, setShowAddForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCV, setPreviewCV] = useState<CV | null>(null);
  const [editCV, setEditCV] = useState<CV | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Pagination and filter states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedCreatedAt, setSelectedCreatedAt] = useState<string>("All");

  // Synchronize page state with URL query parameter
  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    if (!isNaN(pageParam)) setCurrentPage(pageParam);
  }, [searchParams]);

  // Get unique filter options
  const profileOptions = useMemo(() => getUnique(cvs, "profileId"), [cvs]);
  const uniqueDates = useMemo(() => {
    const dates = cvs.map((cv) => cv.createdAt);
    const unique = Array.from(new Set(dates));
    return unique.sort((a, b) => new Date(b || "").getTime() - new Date(a || "").getTime());
  }, [cvs]);

  // Counts
  const totalCVs = cvs.length;
  const draftCount = cvs.filter((cv) => cv.status === "draft").length;
  const publishedCount = cvs.filter((cv) => cv.status === "published").length;

  // Filtering based on selections
  const filteredCVs = cvs.filter((cv) => {
    const profileMatch = selectedProfileId === "All" || cv.profileId === selectedProfileId;
    const createdAtMatch = selectedCreatedAt === "All" || cv.createdAt === selectedCreatedAt;
    const statusMatch = selectedStatus === "All" || cv.status === selectedStatus;
    return profileMatch && createdAtMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredCVs.length / CVS_PER_PAGE);
  const paginatedCVs = filteredCVs.slice(
    (currentPage - 1) * CVS_PER_PAGE,
    currentPage * CVS_PER_PAGE
  );

  const resetFilters = () => {
    setSelectedProfileId("All");
    setSelectedCreatedAt("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  // Handlers for filters
  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfileId(e.target.value);
    setCurrentPage(1);
  };
  const handleCreatedAtChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCreatedAt(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Get all templates with styles
  const allTemplates: TemplateMeta[] = useMemo(() => templates.filter((t) => t.styles), [templates]);


  // Find the template object that matches the selectedTemplate id
  const selectedCVTemplate = templates.find(t => t.templateId === selectedTemplate);
  // Save CV (add or update)
  const saveCVFromForm = (newCVData: CVData, publish: boolean = false) => {
    if (editCV) {
      // Update existing CV
      setCvs((prev) =>
        prev.map((cv) =>
          cv.id === editCV.id
            ? {
              ...cv,
              content: newCVData,
              title: newCVData.personalInfo.jobTitle || "Untitled CV",
              description: `CV for ${newCVData.personalInfo.fullName || "Unknown"}`,
              updatedAt: new Date().toISOString(),
              templateId: selectedTemplate,
              status: publish ? "published" : cv.status,
            }
            : cv
        )
      );
      toast.success(`CV "${newCVData.personalInfo.jobTitle || "Untitled CV"}" updated!`);
      setEditCV(null);
      setShowAddForm(false);
      setCurrentStep(1);
    } else {
      // Add new CV
      const newCV: CV = {
        id: Date.now(),
        userId: undefined,
        profileId: newCVData.personalInfo.fullName || "Unknown",
        role: "",
        templateId: selectedTemplate,
        title: newCVData.personalInfo.jobTitle || "Untitled CV",
        description: `CV for ${newCVData.personalInfo.fullName || "Unknown"}`,
        content: newCVData,
        status: publish ? "published" : "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastUsedAt: undefined,
      };
      setCvs((prev) => [...prev, newCV]);
      toast.success(`CV "${newCV.title}" saved${publish ? " & published" : ""}!`);
      setShowAddForm(false);
      setCurrentStep(1);
    }
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
    mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      requestAnimationFrame(() => {
        mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const steps = [
    { id: 1, title: "Personal Information", description: "Enter your details" },
    { id: 2, title: "Choose Template", description: "Select your style" },
    { id: 3, title: "Preview & Save", description: "Finalize your CV" },
  ];
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const exportAsImage = async () => {
    if (!templateRef.current) return;

    const canvas = await html2canvas(templateRef.current, {
      scale: 2,
      backgroundColor: "#fff",
    });

    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "cv.png";
    link.click();
  };

  // Render step content for add/edit CV
  const renderStepContent = () => {
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
            {/* Top Bar with Important Actions */}
            <div className="sticky top-0 left-0 z-40 w-full bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 py-3 shadow-md rounded-b-xl transition-all duration-300 gap-3">
              <div className="flex gap-3 items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition"
                >
                  {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </Button>
                <Button
                  onClick={() => {
                    saveCVFromForm(cvData, false);
                  }}
                  className="flex items-center gap-2 bg-[#1a73e8] hover:bg-[#1760c4] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
                >
                  <CheckCircle2 className="w-5 h-5" /> Save as Draft
                </Button>
                <Button
                  onClick={() => {
                    saveCVFromForm(cvData, true);
                  }}
                  className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
                >
                  <FileText className="w-5 h-5" /> Publish
                </Button>
                <Button
                  // onClick={exportAsImage}
                  className="flex items-center gap-2 bg-[#f59e42] hover:bg-[#ea580c] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200"
                >
                  <Download className="w-5 h-5" /> Download
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowAddForm(false)}
                className="ml-auto text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-5 py-2.5 rounded-lg transition"
              >
                Cancel
              </Button>
            </div>
            <div ref={templateRef}>
              {/* Preview Section */}
              <PreviewEditor
                UserCV={cvData}
                userTemplate={selectedTemplate}
                onCVChange={setCvData}
              // onTemplateChange={}
              // showOnlyPreview
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Delete CV by id
  const handleDeleteCV = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
      toast.success(`CV "${title}" deleted!`);
      // Adjust page if needed
      setTimeout(() => {
        const newFiltered = cvs
          .filter((cv) => cv.id !== id)
          .filter((cv) => {
            const profileMatch = selectedProfileId === "All" || cv.profileId === selectedProfileId;
            const createdAtMatch = selectedCreatedAt === "All" || cv.createdAt === selectedCreatedAt;
            const statusMatch = selectedStatus === "All" || cv.status === selectedStatus;
            return profileMatch && createdAtMatch && statusMatch;
          });

        const newTotalPages = Math.ceil(newFiltered.length / CVS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      }, 0);
    }
  };

  // Pagination navigation
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("view", "my-cvs");

    router.push(`/dashboard?${params.toString()}`);
    setCurrentPage(page);
  };

  // Handle preview
  const handlePreviewCV = (cv: CV) => {
    setPreviewCV(cv);
    setShowPreview(true);
  };

  // Handle edit
  const handleEditCV = (cv: CV) => {
    setEditCV(cv);
    // setCvData(cv.content);
    setSelectedTemplate(cv.templateId || "");
    setShowAddForm(true);
    setCurrentStep(1);
  };

  // --- UI/UX Template Style (like dashboard.tsx) ---
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
            setSelectedTemplate("");
            setCurrentStep(1);
          }}
          className={`flex items-center gap-2 justify-center font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 ${showAddForm
            ? "bg-gray-400 hover:bg-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800 text-white"
            : "bg-[#1a73e8] hover:bg-[#1760c4] dark:bg-[#2563eb] dark:hover:bg-[#1e40af] text-white"
            }`}
          variant="secondary"
        >
          <Plus className="w-5 h-5" /> Add CV
        </Button>
      </div>

      {/* Statistics */}
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 border-l-4 border-[#3b82f6]">
          <div className="rounded-xl p-3 flex items-center justify-center bg-[#e0edfd] dark:bg-transparent">
            <FileText className="h-5 w-5 text-[#3b82f6] dark:text-[#60a5fa]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#3b82f6] dark:text-[#60a5fa]">Total CVs</div>
            <div className="text-3xl font-extrabold text-[#22223b] dark:text-white leading-tight">
              {totalCVs}
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 border-l-4 border-[#f59e42]">
          <div className="rounded-xl p-3 flex items-center justify-center bg-[#fff7e6] dark:bg-transparent">
            <Edit className="h-5 w-5 text-[#f59e42] dark:text-[#fbbf24]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#f59e42] dark:text-[#fbbf24]">Drafts</div>
            <div className="text-3xl font-extrabold text-[#22223b] dark:text-white leading-tight">
              {draftCount}
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 border-l-4 border-[#10b981]">
          <div className="rounded-xl p-3 flex items-center justify-center bg-[#e6f9f3] dark:bg-transparent">
            <FileText className="h-5 w-5 text-[#10b981] dark:text-[#34d399]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#10b981] dark:text-[#34d399]">Published</div>
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
            >
              <option value="All" >All Profiles</option>
              {profileOptions.map((profile) => (
                <option key={profile} value={profile} >
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
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </form>
      </section>

      {/* Add/Edit CV Form */}
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
            className="bg-white dark:bg-gray-900 my-5 rounded-2xl shadow-2xl p-8 w-full max-w-2xl no-scrollbar relative overflow-y-auto max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Preview: {previewCV.title}</h2>
              <Button variant="ghost" onClick={() => setShowPreview(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <TemplateRenderer
              cvData={cvData}
              template={selectedCVTemplate}
            />
          </div>
        </div>
      )}

      {/* CVs List */}
      <section className="mb-12">
        {filteredCVs.length === 0 ? (
          cvs.length === 0 ? (
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
                  setSelectedTemplate("");
                  setCurrentStep(1);
                }}
                className="mt-4 block mx-auto text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
              >
                Add New CV
              </button>
            </div>
          ) : (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {paginatedCVs.map((cv) => (
              <article
                key={cv.id}
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col border-0 hover:shadow-xl transition-all duration-200 ${cv.status === "draft"
                  ? "border-l-4 border-[#f59e42] dark:border-[#fbbf24]"
                  : "border-l-4 border-[#10b981] dark:border-[#34d399]"
                  }`}
              >
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-xl text-[#22223b] dark:text-white line-clamp-1">
                      {cv.title}
                    </h4>
                    <div className="rounded-xl p-2 flex items-center justify-center bg-[#e0edfd] dark:bg-transparent">
                      <FileText className="w-6 h-6 text-[#1a73e8] dark:text-[#60a5fa]" />
                    </div>
                  </div>
                  <div className="text-[#64748b] dark:text-[#a3aed6] text-sm mb-2 line-clamp-2">
                    {cv.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-3 py-1 bg-[#f1f5f9] dark:bg-transparent text-[#22223b] dark:text-[#a3aed6] rounded-lg font-semibold">
                      {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
                    </span>
                    <span className="text-xs text-[#94a3b8] dark:text-[#64748b]">
                      Profile: <span className="text-[#1a73e8] dark:text-[#60a5fa]">{cv.profileId}</span>
                    </span>
                    <span className="text-xs text-[#94a3b8] dark:text-[#64748b]">
                      Created: {formatDate(cv.createdAt || "")}
                    </span>
                    <span className="text-xs text-[#94a3b8] dark:text-[#64748b]">
                      Updated: {formatDate(cv.updatedAt)}
                    </span>
                  </div>
                  <div className="mt-auto flex gap-2 border-t border-[#e0e7ef] dark:border-[#23262f] pt-3">
                    <button
                      type="button"
                      onClick={() => handlePreviewCV(cv)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#1a73e8] dark:text-[#60a5fa] hover:bg-[#e3f0fc] dark:hover:bg-[#1e293b] text-xs font-semibold transition hover:scale-105 transform"
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditCV(cv)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#10b981] dark:text-[#34d399] hover:bg-[#e6fbe6] dark:hover:bg-[#1e3a1e] text-xs font-semibold transition hover:scale-105 transform"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCV(Number(cv.id), cv.title)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#ea4335] dark:text-[#f87171] hover:bg-[#fdeaea] dark:hover:bg-[#3f1e1e] text-xs font-semibold transition hover:scale-105 transform"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Download as JSON for demo
                        const blob = new Blob([JSON.stringify({ ...cv.content, template: cv.templateId }, null, 2)], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${cv.title || "cv"}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        toast.success("CV downloaded!");
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#f59e42] dark:text-[#fbbf24] hover:bg-[#fff7e6] dark:hover:bg-[#3f2e1e] text-xs font-semibold transition hover:scale-105 transform"
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

      {/* Pagination */}
      {filteredCVs.length > 0 && totalPages > 1 && (
        <section className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1f2937] shadow-md rounded-xl px-4 py-2">
            <button
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50 transition"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
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