"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import TemplateRenderer from "@/components/TemplateRenderer";
import { templates } from "@/data/TempleteIndex";
import { CVData } from "@/types/cv-types";
import { FaCheck as Check, FaTimes, FaSave } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LayoutTemplate,
  Sparkles,
  Palette,
  Monitor,
  ChevronUp,
} from "lucide-react";
import { TemplateMeta } from "@/types/template-types";
import { Toast } from "@/components/Toast";
import { useTheme } from "next-themes";

// Import demo CVs
import { frontendDeveloperCV } from "@/data/demoCVS/developer/developer-demo-cvs";
import { marketingManagerCV } from "@/data/demoCVS/business/business-demo-cvs";
import { researchScientistCV } from "@/data/demoCVS/academic/academic-cvs";
import { graphicDesignerCV } from "@/data/demoCVS/creative/creative-cvs";
import { registeredNurseCV } from "@/data/demoCVS/medical/medical-cvs";

// --- i18n ready strings ---
const TRANSLATIONS = {
  templates: "Templates",
  customize: "Customize",
  layout: "Layout",
  selectCVExample: "Select CV Example",
  reset: "Reset",
  edit: "Edit",
  fontFamily: "Font Family",
  accentColor: "Accent Color",
  selectCVLayout: "Select CV Layout",
  moreOptions: "More options",
  noTemplates: "No templates available in this group.",
  customizationPanel: "Customization Panel",
  save: "Save",
  yourSelectedTemplate: "Your selected template",
  pleaseLogin: "Please log in to unlock full customization tools and extra templates.",
};

// --- Color and Font System ---
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

// --- Demo CVs ---
const demoCVs: { title: string; cv: CVData }[] = [
  { title: "Frontend Developer", cv: frontendDeveloperCV },
  { title: "Marketing Manager", cv: marketingManagerCV },
  { title: "Research Scientist", cv: researchScientistCV },
  { title: "Graphic Designer", cv: graphicDesignerCV },
  { title: "Registered Nurse", cv: registeredNurseCV },
];

// --- Layout Sizes ---
const layoutSizeMap: Record<string, { width: string; height: string }> = {
  A4: { width: "210mm", height: "297mm" },
  Letter: { width: "216mm", height: "279mm" },
  Legal: { width: "216mm", height: "356mm" },
};

// --- TypeScript Interfaces ---
type GroupedTemplates = {
  All: TemplateMeta[];
  Classic: TemplateMeta[];
  Corporate: TemplateMeta[];
};

interface PreviewEditorProps {
  UserCV: CVData;
  onCVChange?: (cv: CVData) => void;
  initialTemplateGroup?: keyof GroupedTemplates;
  userTemplate: string;
  initialLayout?: "A4" | "Letter" | "Legal";
  onSaveDraft?: (cv: CVData, templateId: string) => void;
  onPublish?: (cv: CVData, templateId: string) => void;
  loading?: boolean;
}

interface CustomColors {
  mainHeadingColor: string;
  secmainHeadingColor: string;
  secsubHeadingColor: string;
  textColor: string;
  backgroundColor: string;
  skillItemBg: string;
}

interface PreviewState {
  demoCVIndex: number;
  mainPreviewCV: CVData;
  selectedTemplate?: TemplateMeta;
  editingField: { path: string; value: string } | null;
  selectedTemplateGroup: keyof GroupedTemplates;
  selectedLayout: "A4" | "Letter" | "Legal";
  layoutDropdown: boolean;
  showMobilePreview: boolean;
  selectedColor: string;
  selectedFont: string;
  toastOpen: boolean;
  customColors: CustomColors;
}

// --- Error Boundary for Template Rendering ---
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Optionally log error
    // console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
const TemplateErrorFallback = () => (
  <span className="text-red-500 text-xs">{TRANSLATIONS.noTemplates}</span>
);

// --- Subcomponents (should be moved to separate files in a real project) ---
const ColorSwatch = ({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Select ${color} color`}
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    className={`w-8 h-8 rounded-full border-2 transition-all duration-150 flex items-center justify-center
      ${selected ? "border-blue-500 ring-2 ring-blue-300 scale-110 shadow-lg" : "border-gray-200 hover:scale-105"}
    `}
    style={{ backgroundColor: color }}
  >
    {selected && <Check className="text-white drop-shadow" size={16} />}
  </button>
);

const FontOption = ({
  font,
  selected,
  onClick,
}: {
  font: typeof UNSTYME_FONTS[0];
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Select font ${font.name}`}
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all duration-150
      ${selected ? "bg-blue-500 text-white border-blue-500 scale-105 shadow" : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100"}
    `}
    style={{ fontFamily: font.value }}
  >
    {font.name}
  </button>
);

const TemplateCard = ({
  tpl,
  isSelected,
  isUserTemplate,
  onClick,
  selectedCV,
}: {
  tpl: TemplateMeta;
  isSelected: boolean;
  isUserTemplate: boolean;
  onClick: () => void;
  selectedCV: CVData;
}) => (
  <div
    role="button"
    aria-pressed={isSelected}
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    className={`p-3 border rounded-xl shadow-md cursor-pointer overflow-hidden transition-all duration-200 flex flex-col items-center bg-gradient-to-br
      ${isSelected
        ? "border-blue-500 from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 scale-105 ring-2 ring-blue-300"
        : isUserTemplate
          ? "border-green-500 from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 ring-2 ring-green-300"
          : "bg-white border-gray-200 dark:bg-gray-800"
      }
      hover:scale-105 hover:shadow-xl
    `}
    onClick={onClick}
    title={isUserTemplate ? TRANSLATIONS.yourSelectedTemplate : undefined}
  >
    <div className="w-full h-56 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center mb-2 border select-none pointer-events-none shadow-inner">
      {tpl?.styles ? (
        <div className="h-96 w-full overflow-hidden bg-white border-b select-none pointer-events-none">
          <div className="scale-[0.3] w-[333%] h-[444%] origin-top-left translate-y-20 aspect-[0.707] select-none pointer-events-none">
            <ErrorBoundary fallback={<TemplateErrorFallback />}>
              <TemplateRenderer template={tpl} cvData={selectedCV} />
            </ErrorBoundary>
          </div>
        </div>
      ) : (
        <span className="text-gray-400 text-xs select-none pointer-events-none">
          {TRANSLATIONS.noTemplates}
        </span>
      )}
    </div>
  </div>
);

const TabSwitcher = ({
  selectedTab,
  setSelectedTab,
  tabIcons,
  setToastOpen,
}: {
  selectedTab: "Templates" | "Layout" | "Customize";
  setSelectedTab: (tab: "Templates" | "Layout" | "Customize") => void;
  tabIcons: Record<string, React.ReactNode>;
  setToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex justify-center my-5 gap-2 relative">
    {(["Templates", "Customize", "Layout"] as const).map((tab) => (
      <Button
        key={tab}
        type="button"
        onClick={() => setSelectedTab(tab)}
        aria-label={TRANSLATIONS[tab.toLowerCase() as keyof typeof TRANSLATIONS]}
        className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-200 relative
          ${selectedTab === tab
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
            : "bg-gray-100 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        style={{
          boxShadow: selectedTab === tab ? "0 4px 16px 0 rgba(59,130,246,0.10)" : undefined,
          border: selectedTab === tab ? "2px solid #2563eb" : undefined,
        }}
      >
        {tabIcons[tab]}
        {TRANSLATIONS[tab.toLowerCase() as keyof typeof TRANSLATIONS]}
        {selectedTab === tab && (
          <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
        )}
      </Button>
    ))}
    <div className="relative flex items-center gap-2">
      <Button
        type="button"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-800 dark:to-gray-700 hover:bg-blue-600 hover:text-white transition"
        onClick={() => setToastOpen((prev) => !prev)}
        title={TRANSLATIONS.moreOptions}
        aria-label={TRANSLATIONS.moreOptions}
      >
        <span className="text-2xl font-bold">+</span>
      </Button>
    </div>
  </div>
);

// --- Grouped Templates Memoized ---
const useGroupedTemplates = (): GroupedTemplates =>
  useMemo(() => {
    return {
      All: templates.filter((t) => t.styles),
      Classic: templates.filter((t) => t.templateType === "classic" && t.styles),
      Corporate: templates.filter((t) => t.templateType === "corporate" && t.styles),
    };
  }, []); // templates is imported, not a dependency

// --- Preview State Reducer ---
function previewReducer(
  state: PreviewState,
  action:
    | { type: "SET_DEMO_CV_INDEX"; payload: number }
    | { type: "SET_MAIN_PREVIEW_CV"; payload: CVData }
    | { type: "SET_SELECTED_TEMPLATE"; payload: TemplateMeta | undefined }
    | { type: "SET_EDITING_FIELD"; payload: { path: string; value: string } | null }
    | { type: "SET_TEMPLATE_GROUP"; payload: keyof GroupedTemplates }
    | { type: "SET_LAYOUT"; payload: "A4" | "Letter" | "Legal" }
    | { type: "SET_LAYOUT_DROPDOWN"; payload: boolean }
    | { type: "SET_SHOW_MOBILE_PREVIEW"; payload: boolean }
    | { type: "SET_SELECTED_COLOR"; payload: string }
    | { type: "SET_SELECTED_FONT"; payload: string }
    | { type: "SET_TOAST_OPEN"; payload: boolean }
    | { type: "SET_CUSTOM_COLORS"; payload: CustomColors }
    | { type: "RESET_CUSTOM_COLORS"; payload: CustomColors }
) {
  switch (action.type) {
    case "SET_DEMO_CV_INDEX":
      return { ...state, demoCVIndex: action.payload };
    case "SET_MAIN_PREVIEW_CV":
      return { ...state, mainPreviewCV: action.payload };
    case "SET_SELECTED_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };
    case "SET_EDITING_FIELD":
      return { ...state, editingField: action.payload };
    case "SET_TEMPLATE_GROUP":
      return { ...state, selectedTemplateGroup: action.payload };
    case "SET_LAYOUT":
      return { ...state, selectedLayout: action.payload };
    case "SET_LAYOUT_DROPDOWN":
      return { ...state, layoutDropdown: action.payload };
    case "SET_SHOW_MOBILE_PREVIEW":
      return { ...state, showMobilePreview: action.payload };
    case "SET_SELECTED_COLOR":
      return { ...state, selectedColor: action.payload };
    case "SET_SELECTED_FONT":
      return { ...state, selectedFont: action.payload };
    case "SET_TOAST_OPEN":
      return { ...state, toastOpen: action.payload };
    case "SET_CUSTOM_COLORS":
      return { ...state, customColors: action.payload };
    case "RESET_CUSTOM_COLORS":
      return { ...state, customColors: action.payload, mainPreviewCV: state.mainPreviewCV };
    default:
      return state;
  }
}

const initialCustomColors: CustomColors = {
  mainHeadingColor: "",
  secmainHeadingColor: "",
  secsubHeadingColor: "",
  textColor: "",
  backgroundColor: "",
  skillItemBg: "",
};

const PreviewEditor = ({
  UserCV,
  onCVChange,
  userTemplate,
  initialTemplateGroup = "All",
  initialLayout = "A4",
  onSaveDraft,
  onPublish,
  loading,
}: PreviewEditorProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // --- Grouped Templates Memoized ---
  const groupedTemplates = useGroupedTemplates();

  // --- All templates memoized ---
  const allTemplates: TemplateMeta[] = useMemo(
    () => templates.filter((t) => t.styles),
    []
  );

  // --- User template object memoized ---
  const userTemplateObj = useMemo(
    () => allTemplates.find((tpl) => tpl.templateId === userTemplate),
    [allTemplates, userTemplate]
  );

  // --- Initial template selection ---
  const initialTemplate = useMemo(
    () =>
      userTemplateObj ||
      groupedTemplates[initialTemplateGroup]?.[0],
    [userTemplateObj, groupedTemplates, initialTemplateGroup]
  );

  // --- Preview State Management ---
  const [previewState, dispatch] = useReducer(previewReducer, {
    demoCVIndex: 0,
    mainPreviewCV: UserCV,
    selectedTemplate: initialTemplate,
    editingField: null,
    selectedTemplateGroup: initialTemplateGroup,
    selectedLayout: initialLayout,
    layoutDropdown: false,
    showMobilePreview: false,
    selectedColor: UNSTYME_COLORS[0].value,
    selectedFont: UNSTYME_FONTS[0].value,
    toastOpen: false,
    customColors: initialCustomColors,
  });

  // --- Tab State ---
  const [selectedTab, setSelectedTab] = useState<
    "Templates" | "Layout" | "Customize"
  >("Templates");

  // --- Tab Icons Memoized ---
  const tabIcons: Record<string, React.ReactNode> = useMemo(
    () => ({
      Templates: (
        <Sparkles
          className={`w-4 h-4 mr-1 ${selectedTab === "Templates" ? "text-blue-100" : "text-blue-500"
            }`}
        />
      ),
      Customize: (
        <Palette
          className={`w-4 h-4 mr-1 ${selectedTab === "Customize" ? "text-pink-100" : "text-pink-500"
            }`}
        />
      ),
      Layout: (
        <Monitor
          className={`w-4 h-4 mr-1 ${selectedTab === "Layout" ? "text-amber-100" : "text-amber-500"
            }`}
        />
      ),
    }),
    [selectedTab]
  );

  // --- Current Templates Memoized ---
  const currentTemplates: TemplateMeta[] = useMemo(
    () => groupedTemplates[previewState.selectedTemplateGroup] || [],
    [groupedTemplates, previewState.selectedTemplateGroup]
  );

  // --- Layout Dropdown Click Outside Handler ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        previewState.layoutDropdown &&
        !target.closest(".layout-dropdown")
      ) {
        dispatch({ type: "SET_LAYOUT_DROPDOWN", payload: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [previewState.layoutDropdown]);

  // --- Prevent hydration mismatch ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Focus edit input when editingField changes ---
  useEffect(() => {
    if (previewState.editingField && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [previewState.editingField]);

  // --- When template group changes, update selectedTemplate to userTemplate if present in group, else first in group ---
  useEffect(() => {
    const groupTemplates: TemplateMeta[] =
      groupedTemplates[previewState.selectedTemplateGroup] || [];
    const found = groupTemplates.find(
      (tpl) => tpl.templateId === userTemplate
    );
    if (found) {
      dispatch({ type: "SET_SELECTED_TEMPLATE", payload: found });
    } else if (groupTemplates.length > 0) {
      dispatch({ type: "SET_SELECTED_TEMPLATE", payload: groupTemplates[0] });
    } else {
      dispatch({ type: "SET_SELECTED_TEMPLATE", payload: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewState.selectedTemplateGroup, userTemplate, groupedTemplates]);

  // --- When userTemplate prop changes, update selectedTemplate if needed ---
  useEffect(() => {
    if (
      !previewState.selectedTemplate ||
      previewState.selectedTemplate.templateId !== userTemplate
    ) {
      const found = allTemplates.find(
        (tpl) => tpl.templateId === userTemplate
      );
      if (found)
        dispatch({ type: "SET_SELECTED_TEMPLATE", payload: found });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTemplate, allTemplates]);

  // --- Handlers ---
  const handleTemplateSelect = useCallback(
    (tpl: TemplateMeta) => {
      dispatch({ type: "SET_SELECTED_TEMPLATE", payload: tpl });
      dispatch({ type: "SET_MAIN_PREVIEW_CV", payload: UserCV });
    },
    [UserCV]
  );

  const handleCVSelect = useCallback((cv: CVData) => {
    dispatch({
      type: "SET_MAIN_PREVIEW_CV",
      payload: JSON.parse(JSON.stringify(cv)),
    });
    if (onCVChange) {
      onCVChange(JSON.parse(JSON.stringify(cv)));
    }
  }, [onCVChange]);

  const handleTextClick = useCallback((path: string, value: string) => {
    dispatch({ type: "SET_EDITING_FIELD", payload: { path, value } });
    setSelectedTab("Customize");
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (previewState.editingField) {
      dispatch({
        type: "SET_EDITING_FIELD",
        payload: {
          ...previewState.editingField,
          value: e.target.value,
        },
      });
    }
  };

  const handleEditSave = () => {
    if (previewState.editingField) {
      const pathParts = previewState.editingField.path.split(".");
      // Deep clone to avoid mutating state
      const newCV = JSON.parse(JSON.stringify(previewState.mainPreviewCV));
      let current: any = newCV;
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (current[pathParts[i]] === undefined) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = previewState.editingField.value;
      dispatch({ type: "SET_MAIN_PREVIEW_CV", payload: newCV });
      if (onCVChange) {
        onCVChange(newCV);
      }
      dispatch({ type: "SET_EDITING_FIELD", payload: null });
    }
  };

  const handleReset = () => {
    // Reset custom colors
    dispatch({ type: "RESET_CUSTOM_COLORS", payload: initialCustomColors });
    // Reset preview CV back to user's CV
    dispatch({ type: "SET_MAIN_PREVIEW_CV", payload: UserCV });
    // Reset template group and selected template
    dispatch({ type: "SET_TEMPLATE_GROUP", payload: initialTemplateGroup });
    if (initialTemplate) {
      dispatch({ type: "SET_SELECTED_TEMPLATE", payload: initialTemplate });
    }
    // Reset layout, font, color, editing field, demo index
    dispatch({ type: "SET_LAYOUT", payload: initialLayout });
    dispatch({ type: "SET_SELECTED_FONT", payload: UNSTYME_FONTS[0].value });
    dispatch({ type: "SET_SELECTED_COLOR", payload: UNSTYME_COLORS[0].value });
    dispatch({ type: "SET_EDITING_FIELD", payload: null });
    dispatch({ type: "SET_DEMO_CV_INDEX", payload: 0 });
    if (onCVChange) onCVChange(UserCV);
  };

  // Keep main preview using user's CV when not in Customize tab
  useEffect(() => {
    if (selectedTab !== "Customize") {
      dispatch({ type: "SET_MAIN_PREVIEW_CV", payload: UserCV });
      if (onCVChange) onCVChange(UserCV);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, UserCV]);

  // Download current preview as PDF via server-side Puppeteer
  const exportAsPdf = async () => {
    if (!previewRef.current) return;
    const container = previewRef.current.cloneNode(true) as HTMLDivElement;
    // inline styles for stable rendering
    container.style.maxWidth = "unset";
    container.style.transform = "none";
    container.style.scale = "1";
    // Create a standalone HTML document
    const docHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @page { size: ${previewState.selectedLayout}; margin: 10mm; }
      html, body { padding: 0; margin: 0; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    </style>
  </head>
  <body>
    ${container.innerHTML}
  </body>
</html>`;
    try {
      const res = await fetch("/dashboard/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: docHtml, layout: previewState.selectedLayout }),
      });
      if (!res.ok) {
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${UserCV.personalInfo.fullName || "cv"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      // do nothing, parent may toast
    }
  };

  if (!mounted) return null;

  // --- Responsive grid for mobile template cards ---
  const mobileTemplateGrid =
    "grid grid-cols-2 gap-4 p-4 w-full";

  // --- Preview size ---
  const previewSize = layoutSizeMap[previewState.selectedLayout];

  // --- Main Render ---
  return (
    <div className="w-full h-full max-h-screen overflow-hidden dark:bg-gradient-to-br dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white mx-auto space-y-8 my-5">
      {/* Toast Notification */}
      {previewState.toastOpen && (
        <Toast
          message={TRANSLATIONS.pleaseLogin}
          type="info"
          duration={4000}
          className="w-96"
        />
      )}

      <div className="mx-auto p-4 flex flex-col gap-6 h-full overflow-hidden">
        <div className="flex flex-row gap-4 h-full max-h-full p-2 overflow-hidden">
          {/* Sidebar Section */}
          <div className="w-full flex-1 hidden lg:block h-full overflow-hidden">
            <div className="transition-colors scrollbar-hide h-full flex flex-col overflow-hidden">
              {/* Tab Switcher */}
              <TabSwitcher
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                tabIcons={tabIcons}
                setToastOpen={(updater) => {
                  const next =
                    typeof updater === "function"
                      ? (updater as (prev: boolean) => boolean)(
                        previewState.toastOpen
                      )
                      : updater;
                  dispatch({ type: "SET_TOAST_OPEN", payload: next });
                }}
              />

              {/* Tab Content */}
              <div className="space-y-4 flex-1 min-h-0 overflow-y-auto no-scrollbar">
                {/* Customize Tab */}
                {selectedTab === "Customize" && (
                  <div className="flex flex-col gap-8 mt-6 relative">
                    <button
                      className="absolute right-0 top-0 z-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded text-xs font-semibold shadow transition-all duration-200"
                      onClick={handleReset}
                      type="button"
                      title={TRANSLATIONS.reset}
                    >
                      {TRANSLATIONS.reset}
                    </button>
                    {previewState.editingField && (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {TRANSLATIONS.edit}
                        </label>
                        {/* Fixed Edit Input Bar */}
                        <div className="top-0 left-0 right-0 bg-white dark:bg-gray-950 py-3 shadow-lg z-50 flex items-center gap-2 rounded-lg border border-blue-100 dark:border-gray-800">
                          <input
                            ref={editInputRef}
                            type="text"
                            value={previewState.editingField.value}
                            onChange={handleEditChange}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleEditSave()
                            }
                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-400"
                          />
                          <Button
                            type="button"
                            onClick={handleEditSave}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <FaSave className="mr-1" /> {TRANSLATIONS.save}
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              dispatch({
                                type: "SET_EDITING_FIELD",
                                payload: null,
                              })
                            }
                            variant="ghost"
                            size="sm"
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      </div>
                    )}
                    {/* CV Selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {TRANSLATIONS.selectCVExample}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {demoCVs.map(({ title, cv }, idx) => (
                          <Button
                            key={title}
                            type="button"
                            onClick={() => {
                              dispatch({
                                type: "SET_DEMO_CV_INDEX",
                                payload: idx,
                              });
                              handleCVSelect(cv);
                            }}
                            className={`text-xs rounded-full px-4 py-2 font-medium transition-all duration-150
                              ${previewState.mainPreviewCV === cv
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                                : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                              }`}
                          >
                            {title}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Color Customization */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.keys(previewState.customColors).map((key) => (
                        <div
                          key={key}
                          className="flex flex-col gap-2 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 p-3 rounded-lg shadow-sm"
                        >
                          <label
                            htmlFor={key}
                            className="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize"
                          >
                            {key.replace(/([A-Z])/g, " $1")}
                          </label>
                          <div className="flex items-center gap-2 flex-wrap">
                            {[
                              "#1E293B",
                              "#3B82F6",
                              "#10B981",
                              "#F59E0B",
                              "#EF4444",
                            ].map((color) => (
                              <ColorSwatch
                                key={color}
                                color={color}
                                selected={
                                  previewState.customColors[
                                  key as keyof CustomColors
                                  ] === color
                                }
                                onClick={() =>
                                  dispatch({
                                    type: "SET_CUSTOM_COLORS",
                                    payload: {
                                      ...previewState.customColors,
                                      [key]: color,
                                    },
                                  })
                                }
                              />
                            ))}
                            <input
                              type="color"
                              id={key}
                              value={
                                previewState.customColors[
                                key as keyof CustomColors
                                ] || "#000000"
                              }
                              onChange={(e) =>
                                dispatch({
                                  type: "SET_CUSTOM_COLORS",
                                  payload: {
                                    ...previewState.customColors,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                              className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Font Customization */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {TRANSLATIONS.fontFamily}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {UNSTYME_FONTS.map((font) => (
                          <FontOption
                            key={font.value}
                            font={font}
                            selected={previewState.selectedFont === font.value}
                            onClick={() =>
                              dispatch({
                                type: "SET_SELECTED_FONT",
                                payload: font.value,
                              })
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Templates Tab */}
                {selectedTab === "Templates" && (
                  <>
                    {/* Template Group Tabs */}
                    <div className="flex gap-2 my-5 justify-center flex-wrap">
                      {(Object.keys(groupedTemplates) as (keyof GroupedTemplates)[]).map((group) => (
                        <Button
                          key={group}
                          type="button"
                          onClick={() => {
                            dispatch({
                              type: "SET_TEMPLATE_GROUP",
                              payload: group,
                            });
                            // When switching group, try to select userTemplate if present
                            const groupTemplates =
                              groupedTemplates[group as keyof GroupedTemplates] || [];
                            const found = groupTemplates.find(
                              (tpl) => tpl.templateId === userTemplate
                            );
                            if (found) {
                              handleTemplateSelect(found);
                            } else if (groupTemplates.length > 0) {
                              dispatch({
                                type: "SET_SELECTED_TEMPLATE",
                                payload: groupTemplates[0],
                              });
                            }
                          }}
                          className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-150
                            ${previewState.selectedTemplateGroup === group
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                              : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                            }`}
                        >
                          {group}
                        </Button>
                      ))}
                    </div>
                    {/* Template Grid with Improved Scrolling */}
                    <div className="relative flex-1 min-h-0 overflow-hidden">
                      <div
                        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 no-scrollbar 2xl:grid-cols-3 overflow-y-auto"
                        style={{
                          maxHeight: "60vh",
                          padding: "1.25rem 1.25rem",
                          margin: "0 1.25rem",
                        }}
                      >
                        {currentTemplates.length === 0 ? (
                          <div className="col-span-full text-center text-gray-400 py-8">
                            {TRANSLATIONS.noTemplates}
                          </div>
                        ) : (
                          currentTemplates.map((tpl: TemplateMeta, index: number) => {
                            const isUserTemplate =
                              tpl.templateId === userTemplate;
                            const isSelected =
                              previewState.selectedTemplate?.templateId ===
                              tpl.templateId;
                            const cardCV =
                              demoCVs[previewState.demoCVIndex].cv;
                            return (
                              <TemplateCard
                                key={tpl?.templateId || tpl?.templateName || index}
                                tpl={tpl}
                                isSelected={isSelected}
                                isUserTemplate={isUserTemplate}
                                onClick={() => {
                                  handleTemplateSelect(tpl);
                                }}
                                selectedCV={cardCV}
                              />
                            );
                          })
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Layout Tab */}
                {selectedTab === "Layout" && (
                  <div className="flex flex-col h-full items-center gap-4 relative z-[9999]">
                    <span className="mb-2 text-sm font-medium">
                      {TRANSLATIONS.selectCVLayout}
                    </span>
                    <div className="w-full relative layout-dropdown">
                      <Button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "SET_LAYOUT_DROPDOWN",
                            payload: !previewState.layoutDropdown,
                          })
                        }
                        className="w-full flex justify-between px-4 py-2 border rounded-lg font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900"
                      >
                        {previewState.selectedLayout}{" "}
                        {!previewState.layoutDropdown ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </Button>
                      {previewState.layoutDropdown && (
                        <ul
                          className="left-0 top-full w-full mt-1 z-[9999] bg-white dark:bg-gray-900 shadow-2xl rounded-lg border border-blue-100 dark:border-gray-800"
                          style={{
                            boxShadow:
                              "0 8px 32px 0 rgba(59,130,246,0.20)",
                            minWidth: "180px",
                          }}
                        >
                          {Object.keys(layoutSizeMap).map((layout) => (
                            <li
                              key={layout}
                              className={`px-4 py-2 flex justify-between cursor-pointer hover:bg-blue-800 hover:text-white dark:hover:bg-blue-900 rounded transition-all duration-100 ${previewState.selectedLayout === layout
                                  ? "bg-blue-500 text-white"
                                  : ""
                                }`}
                              onClick={() => {
                                dispatch({
                                  type: "SET_LAYOUT",
                                  payload: layout as
                                    | "A4"
                                    | "Letter"
                                    | "Legal",
                                });
                                dispatch({
                                  type: "SET_LAYOUT_DROPDOWN",
                                  payload: false,
                                });
                              }}
                            >
                              {layout}
                              <span className="ml-2 text-xs text-black dark:text-gray-300">
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
          <div className="flex-1 h-[80vh] w-full relative overflow-hidden px-2 sm:px-4 md:px-6 rounded-2xl">
            {/* Actions Bar inside Editor (optional) */}
            {(onSaveDraft || onPublish) && (
              <div className="sticky top-0 z-30 mb-2 flex flex-wrap items-center gap-2 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl px-3 py-2 shadow-sm">
                <Button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                  variant="secondary"
                  disabled={!!loading}
                >
                  {TRANSLATIONS.reset}
                </Button>
                {onSaveDraft && (
                  <Button
                    type="button"
                    onClick={() =>
                      onSaveDraft(
                        previewState.mainPreviewCV,
                        previewState.selectedTemplate?.templateId || userTemplate
                      )
                    }
                    className="bg-[#1a73e8] hover:bg-[#1760c4] text-white"
                    disabled={!!loading}
                  >
                    Save as Draft
                  </Button>
                )}
                {onPublish && (
                  <Button
                    type="button"
                    onClick={() =>
                      onPublish(
                        previewState.mainPreviewCV,
                        previewState.selectedTemplate?.templateId || userTemplate
                      )
                    }
                    className="bg-[#10b981] hover:bg-[#059669] text-white"
                    disabled={!!loading}
                  >
                    Publish
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={exportAsPdf}
                  className="ml-auto bg-[#f59e42] hover:bg-[#ea580c] text-white"
                  disabled={!!loading}
                >
                  Download PDF
                </Button>
              </div>
            )}
            <div className="h-full rounded-2xl flex flex-col overflow-hidden items-center gap-4 border-2 border-blue-100 dark:border-gray-800">
              {/* Scrollable CV Preview Section with Responsive Scaling */}
              <div
                className="overflow-hidden w-full flex-1 transition-all scale-[0.85] sm:scale-[0.95] md:scale-100 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950"
                style={{
                  maxWidth: "850px",
                  aspectRatio: "0.707",
                  background: "white",
                  fontFamily: previewState.selectedFont,
                  boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)",
                }}
              >
                <div
                  className="dark:bg-white bg-white w-full h-full overflow-y-auto no-scrollbar"
                  style={{
                    fontFamily: previewState.selectedFont,
                  }}
                  >
                  {previewState.selectedTemplate?.styles ? (
                    <ErrorBoundary fallback={<TemplateErrorFallback />}>
                      <TemplateRenderer
                        template={previewState.selectedTemplate}
                        height={parseInt(previewSize.height)}
                        cvData={demoCVs[1].cv}
                        customColors={previewState.customColors}
                        onTextClick={handleTextClick}
                      />
                    </ErrorBoundary>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      {TRANSLATIONS.noTemplates}
                    </span>
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
          type="button"
          className="rounded-full p-3 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 animate-bounce"
          onClick={() =>
            dispatch({ type: "SET_SHOW_MOBILE_PREVIEW", payload: true })
          }
        >
          <LayoutTemplate size={20} />
        </Button>
      </div>

      {/* Mobile Preview */}
      {previewState.showMobilePreview && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              {TRANSLATIONS.customizationPanel}
            </h2>
            <Button
              type="button"
              onClick={() =>
                dispatch({ type: "SET_SHOW_MOBILE_PREVIEW", payload: false })
              }
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
                  type="button"
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-200
                    ${selectedTab === tab
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                      : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                    }`}
                >
                  {tabIcons[tab]}
                  {TRANSLATIONS[tab.toLowerCase() as keyof typeof TRANSLATIONS]}
                </Button>
              ))}
            </div>

            {/* Color and Font Controls */}
            <div className="flex flex-col gap-3 my-2 px-2">
              <div>
                <span className="block text-xs font-semibold mb-1">
                  {TRANSLATIONS.accentColor}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {UNSTYME_COLORS.map((color) => (
                    <ColorSwatch
                      key={color.value}
                      color={color.value}
                      selected={previewState.selectedColor === color.value}
                      onClick={() =>
                        dispatch({
                          type: "SET_SELECTED_COLOR",
                          payload: color.value,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-xs font-semibold mb-1">
                  {TRANSLATIONS.fontFamily}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {UNSTYME_FONTS.map((font) => (
                    <FontOption
                      key={font.value}
                      font={font}
                      selected={previewState.selectedFont === font.value}
                      onClick={() =>
                        dispatch({
                          type: "SET_SELECTED_FONT",
                          payload: font.value,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {selectedTab === "Customize" && (
              <>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {demoCVs.map(({ title, cv }, idx) => (
                    <Button
                      key={title + idx}
                      type="button"
                      onClick={() => {
                        dispatch({ type: "SET_DEMO_CV_INDEX", payload: idx });
                        handleCVSelect(cv);
                      }}
                      className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-150
                        ${previewState.mainPreviewCV === cv
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                          : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                        }`}
                    >
                      {title}
                    </Button>
                  ))}
                </div>
                <div className="w-full">
                  <div className={mobileTemplateGrid}>
                    {demoCVs.map(({ title, cv }, idx) => (
                      <Button
                        key={title + idx}
                        type="button"
                        onClick={() => {
                          dispatch({
                            type: "SET_DEMO_CV_INDEX",
                            payload: idx,
                          });
                          handleCVSelect(cv);
                        }}
                        className={`flex flex-col items-center min-w-[140px] max-w-[180px] px-4 py-3 text-center border rounded transition-all ${previewState.mainPreviewCV === cv
                            ? "bg-blue-100 border-blue-500 dark:bg-blue-900"
                            : "bg-white border-gray-200 dark:bg-gray-800"
                          }`}
                        style={{ flex: "0 0 auto" }}
                      >
                        <span className="truncate">{title}</span>
                        {previewState.mainPreviewCV === cv && (
                          <Check className="text-blue-600 mt-1" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedTab === "Templates" && (
              <>
                <div className="flex gap-2 justify-center flex-wrap mb-2">
                  {(Object.keys(groupedTemplates) as (keyof GroupedTemplates)[]).map((group) => (
                    <Button
                      key={group}
                      type="button"
                      onClick={() => {
                        dispatch({ type: "SET_TEMPLATE_GROUP", payload: group });
                        // When switching group, try to select userTemplate if present
                        const groupTemplates = groupedTemplates[group] || [];
                        const found = groupTemplates.find(
                          (tpl) => tpl.templateId === userTemplate
                        );
                        if (found) {
                          handleTemplateSelect(found);
                        } else if (groupTemplates.length > 0) {
                          dispatch({
                            type: "SET_SELECTED_TEMPLATE",
                            payload: groupTemplates[0],
                          });
                        }
                      }}
                      className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-150
                        ${previewState.selectedTemplateGroup === group
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                          : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                        }`}
                    >
                      {group}
                    </Button>
                  ))}
                </div>
                <div className="w-full">
                  <div className={mobileTemplateGrid}>
                    {currentTemplates.map((tpl: TemplateMeta, index: number) => {
                      const isUserTemplate = tpl.templateId === userTemplate;
                      const isSelected =
                        previewState.selectedTemplate?.templateId ===
                        tpl.templateId;
                      const cardCV = demoCVs[previewState.demoCVIndex].cv;
                      return (
                        <TemplateCard
                          key={tpl?.templateId || tpl?.templateName || index}
                          tpl={tpl}
                          isSelected={isSelected}
                          isUserTemplate={isUserTemplate}
                          onClick={() => {
                            handleTemplateSelect(tpl);
                          }}
                          selectedCV={cardCV}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedTab === "Layout" && (
              <div className="flex flex-col items-center gap-4">
                <span className="mb-2 text-sm font-medium">
                  {TRANSLATIONS.selectCVLayout}
                </span>
                <div className="relative w-full layout-dropdown">
                  <Button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "SET_LAYOUT_DROPDOWN",
                        payload: !previewState.layoutDropdown,
                      })
                    }
                    className="w-full flex justify-between px-4 py-2 border rounded-lg font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900"
                  >
                    {previewState.selectedLayout} <ChevronDown size={18} />
                  </Button>
                  {previewState.layoutDropdown && (
                    <ul className="absolute w-full mt-1 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-blue-100 dark:border-gray-800">
                      {Object.keys(layoutSizeMap).map((layout) => (
                        <li
                          key={layout}
                          className={`px-4 py-2 flex justify-between cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-all duration-100 ${previewState.selectedLayout === layout
                              ? "bg-blue-500 text-white"
                              : ""
                            }`}
                          onClick={() => {
                            dispatch({
                              type: "SET_LAYOUT",
                              payload: layout as "A4" | "Letter" | "Legal",
                            });
                            dispatch({
                              type: "SET_LAYOUT_DROPDOWN",
                              payload: false,
                            });
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

export default PreviewEditor;