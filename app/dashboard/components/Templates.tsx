"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import TemplateRenderer from "@/components/TemplateRenderer";
import { templates } from "@/data/TempleteIndex";
import { frontendDeveloperCV } from "@/data/demoCVS/developer/developer-demo-cvs";
import LoadingSpinner from "./loading/loading";
import type { TemplateMeta } from "@/types/template-types";

// --- Extract unique plans and types for filters ---
const PLAN_OPTIONS = [
  { label: "All", value: "all" },
  ...Array.from(new Set(templates.map((t) => t.plan))).map((plan) => ({
    label: plan.charAt(0).toUpperCase() + plan.slice(1),
    value: plan.toLowerCase(),
  })),
];

const TEMPLATE_TYPE_OPTIONS = [
  { label: "All Types", value: "all" },
  ...Array.from(new Set(templates.map((t) => t.templateType))).map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type.toLowerCase(),
  })),
];

// --- Plan badge UI ---
function getPlanBadge(plan: string) {
  const colors: Record<string, string> = {
    free: "bg-green-100 text-green-700 border-green-200",
    pro: "bg-purple-100 text-purple-700 border-purple-200",
    plus: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  const cls =
    colors[plan.toLowerCase()] ||
    "bg-gray-200 text-gray-700 border-gray-300";
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${cls}`}
    >
      {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </span>
  );
}

// --- Main Component ---
type TemplatesSelectorProps = {
  onUseTemplate?: (templateId: string) => void;
  onPreviewTemplate?: (templateId: string) => void;
};

export default function TemplatesSelector({
  onUseTemplate,
  onPreviewTemplate,
}: TemplatesSelectorProps = {}) {
  const [loading, setLoading] = useState(true);
  const [allTemplates, setAllTemplates] = useState<TemplateMeta[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(templates)) {
      setAllTemplates(templates as TemplateMeta[]);
      setLoading(false);
    }
  }, []);

  // --- Filtering logic ---
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((tpl) => {
      const matchesPlan =
        selectedPlan === "all" ||
        (tpl.plan && tpl.plan.toLowerCase() === selectedPlan);
      const matchesType =
        selectedType === "all" ||
        (tpl.templateType &&
          tpl.templateType.toLowerCase() === selectedType);
      const matchesSearch =
        !search.trim() ||
        tpl.templateName.toLowerCase().includes(search.toLowerCase()) ||
        tpl.description.toLowerCase().includes(search.toLowerCase());
      return matchesPlan && matchesType && matchesSearch;
    });
  }, [allTemplates, selectedPlan, selectedType, search]);

  // --- Handle Use Template ---
  function handleUseTemplate(templateId: string) {
    if (onUseTemplate) {
      onUseTemplate(templateId);
    } else {
      // fallback: alert for demo
      alert(`Template selected: ${templateId}`);
    }
  }

  // --- Handle Preview Template ---
  function handlePreviewTemplate(templateId: string) {
    setPreviewId(templateId);
    if (onPreviewTemplate) {
      onPreviewTemplate(templateId);
    }
  }

  // --- Modal for Preview ---
  function PreviewModal() {
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!previewId) return;

      function handleClickOutside(event: MouseEvent) {
        if (
          modalContentRef.current &&
          !modalContentRef.current.contains(event.target as Node)
        ) {
          setPreviewId(null);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [previewId]);

    if (!previewId) return null;
    const tpl = allTemplates.find((t) => t.templateId === previewId);
    if (!tpl) return null;
    return (
      <div className="fixed inset-0 z-50 top-0 flex items-center justify-center bg-black/60">
        <div
          ref={modalContentRef}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative"
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
            onClick={() => setPreviewId(null)}
            aria-label="Close preview"
          >
            &times;
          </button>
          <div className="max-h-[85vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-inner p-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-bold text-xl">{tpl.templateName}</span>
              {tpl.plan && getPlanBadge(tpl.plan)}
              <span className="text-xs text-gray-500 capitalize">{tpl.templateType}</span>
            </div>
            <div className="overflow-auto border rounded-lg bg-white dark:bg-gray-800 p-2">
              <div className="scale-90 origin-top w-full">
                <TemplateRenderer template={tpl} cvData={frontendDeveloperCV} />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => {
                  handleUseTemplate(tpl.templateId);
                  setPreviewId(null);
                }}
              >
                Use This Template
              </button>
              <button
                className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setPreviewId(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-8 sm:px-6 lg:px-8 flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Explore Resume Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Choose from a wide variety of professional designs to make your CV stand out.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          {/* Plan filter */}
          <div className="flex flex-wrap gap-2">
            {PLAN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPlan(option.value)}
                className={`px-4 py-1 rounded-full font-medium transition border ${selectedPlan === option.value
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            {TEMPLATE_TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedType(option.value)}
                className={`px-3 py-1 rounded-full font-medium transition border ${selectedType === option.value
                    ? "bg-indigo-600 text-white border-indigo-600 shadow"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-800"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <div className="w-full h-96 col-span-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : filteredTemplates.length > 0 ? (
            filteredTemplates.map((tpl, index) => (
              <div
                key={tpl.templateId || tpl.templateName || index}
                className="group p-4 border rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:shadow-xl hover:border-blue-400 transition relative flex flex-col"
              >
                {/* Badge */}
                <div className="absolute top-3 right-3">
                  {tpl.plan && getPlanBadge(tpl.plan)}
                </div>

                {/* Title */}
                <div className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">
                  {tpl.templateName}
                </div>
                <div className="text-xs text-gray-500 mb-2 capitalize">
                  {tpl.templateType}
                </div>

                {/* Preview */}
                <div className="relative w-full h-72 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center mb-3 border">
                  {tpl.styles ? (
                    <div className="h-72 w-full overflow-hidden bg-white border-b select-none">
                      <div className="scale-[0.5] w-[200%] h-[144%] origin-top-left">
                        <TemplateRenderer
                          template={tpl}
                          cvData={frontendDeveloperCV}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No preview available
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      className="px-4 py-1 bg-white text-gray-800 rounded shadow font-medium hover:bg-gray-100"
                      onClick={() => handlePreviewTemplate(tpl.templateId)}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {tpl.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    className={`px-4 py-1 rounded font-semibold shadow transition ${tpl.plan && tpl.plan.toLowerCase() === "pro"
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    onClick={() => handleUseTemplate(tpl.templateId)}
                  >
                    Use Template
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={() => handlePreviewTemplate(tpl.templateId)}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No templates available.
            </div>
          )}
        </div>
      </div>
      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
}
