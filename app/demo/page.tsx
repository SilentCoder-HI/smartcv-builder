"use client";

import { useEffect, useState, useRef } from "react";
import TemplateRenderer from "@/components/TemplateRenderer";
import { templates } from "@/data/TempleteIndex";
import { CVData } from "@/types/cv-types";
import { FaCheck as Check, FaBars, FaTimes, FaCopy, FaSave } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, LayoutTemplate, Moon, Sun, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";
import { TemplateMeta } from "@/types/template-types";
import { Toast } from "@/components/Toast";
import { useTheme } from "next-themes";

// Import demo CVs
import { frontendDeveloperCV } from "@/data/demoCVS/developer/developer-demo-cvs";
import { marketingManagerCV } from "@/data/demoCVS/business/business-demo-cvs";
import { researchScientistCV } from "@/data/demoCVS/academic/academic-cvs";
import { graphicDesignerCV } from "@/data/demoCVS/creative/creative-cvs";
import { registeredNurseCV } from "@/data/demoCVS/medical/medical-cvs";

// Color and Font System
const UNSTYME_COLORS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e42" },
  { name: "Slate", value: "#334155" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Gray", value: "#64748b" },
];

const UNSTYME_FONTS = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Lato", value: "Lato, sans-serif" },
  { name: "Merriweather", value: "Merriweather, serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
  { name: "Source Serif", value: "'Source Serif Pro', serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
];

// Array of demo CVs
const demoCVs: { title: string; cv: CVData }[] = [
  { title: "Frontend Developer", cv: frontendDeveloperCV },
  { title: "Marketing Manager", cv: marketingManagerCV },
  { title: "Research Scientist", cv: researchScientistCV },
  { title: "Graphic Designer", cv: graphicDesignerCV },
  { title: "Registered Nurse", cv: registeredNurseCV },
];

const groupedTemplates = {
  All: templates.filter((t) => t.styles),
  Classic: templates.filter((t) => t.templateType === "classic" && t.styles),
};

const layoutSizeMap: Record<string, { width: string; height: string }> = {
  A4: { width: "210mm", height: "297mm" },
  Letter: { width: "216mm", height: "279mm" },
  Legal: { width: "216mm", height: "356mm" },
};

const DemoPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [editingField, setEditingField] = useState<{ path: string, value: string } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const [selectedTab, setSelectedTab] = useState<"Templates" | "Layout" | "Customize">("Templates");
  const [selectedTemplateGroup, setSelectedTemplateGroup] = useState("All");
  const [selectedLayout, setSelectedLayout] = useState<"A4" | "Letter" | "Legal">("A4");
  const [layoutDropdown, setLayoutDropdown] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);


  // Color and Font state
  const [selectedColor, setSelectedColor] = useState(UNSTYME_COLORS[0].value);
  const [selectedFont, setSelectedFont] = useState(UNSTYME_FONTS[0].value);

  // CV state
  const [selectedCV, setSelectedCV] = useState<CVData>(frontendDeveloperCV);
  const initialTemplate = (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup]?.[0];
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateMeta | undefined>(initialTemplate);

  const previewSize = layoutSizeMap[selectedLayout];
  const currentTemplates = (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup] || [];

  const [toastOpen, setToastOpen] = useState(false);

  // Font family for preview
  const previewFontFamily = selectedFont;

  // Color system for preview
  const previewAccentColor = selectedColor;
  const [customColors, setCustomColors] = useState({
    mainHeadingColor: "",
    secmainHeadingColor: "",
    secsubHeadingColor: "",
    textColor: "",
    backgroundColor: "",
    skillItemBg: "",
  });

  // When template changes, keep the same CV
  function handleTemplateSelect(tpl: TemplateMeta) {
    setSelectedTemplate(tpl);
  }

  // Handle CV change
  function handleCVSelect(cv: CVData) {
    setSelectedCV(JSON.parse(JSON.stringify(cv))); // Deep copy
  }

  // Handle text editing
  const handleTextClick = (path: string, value: string) => {
    setEditingField({ path, value });
    setSelectedTab("Customize")
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingField) {
      setEditingField({ ...editingField, value: e.target.value });
    }
  };

  const handleEditSave = () => {
    if (editingField) {
      // Update the CV data
      const pathParts = editingField.path.split('.');
      const newCV = { ...selectedCV };
      let current: any = newCV;

      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }

      current[pathParts[pathParts.length - 1]] = editingField.value;
      setSelectedCV(newCV);
      setEditingField(null);
    }
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editingField && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingField]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Toast Notification */}
      {toastOpen && (
        <Toast
          message="Please log in to unlock full customization tools and extra templates."
          type="info"
          duration={4000}
          className="w-96"
        />
      )}

      <div className="mx-auto p-4 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <FileText className="text-blue-600" size={28} />
            SmartCV
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              onClick={() => setShowMobilePreview((prev) => !prev)}
              className="lg:hidden text-2xl p-4"
            >
              <FaBars className="text-lg" />
            </Button>
          </div>
        </div>

        <div className="flex flex-row gap-4 overflow-hidden p-2 h-screen">
          {/* Sidebar Section */}
          <div className="w-full hidden lg:block">
            <div
              className="transition-colors overflow-y-auto overflow-x-hidden scrollbar-hide"
              style={{
                maxHeight: `calc(100vh - 120px)`,
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {/* Tab Switcher */}
              <div className="flex justify-center my-5 gap-2">
                {(["Templates", "Customize", "Layout"] as const).map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded text-sm ${selectedTab === tab
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                  >
                    {tab}
                  </Button>
                ))}
                <div className="relative flex items-center gap-2">
                  <Button
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition"
                    onClick={() => setToastOpen((prev) => !prev)}
                    title="More options"
                    type="button"
                  >
                    <span className="text-2xl font-bold">+</span>
                  </Button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {/* Customize Tab */}
                {selectedTab === "Customize" && (
                  <div className="flex flex-col gap-6 mt-6 relative">
                    <button
                      className="absolute right-0 top-0 z-10 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold shadow transition"
                      onClick={() =>
                        setCustomColors({
                          mainHeadingColor: "",
                          secmainHeadingColor: "",
                          secsubHeadingColor: "",
                          textColor: "",
                          backgroundColor: "",
                          skillItemBg: "",
                        })
                      }
                      type="button"
                      title="Reset all colors"
                    >
                      Reset
                    </button>
                    {editingField && (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          Edit
                        </label>
                        {/* Fixed Edit Input Bar */}
                        <div className=" top-0 left-0 right-0 bg-white dark:bg-gray-950 py-3 shadow-lg z-50 flex items-center gap-2">
                          <input
                            ref={editInputRef}
                            type="text"
                            value={editingField.value}
                            onChange={handleEditChange}
                            onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                            className="flex-1 p-2 border rounded"
                          />
                          <Button onClick={handleEditSave} size="sm">
                            <FaSave className="mr-1" /> Save
                          </Button>
                          <Button onClick={() => setEditingField(null)} variant="ghost" size="sm">
                            <FaTimes />
                          </Button>
                        </div>
                      </div>
                    )}
                    {/* CV Selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Select CV Example
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {demoCVs.map(({ title, cv }) => (
                          <Button
                            key={title}
                            onClick={() => handleCVSelect(cv)}
                            className={`text-xs ${selectedCV === cv
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                          >
                            {title}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Color Customization */}
                    {Object.keys(customColors).map((key) => (
                      <div key={key} className="flex flex-col gap-2">
                        <label
                          htmlFor={key}
                          className="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize"
                        >
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <div className="flex items-center gap-2 flex-wrap">
                          {["#1E293B", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                            <button
                              key={color}
                              onClick={() =>
                                setCustomColors((prev) => ({
                                  ...prev,
                                  [key]: color,
                                }))
                              }
                              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 hover:scale-105 transition"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                          <input
                            type="color"
                            id={key}
                            value={customColors[key as keyof typeof customColors]}
                            onChange={(e) =>
                              setCustomColors((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                              }))
                            }
                            className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Templates Tab */}
                {selectedTab === "Templates" && (
                  <>
                    <div className="flex gap-2 my-5 justify-center flex-wrap">
                      {Object.keys(groupedTemplates).map((group) => (
                        <Button
                          key={group}
                          onClick={() => {
                            setSelectedTemplateGroup(group);
                            const firstTemplate = (groupedTemplates as Record<string, any[]>)[group]?.[0];
                            if (firstTemplate?.styles) handleTemplateSelect(firstTemplate);
                          }}
                          className={`px-3 py-1 text-xs ${selectedTemplateGroup === group
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                        >
                          {group}
                        </Button>
                      ))}
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                      {currentTemplates.map((tpl: any, index: number) => (
                        <div
                          key={tpl?.id || tpl?.templateName || index}
                          className={`p-3 border rounded-lg shadow-sm cursor-pointer overflow-hidden transition flex flex-col items-center ${selectedTemplate?.id === tpl?.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                            : "bg-white border-gray-200 dark:bg-gray-800"
                            }`}
                          onClick={() => handleTemplateSelect(tpl)}
                        >
                          <div className="font-semibold mb-2">{tpl?.templateName}</div>
                          <div className="w-full h-56 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden flex items-center justify-center mb-2 border select-none pointer-events-none">
                            {tpl?.styles ? (
                              <div className="h-96 w-full overflow-hidden bg-white border-b select-none pointer-events-none">
                                <div className="scale-[0.3] w-[333%] h-[444%] origin-top-left translate-y-20 aspect- select-none pointer-events-none">
                                  <TemplateRenderer
                                    template={tpl}
                                    cvData={selectedCV}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs select-none pointer-events-none">
                                No preview available
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Layout Tab */}
                {selectedTab === "Layout" && (
                  <div className="flex flex-col items-center">
                    <span className="mb-2 text-sm font-medium">Select CV Layout</span>
                    <div className="relative w-full">
                      <Button
                        onClick={() => setLayoutDropdown(!layoutDropdown)}
                        className="w-full flex justify-between px-4 py-2 border rounded"
                      >
                        {selectedLayout} <ChevronDown size={18} />
                      </Button>
                      {layoutDropdown && (
                        <ul className="absolute w-full mt-1 z-10 bg-white dark:bg-gray-900 shadow-lg rounded">
                          {Object.keys(layoutSizeMap).map((layout) => (
                            <li
                              key={layout}
                              className={`px-4 py-2 flex justify-between cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 ${selectedLayout === layout ? "bg-blue-500 text-white" : ""
                                }`}
                              onClick={() => {
                                setSelectedLayout(layout as "A4" | "Letter" | "Legal");
                                setLayoutDropdown(false);
                              }}
                            >
                              {layout}
                              <span className="ml-2 text-xs text-gray-400 dark:text-gray-300">
                                {layout === "A4" && "(210 × 297 mm)"}
                                {layout === "Letter" && "(8.5 × 11 in)"}
                                {layout === "Legal" && "(8.5 × 14 in)"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full relative overflow-hidden px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center gap-4">
              {/* Scrollable CV Preview Section with Responsive Scaling */}
              <div
                className="rounded border overflow-hidden h-screen transition-all scale-[0.85] sm:scale-[0.95] md:scale-100"
                style={{
                  marginTop: editingField ? "80px" : "0",
                  width: "100%",
                  maxWidth: "850px",
                  aspectRatio: "0.707",
                  background: "white",
                  fontFamily: previewFontFamily,
                  boxShadow: "0 0 0 1px #e5e7eb",
                }}
              >
                <div
                  className="dark:bg-white bg-white w-full h-full overflow-y-auto"
                  style={{
                    fontFamily: previewFontFamily,
                  }}
                >
                  {selectedTemplate?.styles && (
                    <TemplateRenderer
                      template={selectedTemplate}
                      cvData={selectedCV}
                      customColors={customColors}
                      onTextClick={handleTextClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-4 left-4 z-50">
        <Button
          className="rounded-full p-3 shadow-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowMobilePreview(true)}
        >
          <LayoutTemplate size={20} />
        </Button>
      </div>

      {/* Mobile Preview */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Customization Panel</h2>
            <Button
              onClick={() => setShowMobilePreview(false)}
              variant="ghost"
              size="icon"
            >
              <FaTimes />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mb-4">
              {(["Templates", "Customize", "Layout"] as const).map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded text-sm ${selectedTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Color and Font Controls */}
            <div className="flex flex-col gap-3 my-2 px-2">
              <div>
                <span className="block text-xs font-semibold mb-1">Accent Color</span>
                <div className="flex gap-2 flex-wrap">
                  {UNSTYME_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === color.value
                        ? "border-blue-600 ring-2 ring-blue-300"
                        : "border-gray-300"
                        }`}
                      style={{ background: color.value }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-xs font-semibold mb-1">Font</span>
                <select
                  className="w-full px-2 py-1 rounded border text-sm bg-white dark:bg-gray-800"
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                >
                  {UNSTYME_FONTS.map((font) => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tab Content */}
            {selectedTab === "Customize" && (
              <>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {demoCVs.map(({ title, cv }, idx) => (
                    <Button
                      key={title + idx}
                      onClick={() => handleCVSelect(cv)}
                      className={`px-3 py-1 text-xs ${selectedCV === cv
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                    >
                      {title}
                    </Button>
                  ))}
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="flex gap-2 px-2" style={{ minWidth: "max-content" }}>
                    {demoCVs.map(({ title, cv }, idx) => (
                      <Button
                        key={title + idx}
                        onClick={() => handleCVSelect(cv)}
                        className={`flex flex-col items-center min-w-[140px] max-w-[180px] px-4 py-3 text-center border rounded transition-all ${selectedCV === cv
                          ? "bg-blue-100 border-blue-500 dark:bg-blue-900"
                          : "bg-white border-gray-200 dark:bg-gray-800"
                          }`}
                        style={{ flex: "0 0 auto" }}
                      >
                        <span className="truncate">{title}</span>
                        {selectedCV === cv && <Check className="text-blue-600 mt-1" />}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedTab === "Templates" && (
              <>
                <div className="flex gap-2 justify-center flex-wrap mb-2">
                  {Object.keys(groupedTemplates).map((group) => (
                    <Button
                      key={group}
                      onClick={() => {
                        setSelectedTemplateGroup(group);
                        const firstTemplate = (groupedTemplates as Record<string, any[]>)[group]?.[0];
                        if (firstTemplate?.styles) handleTemplateSelect(firstTemplate);
                      }}
                      className={`px-3 py-1 text-xs ${selectedTemplateGroup === group
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                    >
                      {group}
                    </Button>
                  ))}
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="flex flex-wrap gap-2 px-2 w-full">
                    {currentTemplates.map((tpl: any, index: number) => (
                      <div
                        key={tpl?.id || tpl?.templateName || index}
                        className={`p-3 border rounded-lg shadow-sm cursor-pointer overflow-hidden transition flex flex-col items-center min-w-[180px] max-w-[220px] ${selectedTemplate?.id === tpl?.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                          : "bg-white border-gray-200 dark:bg-gray-800"
                          }`}
                        onClick={() => handleTemplateSelect(tpl)}
                        style={{ flex: "0 0 auto" }}
                      >
                        <div className="font-semibold mb-2 truncate">{tpl?.templateName}</div>
                        <div className="w-full h-40 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden flex items-center justify-center mb-2 border select-none pointer-events-none">
                          {tpl?.styles ? (
                            <div className="h-80 w-full overflow-hidden bg-white border-b select-none pointer-events-none">
                              <div className="scale-[0.25] w-[400%] h-[400%] origin-top-left aspect- select-none pointer-events-none">
                                <TemplateRenderer
                                  template={tpl}
                                  cvData={selectedCV}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs select-none pointer-events-none">
                              No preview
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedTab === "Layout" && (
              <div className="flex flex-col items-center">
                <span className="mb-2 text-sm font-medium">Select CV Layout</span>
                <div className="relative w-full">
                  <Button
                    onClick={() => setLayoutDropdown(!layoutDropdown)}
                    className="w-full flex justify-between px-4 py-2 border rounded"
                  >
                    {selectedLayout} <ChevronDown size={18} />
                  </Button>
                  {layoutDropdown && (
                    <ul className="absolute w-full mt-1 z-10 bg-white dark:bg-gray-900 shadow-lg rounded">
                      {Object.keys(layoutSizeMap).map((layout) => (
                        <li
                          key={layout}
                          className={`px-4 py-2 flex justify-between cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 ${selectedLayout === layout ? "bg-blue-500 text-white" : ""
                            }`}
                          onClick={() => {
                            setSelectedLayout(layout as "A4" | "Letter" | "Legal");
                            setLayoutDropdown(false);
                          }}
                        >
                          {layout}
                          <span className="ml-2 text-xs text-gray-400 dark:text-gray-300">
                            {layout === "A4" && "(210 × 297 mm)"}
                            {layout === "Letter" && "(8.5 × 11 in)"}
                            {layout === "Legal" && "(8.5 × 14 in)"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPage;