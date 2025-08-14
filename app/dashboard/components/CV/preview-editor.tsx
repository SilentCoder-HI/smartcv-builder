"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import TemplateRenderer from "@/components/TemplateRenderer";
import { templates } from "@/data/TempleteIndex";
import { CVData } from "@/types/cv-types";
import { FaCheck as Check, FaTimes, FaSave } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChevronDown, LayoutTemplate, Sparkles, Palette, Monitor, ChevronUp } from "lucide-react";
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
    Corporate: templates.filter((t) => t.templateType === "corporate" && t.styles),
};

const layoutSizeMap: Record<string, { width: string; height: string }> = {
    A4: { width: "210mm", height: "297mm" },
    Letter: { width: "216mm", height: "279mm" },
    Legal: { width: "216mm", height: "356mm" },
};

interface PreviewEditorProps {
    UserCV: CVData;
    onCVChange?: (cv: CVData) => void;
    initialTemplateGroup?: string;
    userTemplate: string; // This is a string, should match templateId
    initialLayout?: "A4" | "Letter" | "Legal";
}

// Move all component definitions outside PreviewEditor to avoid conditional hook calls
const ColorSwatch = ({ color, selected, onClick }: { color: string, selected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-8 h-8 rounded-full border-2 transition-all duration-150 flex items-center justify-center
            ${selected ? "border-blue-500 ring-2 ring-blue-300 scale-110 shadow-lg" : "border-gray-200 hover:scale-105"}
        `}
        style={{ backgroundColor: color }}
        aria-label={color}
    >
        {selected && <Check className="text-white drop-shadow" size={16} />}
    </button>
);

const FontOption = ({ font, selected, onClick }: { font: typeof UNSTYME_FONTS[0], selected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
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
    tpl: TemplateMeta,
    isSelected: boolean,
    isUserTemplate: boolean,
    onClick: () => void,
    selectedCV: CVData,
}) => (
    <div
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
        title={isUserTemplate ? "Your selected template" : undefined}
    >
        <div className="w-full h-56 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center mb-2 border select-none pointer-events-none shadow-inner">
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
);

const TabSwitcher = ({
    selectedTab,
    setSelectedTab,
    tabIcons,
    setToastOpen,
}: {
    selectedTab: "Templates" | "Layout" | "Customize",
    setSelectedTab: (tab: "Templates" | "Layout" | "Customize") => void,
    tabIcons: Record<string, any>,
    setToastOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => (
    <div className="flex justify-center my-5 gap-2 relative">
        {(["Templates", "Customize", "Layout"] as const).map((tab) => (
            <Button
                key={tab}
                onClick={() => setSelectedTab(tab)}
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
                {tab}
                {selectedTab === tab && (
                    <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                )}
            </Button>
        ))}
        <div className="relative flex items-center gap-2">
            <Button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-800 dark:to-gray-700 hover:bg-blue-600 hover:text-white transition"
                onClick={() => setToastOpen((prev) => !prev)}
                title="More options"
                type="button"
            >
                <span className="text-2xl font-bold">+</span>
            </Button>
        </div>
    </div>
);

const PreviewEditor = ({
    UserCV,
    onCVChange,
    userTemplate,
    initialTemplateGroup = "All",
    initialLayout = "A4",
}: PreviewEditorProps) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [editingField, setEditingField] = useState<{ path: string, value: string } | null>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const [selectedTab, setSelectedTab] = useState<"Templates" | "Layout" | "Customize">("Templates");
    const [selectedTemplateGroup, setSelectedTemplateGroup] = useState(initialTemplateGroup);
    const [selectedLayout, setSelectedLayout] = useState<"A4" | "Letter" | "Legal">(initialLayout);
    const [layoutDropdown, setLayoutDropdown] = useState(false);
    const [showMobilePreview, setShowMobilePreview] = useState(false);

    // Color and Font state
    const [selectedColor, setSelectedColor] = useState(UNSTYME_COLORS[0].value);
    const [selectedFont, setSelectedFont] = useState(UNSTYME_FONTS[0].value);

    const tabIcons: Record<string, any> = useMemo(() => ({
        Templates: <Sparkles className={`w-4 h-4 mr-1 ${selectedTab === "Templates" ? "text-blue-100" : "text-blue-500"}`} />,
        Customize: <Palette className={`w-4 h-4 mr-1 ${selectedTab === "Customize" ? "text-pink-100" : "text-pink-500"}`} />,
        Layout: <Monitor className={`w-4 h-4 mr-1 ${selectedTab === "Layout" ? "text-amber-100" : "text-amber-500"}`} />,
    }), [selectedTab]);

    // CV state
    const [selectedCV, setSelectedCV] = useState<CVData>(UserCV);

    // Find the template that matches userTemplate (by templateId)
    const allTemplates: TemplateMeta[] = useMemo(() => templates.filter((t) => t.styles), []);
    const userTemplateObj = useMemo(() => allTemplates.find(
        (tpl) => tpl.templateId === userTemplate
    ), [allTemplates, userTemplate]);

    // If userTemplate is not found, fallback to first template in group
    const initialTemplate = useMemo(() =>
        userTemplateObj ||
        (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup]?.[0]
    , [userTemplateObj, selectedTemplateGroup]);

    const [selectedTemplate, setSelectedTemplate] = useState<TemplateMeta | undefined>(initialTemplate);

    // When template group changes, update selectedTemplate to userTemplate if present in group, else first in group
    useEffect(() => {
        const groupTemplates = (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup] || [];
        const found = groupTemplates.find((tpl) => tpl.templateId === userTemplate);
        if (found) {
            setSelectedTemplate(found);
        } else if (groupTemplates.length > 0) {
            setSelectedTemplate(groupTemplates[0]);
        } else {
            setSelectedTemplate(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTemplateGroup, userTemplate]);

    // When userTemplate prop changes, update selectedTemplate if needed
    useEffect(() => {
        if (!selectedTemplate || selectedTemplate.templateId !== userTemplate) {
            const found = allTemplates.find((tpl) => tpl.templateId === userTemplate);
            if (found) setSelectedTemplate(found);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTemplate]);

    const previewSize = layoutSizeMap[selectedLayout];
    const currentTemplates = useMemo(() =>
        (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup] || []
    , [selectedTemplateGroup]);

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
    const handleTemplateSelect = useCallback((tpl: TemplateMeta) => {
        setSelectedTemplate(tpl);
    }, []);

    // Handle CV change
    const handleCVSelect = useCallback((cv: CVData) => {
        setSelectedCV(JSON.parse(JSON.stringify(cv))); // Deep copy
    }, []);

    // Handle text editing
    const handleTextClick = useCallback((path: string, value: string) => {
        setEditingField({ path, value });
        setSelectedTab("Customize");
    }, []);

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

    // --- UI/UX ENHANCEMENTS ---

    // --- END UI/UX ENHANCEMENTS ---

    return (
        <div className="w-full h-full max-h-screen overflow-hidden dark:bg-gradient-to-br dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white mx-auto space-y-8 my-5">
            {/* Toast Notification */}
            {toastOpen && (
                <Toast
                    message="Please log in to unlock full customization tools and extra templates."
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
                                setToastOpen={setToastOpen}
                            />

                            {/* Tab Content */}
                            <div className="space-y-4 flex-1 min-h-0 overflow-y-auto no-scrollbar">
                                {/* Customize Tab */}
                                {selectedTab === "Customize" && (
                                    <div className="flex flex-col gap-8 mt-6 relative">
                                        <button
                                            className="absolute right-0 top-0 z-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded text-xs font-semibold shadow transition-all duration-200"
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
                                                <div className="top-0 left-0 right-0 bg-white dark:bg-gray-950 py-3 shadow-lg z-50 flex items-center gap-2 rounded-lg border border-blue-100 dark:border-gray-800">
                                                    <input
                                                        ref={editInputRef}
                                                        type="text"
                                                        value={editingField.value}
                                                        onChange={handleEditChange}
                                                        onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                                                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-400"
                                                    />
                                                    <Button onClick={handleEditSave} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
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
                                                        className={`text-xs rounded-full px-4 py-2 font-medium transition-all duration-150
                                                            ${selectedCV === cv
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
                                            {Object.keys(customColors).map((key) => (
                                                <div key={key} className="flex flex-col gap-2 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 p-3 rounded-lg shadow-sm">
                                                    <label
                                                        htmlFor={key}
                                                        className="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize"
                                                    >
                                                        {key.replace(/([A-Z])/g, " $1")}
                                                    </label>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {["#1E293B", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                                                            <ColorSwatch
                                                                key={color}
                                                                color={color}
                                                                selected={customColors[key as keyof typeof customColors] === color}
                                                                onClick={() =>
                                                                    setCustomColors((prev) => ({
                                                                        ...prev,
                                                                        [key]: color,
                                                                    }))
                                                                }
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
                                        {/* Font Customization */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                Font Family
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {UNSTYME_FONTS.map((font) => (
                                                    <FontOption
                                                        key={font.value}
                                                        font={font}
                                                        selected={selectedFont === font.value}
                                                        onClick={() => setSelectedFont(font.value)}
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
                                            {Object.keys(groupedTemplates).map((group) => (
                                                <Button
                                                    key={group}
                                                    onClick={() => {
                                                        setSelectedTemplateGroup(group);
                                                        // When switching group, try to select userTemplate if present
                                                        const groupTemplates = (groupedTemplates as Record<string, TemplateMeta[]>)[group] || [];
                                                        const found = groupTemplates.find((tpl) => tpl.templateId === userTemplate);
                                                        if (found) {
                                                            handleTemplateSelect(found);
                                                        } else if (groupTemplates.length > 0) {
                                                            handleTemplateSelect(groupTemplates[0]);
                                                        }
                                                    }}
                                                    className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-150
                                                        ${selectedTemplateGroup === group
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
                                                        No templates available in this group.
                                                    </div>
                                                ) : (
                                                    currentTemplates.map((tpl: any, index: number) => {
                                                        // Highlight if this template matches userTemplate
                                                        const isUserTemplate = tpl.templateId === userTemplate;
                                                        const isSelected = selectedTemplate?.templateId === tpl.templateId;
                                                        return (
                                                            <TemplateCard
                                                                key={tpl?.id || tpl?.templateName || index}
                                                                tpl={tpl}
                                                                isSelected={isSelected}
                                                                isUserTemplate={isUserTemplate}
                                                                onClick={() => handleTemplateSelect(tpl)}
                                                                selectedCV={selectedCV}
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
                                        <span className="mb-2 text-sm font-medium">Select CV Layout</span>
                                        <div className="w-full relative">
                                            <Button
                                                onClick={() => setLayoutDropdown(!layoutDropdown)}
                                                className="w-full flex justify-between px-4 py-2 border rounded-lg font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900"
                                            >
                                                {selectedLayout} {!layoutDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </Button>
                                            {layoutDropdown && (
                                                <ul className="left-0 top-full w-full mt-1 z-[9999] bg-white-600 dark:bg-gray-900 shadow-2xl rounded-lg border border-blue-100 dark:border-gray-800"
                                                    style={{
                                                        boxShadow: "0 8px 32px 0 rgba(59,130,246,0.20)",
                                                        minWidth: "180px"
                                                    }}
                                                >
                                                    {Object.keys(layoutSizeMap).map((layout) => (
                                                        <li
                                                            key={layout}
                                                            className={`px-4 py-2 flex justify-between cursor-pointer hover:bg-blue-800 hover:text-white dark:hover:bg-blue-900 rounded transition-all duration-100 ${selectedLayout === layout ? "bg-blue-500 text-white" : ""
                                                                }`}
                                                            onClick={() => {
                                                                setSelectedLayout(layout as "A4" | "Letter" | "Legal");
                                                                setLayoutDropdown(!layoutDropdown);
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
                        <div className="h-full rounded-2xl flex flex-col overflow-hidden items-center gap-4 border-2 border-blue-100 dark:border-gray-800">
                            {/* Scrollable CV Preview Section with Responsive Scaling */}
                            <div
                                className="overflow-hidden w-full flex-1 transition-all scale-[0.85] sm:scale-[0.95] md:scale-100 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950"
                                style={{
                                    maxWidth: "850px",
                                    aspectRatio: "0.707",
                                    background: "white",
                                    fontFamily: previewFontFamily,
                                    boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)",
                                }}
                            >
                                <div
                                    className="dark:bg-white bg-white w-full h-full overflow-y-auto no-scrollbar"
                                    style={{
                                        fontFamily: previewFontFamily,
                                    }}
                                >
                                    {selectedTemplate?.styles && (
                                        <TemplateRenderer
                                            template={selectedTemplate}
                                            height={Number(previewSize.height)}
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
                    className="rounded-full p-3 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 animate-bounce"
                    onClick={() => setShowMobilePreview(true)}
                >
                    <LayoutTemplate size={20} />
                </Button>
            </div>

            {/* Mobile Preview */}
            {showMobilePreview && (
                <div className="fixed inset-0 z-50 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-500" />
                            Customization Panel
                        </h2>
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
                                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-200
                                        ${selectedTab === tab
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                                            : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                                        }`}
                                >
                                    {tabIcons[tab]}
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
                                        <ColorSwatch
                                            key={color.value}
                                            color={color.value}
                                            selected={selectedColor === color.value}
                                            onClick={() => setSelectedColor(color.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold mb-1">Font</span>
                                <div className="flex gap-2 flex-wrap">
                                    {UNSTYME_FONTS.map((font) => (
                                        <FontOption
                                            key={font.value}
                                            font={font}
                                            selected={selectedFont === font.value}
                                            onClick={() => setSelectedFont(font.value)}
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
                                            onClick={() => handleCVSelect(cv)}
                                            className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-150
                                                ${selectedCV === cv
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                                                    : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
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
                                                // When switching group, try to select userTemplate if present
                                                const groupTemplates = (groupedTemplates as Record<string, TemplateMeta[]>)[group] || [];
                                                const found = groupTemplates.find((tpl) => tpl.templateId === userTemplate);
                                                if (found) {
                                                    handleTemplateSelect(found);
                                                } else if (groupTemplates.length > 0) {
                                                    handleTemplateSelect(groupTemplates[0]);
                                                }
                                            }}
                                            className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-150
                                                ${selectedTemplateGroup === group
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                                                    : "bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100"
                                                }`}
                                        >
                                            {group}
                                        </Button>
                                    ))}
                                </div>
                                <div className="w-full overflow-x-auto">
                                    <div className="flex flex-wrap gap-2 px-2 w-full">
                                        {currentTemplates.map((tpl: any, index: number) => {
                                            const isUserTemplate = tpl.templateId === userTemplate;
                                            const isSelected = selectedTemplate?.templateId === tpl.templateId;
                                            return (
                                                <TemplateCard
                                                    key={tpl?.id || tpl?.templateName || index}
                                                    tpl={tpl}
                                                    isSelected={isSelected}
                                                    isUserTemplate={isUserTemplate}
                                                    onClick={() => handleTemplateSelect(tpl)}
                                                    selectedCV={selectedCV}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedTab === "Layout" && (
                            <div className="flex flex-col items-center gap-4">
                                <span className="mb-2 text-sm font-medium">Select CV Layout</span>
                                <div className="relative w-full">
                                    <Button
                                        onClick={() => setLayoutDropdown(!layoutDropdown)}
                                        className="w-full flex justify-between px-4 py-2 border rounded-lg font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900"
                                    >
                                        {selectedLayout} <ChevronDown size={18} />
                                    </Button>
                                    {layoutDropdown && (
                                        <ul className="absolute w-full mt-1 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-blue-100 dark:border-gray-800">
                                            {Object.keys(layoutSizeMap).map((layout) => (
                                                <li
                                                    key={layout}
                                                    className={`px-4 py-2 flex justify-between cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-all duration-100 ${selectedLayout === layout ? "bg-blue-500 text-white" : ""
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedLayout(layout as "A4" | "Letter" | "Legal");
                                                        setLayoutDropdown(!layoutDropdown);
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