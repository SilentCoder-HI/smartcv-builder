"use client";

import { useState } from "react";
import {
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  RotateCcw,
} from "lucide-react";

type CVStatus = "draft" | "published";
type CVType = "Academic" | "Industry" | "Clinical" | "Other";

interface CVProfile {
  id: number;
  name: string;
}

interface CV {
  id: number;
  title: string;
  updatedAt: string;
  description: string;
  profileId: number;
  status: CVStatus;
  type: CVType;
}

const sampleProfiles: CVProfile[] = [
  { id: 1, name: "Full Stack Developer" },
  { id: 2, name: "Frontend Developer" },
  { id: 3, name: "Backend Developer" },
  { id: 4, name: "Academic Researcher" },
  { id: 5, name: "Clinical Psychologist" },
];

const cvTypeOptions: CVType[] = [
  "Academic",
  "Industry",
  "Clinical",
  "Other",
];
const cvStatusOptions: CVStatus[] = ["published", "draft"];

const initialCVs: CV[] = [
  {
    id: 101,
    title: "CV for Tech Startup",
    updatedAt: "2024-05-15",
    description: "Built with a focus on frontend and scalable backend.",
    profileId: 1,
    status: "published",
    type: "Industry",
  },
  {
    id: 102,
    title: "Frontend CV for SaaS",
    updatedAt: "2024-04-20",
    description: "Expert in React and UI/UX for SaaS products.",
    profileId: 2,
    status: "draft",
    type: "Industry",
  },
  {
    id: 103,
    title: "Backend CV with Cloud",
    updatedAt: "2024-03-10",
    description: "Node.js, Docker, and AWS expertise.",
    profileId: 3,
    status: "published",
    type: "Industry",
  },
  {
    id: 104,
    title: "Academic CV - Research Scientist",
    updatedAt: "2024-06-01",
    description: "CRISPR, NGS, and grant writing experience.",
    profileId: 4,
    status: "published",
    type: "Academic",
  },
  {
    id: 105,
    title: "Clinical Psychologist CV",
    updatedAt: "2024-05-28",
    description: "CBT, trauma counseling, and clinical supervision.",
    profileId: 5,
    status: "draft",
    type: "Clinical",
  },
];

export default function MyCVs() {
  const [cvs, setCvs] = useState<CV[]>(initialCVs);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    profileId: "",
    type: "",
    status: "draft" as CVStatus,
  });

  // Calculate statistics
  const totalCVs = cvs.length;
  const draftCount = cvs.filter((cv) => cv.status === "draft").length;
  const publishedCount = cvs.filter((cv) => cv.status === "published").length;

  // Filter CVs based on selected filters
  const filteredCVs = cvs.filter((cv) => {
    const profileMatch =
      selectedProfileId === "All"
        ? true
        : cv.profileId === Number(selectedProfileId);
    const typeMatch =
      selectedType === "All" ? true : cv.type === selectedType;
    const statusMatch =
      selectedStatus === "All" ? true : cv.status === selectedStatus;
    return profileMatch && typeMatch && statusMatch;
  });

  const resetFilters = () => {
    setSelectedProfileId("All");
    setSelectedType("All");
    setSelectedStatus("All");
  };

  const handleAddCV = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.profileId ||
      !formData.type
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newCV: CV = {
      id: Date.now(),
      title: formData.title,
      updatedAt: new Date().toISOString().slice(0, 10),
      description: formData.description,
      profileId: Number(formData.profileId),
      type: formData.type as CVType,
      status: formData.status,
    };

    setCvs((prev) => [...prev, newCV]);
    setFormData({
      title: "",
      description: "",
      profileId: "",
      type: "",
      status: "draft",
    });
    setShowAddForm(false);
    alert("New CV added successfully!");
  };

  const handleDeleteCV = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
    }
  };

  const getProfileName = (profileId: number) => {
    return sampleProfiles.find((p) => p.id === profileId)?.name || "Unknown";
  };

  // --- R UI/UX style starts here ---
  return (
    <div className="min-h-screen flex flex-col transition-colors">
      <div className="max-w-7xl w-full py-8 px-2 sm:px-6 flex flex-col flex-grow">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#1a73e8] dark:text-[#60a5fa]" />
            <h1 className="text-3xl font-bold text-[#22223b] dark:text-white tracking-tight">
              My CVs
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm((v) => !v)}
            aria-expanded={showAddForm}
            aria-controls="addCVSection"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold shadow-sm transition text-white ${
              showAddForm
                ? "bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
                : "bg-[#1a73e8] hover:bg-[#1760c4] dark:bg-[#2563eb] dark:hover:bg-[#1e40af]"
            }`}
          >
            {showAddForm ? (
              <>
                <X className="w-5 h-5" /> Cancel
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" /> Add CV
              </>
            )}
          </button>
        </header>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white dark:bg-[#23262f] border border-[#e0e7ef] dark:border-[#23262f] p-4 flex items-center gap-4 shadow-sm">
            <div className="rounded-full bg-[#e3f0fc] dark:bg-[#1e293b] p-3">
              <FileText className="w-6 h-6 text-[#1a73e8] dark:text-[#60a5fa]" />
            </div>
            <div>
              <div className="text-xs text-[#1a73e8] dark:text-[#60a5fa] font-semibold uppercase">
                Total
              </div>
              <div className="text-2xl font-bold text-[#22223b] dark:text-white">
                {totalCVs}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white dark:bg-[#23262f] border border-[#e0e7ef] dark:border-[#23262f] p-4 flex items-center gap-4 shadow-sm">
            <div className="rounded-full bg-[#fffbe6] dark:bg-[#3b2f1e] p-3">
              <Edit className="w-6 h-6 text-[#fbbc04] dark:text-[#fde68a]" />
            </div>
            <div>
              <div className="text-xs text-[#fbbc04] dark:text-[#fde68a] font-semibold uppercase">
                Drafts
              </div>
              <div className="text-2xl font-bold text-[#22223b] dark:text-white">
                {draftCount}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white dark:bg-[#23262f] border border-[#e0e7ef] dark:border-[#23262f] p-4 flex items-center gap-4 shadow-sm">
            <div className="rounded-full bg-[#e6fbe6] dark:bg-[#1e3a1e] p-3">
              <FileText className="w-6 h-6 text-[#34a853] dark:text-[#4ade80]" />
            </div>
            <div>
              <div className="text-xs text-[#34a853] dark:text-[#4ade80] font-semibold uppercase">
                Published
              </div>
              <div className="text-2xl font-bold text-[#22223b] dark:text-white">
                {publishedCount}
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8 bg-white dark:bg-[#23262f] border border-[#e0e7ef] dark:border-[#23262f] rounded-lg shadow-sm p-4">
          <form className="flex flex-col md:flex-row gap-4 items-end">
            {/* Profile Filter */}
            <div className="flex flex-col min-w-[160px]">
              <label
                htmlFor="filterProfile"
                className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] mb-1"
              >
                Profile
              </label>
              <select
                id="filterProfile"
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value)}
                className="rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
              >
                <option value="All">All Profiles</option>
                {sampleProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Type Filter */}
            <div className="flex flex-col min-w-[120px]">
              <label
                htmlFor="filterType"
                className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] mb-1"
              >
                Type
              </label>
              <select
                id="filterType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
              >
                <option value="All">All Types</option>
                {cvTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {/* Status Filter */}
            <div className="flex flex-col min-w-[120px]">
              <label
                htmlFor="filterStatus"
                className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] mb-1"
              >
                Status
              </label>
              <select
                id="filterStatus"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            {/* Reset Button */}
            <div className="flex flex-col min-w-[100px]">
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

        {/* Add CV Form */}
        {showAddForm && (
          <section
            id="addCVSection"
            className="mb-8 bg-white dark:bg-[#23262f] border border-[#e0e7ef] dark:border-[#23262f] rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-[#1a73e8] dark:text-[#60a5fa] mb-4">
              Add a New CV
            </h2>
            <form
              onSubmit={handleAddCV}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label
                  htmlFor="newTitle"
                  className="block text-sm font-semibold text-[#22223b] dark:text-white mb-1"
                >
                  CV Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="newTitle"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  placeholder="Enter CV title"
                  autoComplete="off"
                  className="block w-full rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="newDescription"
                  className="block text-sm font-semibold text-[#22223b] dark:text-white mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="newDescription"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                  placeholder="Brief description"
                  autoComplete="off"
                  className="block w-full rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="newProfile"
                  className="block text-sm font-semibold text-[#22223b] dark:text-white mb-1"
                >
                  Choose Profile <span className="text-red-500">*</span>
                </label>
                <select
                  id="newProfile"
                  value={formData.profileId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profileId: e.target.value,
                    }))
                  }
                  required
                  className="block w-full rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
                >
                  <option value="">Select Profile</option>
                  {sampleProfiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="newType"
                  className="block text-sm font-semibold text-[#22223b] dark:text-white mb-1"
                >
                  CV Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="newType"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  required
                  className="block w-full rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
                >
                  <option value="">Select Type</option>
                  {cvTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="newStatus"
                  className="block text-sm font-semibold text-[#22223b] dark:text-white mb-1"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="newStatus"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as CVStatus,
                    }))
                  }
                  required
                  className="block w-full rounded-md border border-[#e0e7ef] dark:border-[#23262f] py-2 px-3 text-[#22223b] dark:text-white bg-white dark:bg-[#181a20] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] dark:focus:border-[#60a5fa] dark:focus:ring-[#60a5fa] text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex items-end justify-end md:col-span-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold shadow-sm bg-[#1a73e8] hover:bg-[#1760c4] dark:bg-[#2563eb] dark:hover:bg-[#1e40af] text-white transition"
                >
                  <Plus className="w-5 h-5" /> Add CV
                </button>
              </div>
            </form>
          </section>
        )}

        {/* CVs List */}
        <section className="flex-grow">
          {filteredCVs.length === 0 ? (
            <div className="text-center text-[#8a8fa3] dark:text-[#a3aed6] py-16 text-lg font-medium select-none">
              No CVs found for the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredCVs.map((cv) => (
                <article
                  key={cv.id}
                  className={`relative border rounded-xl p-6 shadow-sm bg-white dark:bg-[#23262f] flex flex-col gap-3 transition hover:shadow-md ${
                    cv.status === "draft"
                      ? "border-[#ffe082] dark:border-[#b59f3b]"
                      : "border-[#b7e4c7] dark:border-[#4ade80]"
                  }`}
                >
                  {/* Status Ribbon */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide select-none shadow ${
                      cv.status === "draft"
                        ? "bg-[#fffbe6] text-[#b59f3b] border border-[#ffe082] dark:bg-[#3b2f1e] dark:text-[#fde68a] dark:border-[#b59f3b]"
                        : "bg-[#e6fbe6] text-[#34a853] border border-[#b7e4c7] dark:bg-[#1e3a1e] dark:text-[#4ade80] dark:border-[#4ade80]"
                    }`}
                  >
                    {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
                  </div>
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#22223b] dark:text-white mb-1">
                        {cv.title}
                      </h3>
                      <div className="text-xs text-[#8a8fa3] dark:text-[#a3aed6] mb-0.5">
                        Profile: {getProfileName(cv.profileId)}
                      </div>
                      <div className="text-xs text-[#8a8fa3] dark:text-[#a3aed6] mb-0.5">
                        Type: {cv.type}
                      </div>
                      <div className="text-xs text-[#bfc3d1] dark:text-[#64748b] italic">
                        Updated: {cv.updatedAt}
                      </div>
                    </div>
                    <div className="text-[#e0e7ef] dark:text-[#23262f]">
                      <FileText className="w-8 h-8" />
                    </div>
                  </div>
                  {/* Description */}
                  <div className="text-[#444] dark:text-[#e5e7eb] text-sm mb-2 line-clamp-3">
                    {cv.description}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 border-t border-[#e0e7ef] dark:border-[#23262f] pt-3 mt-auto">
                    <button
                      type="button"
                      onClick={() => alert(`Previewing: ${cv.title}`)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#1a73e8] dark:text-[#60a5fa] hover:bg-[#e3f0fc] dark:hover:bg-[#1e293b] text-xs font-semibold transition"
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Editing: ${cv.title}`)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#34a853] dark:text-[#4ade80] hover:bg-[#e6fbe6] dark:hover:bg-[#1e3a1e] text-xs font-semibold transition"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCV(cv.id, cv.title)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#ea4335] dark:text-[#f87171] hover:bg-[#fdeaea] dark:hover:bg-[#3f1e1e] text-xs font-semibold transition"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}