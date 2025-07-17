"use client";

import { useState } from "react";
import TemplateRenderer from "@/components/TemplateRenderer";
import { templates } from "@/data/TempleteIndex";
import { CVData } from "@/types/cv-types";
import { FaCheck as Check, FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { TemplateMeta } from "@/types/template-types";
import { Toast } from "@/components/Toast";

// Only import one CV from each type
import { frontendDeveloperCV } from "@/data/demoCVS/developer/developer-demo-cvs";
import { marketingManagerCV } from "@/data/demoCVS/business/business-demo-cvs";
import { researchScientistCV } from "@/data/demoCVS/academic/academic-cvs";
import { graphicDesignerCV } from "@/data/demoCVS/creative/creative-cvs";
import { registeredNurseCV } from "@/data/demoCVS/medical/medical-cvs";

// UNSTYME: Color and Font System
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

// Array of demo CVs, one from each type
const demoCVs: { title: string; cv: CVData }[] = [
    { title: "Frontend Developer", cv: frontendDeveloperCV },
    { title: "Marketing Manager", cv: marketingManagerCV },
    { title: "Research Scientist", cv: researchScientistCV },
    { title: "Graphic Designer", cv: graphicDesignerCV },
    { title: "Registered Nurse", cv: registeredNurseCV },
];

// Helper to get a random CV
function getRandomCV() {
    const idx = Math.floor(Math.random() * demoCVs.length);
    return demoCVs[idx].cv;
}

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
    const [selectedTab, setSelectedTab] = useState<"Templates" | "Layout" | "Customize">("Templates");
    const [selectedTemplateGroup, setSelectedTemplateGroup] = useState("All");
    const [selectedLayout, setSelectedLayout] = useState<"A4" | "Letter" | "Legal">("A4");
    const [layoutDropdown, setLayoutDropdown] = useState(false);
    const [showMobilePreview, setShowMobilePreview] = useState(false);

    // UNSTYME: Color and Font state
    const [selectedColor, setSelectedColor] = useState(UNSTYME_COLORS[0].value);
    const [selectedFont, setSelectedFont] = useState(UNSTYME_FONTS[0].value);

    // Random CV for each template
    const [selectedCV, setSelectedCV] = useState<CVData>(getRandomCV());
    const initialTemplate = (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup]?.[0];
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateMeta | undefined>(initialTemplate);

    const previewSize = layoutSizeMap[selectedLayout];
    const currentTemplates = (groupedTemplates as Record<string, TemplateMeta[]>)[selectedTemplateGroup] || [];

    const [toastOpen, setToastOpen] = useState(false);

    // UNSTYME: Font family for preview
    const previewFontFamily = selectedFont;

    // UNSTYME: Color system for preview
    const previewAccentColor = selectedColor;
    const [customColors, setCustomColors] = useState({
        mainHeadingColor: "",
        secmainHeadingColor: "",
        secsubHeadingColor: "",
        textColor: "",
        backgroundColor: "",
        skillItemBg: "",
    });

    // When template changes, pick a new random CV
    function handleTemplateSelect(tpl: TemplateMeta) {
        setSelectedTemplate(tpl);
        setSelectedCV(getRandomCV());
    }

    return (
        <div className="w-full dark:bg-gray-950 text-gray-900 dark:text-white">
            {/* Radix Toast */}
            {/* Use custom Toast component */}
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
                    <Button
                        onClick={() => setShowMobilePreview((prev) => !prev)}
                        className="text-2xl p-4"
                    >
                        <FaBars className="text-lg" />
                    </Button>
                </div>
                <div className="flex flex-row gap-4 overflow-hidden">
                    {/* Sidebar Section */}
                    <div className="w-full hidden lg:block">
                        <div
                            className="transition-colors overflow-y-auto overflow-x-hidden scrollbar-hide"
                            style={{
                                maxHeight: `calc(100vh - 120px)`, // adjust for header + margin
                                msOverflowStyle: "none", // IE and Edge
                                scrollbarWidth: "none", // Firefox
                            }}
                        >
                            {/* Tab Switcher */}
                            <div className="flex justify-center my-5 gap-2">
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
                                <div className="relative flex items-center">
                                    <Button
                                        className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition"
                                        onClick={() => setToastOpen((prev) => !prev)}
                                        title="More options"
                                        type="button"
                                    >
                                        <span className="text-2xl font-bold">+</span>
                                    </Button>
                                </div>
                            </div>

                            {/* UNSTYME: Color and Font Controls */}

                            {/* Tab Content */}
                            <div className="space-y-4">
                                {/* CVs Tab */}
                                {selectedTab === "Customize" && (
                                    <div className="flex flex-col gap-6 mt-6 relative">
                                        {/* Absolute Reset Button */}
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
                                        {Object.keys(customColors).map((key) => (
                                            <div key={key} className="flex flex-col gap-2">
                                                <label
                                                    htmlFor={key}
                                                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize"
                                                >
                                                    {key.replace(/([A-Z])/g, " $1")}
                                                </label>

                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {/* Preset Color Buttons */}
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
                                                    {/* Color Picker Input */}
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
                                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
                                                            <span className="text-gray-400 text-xs select-none pointer-events-none">No preview available</span>
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
                    <div className="w-full">
                        <div
                            className="transition-colors overflow-y-auto overflow-hidden rounded border"
                            style={{
                                maxHeight: `calc(100vh - 120px)`, // adjust for header + margin
                                width: previewSize.width,
                                boxShadow: "0 0 0 1px #e5e7eb",
                                background: "white",
                                fontFamily: previewFontFamily,
                            }}
                        >
                            <div
                                style={{
                                    width: previewSize.width,
                                    height: previewSize.height,
                                    fontFamily: previewFontFamily,
                                }}
                                className="dark:bg-white bg-white"
                            >
                                {selectedTemplate?.styles && (
                                    <TemplateRenderer
                                        template={selectedTemplate}
                                        cvData={selectedCV}
                                        customColors={customColors}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Mobile Preview Toggle */}
            <div className="lg:hidden fixed bottom-4 left-4 z-50">
                <Button
                    className="rounded-full p-3 shadow-lg bg-blue-600 text-white"
                    onClick={() => setShowMobilePreview(true)}
                >
                    <LayoutTemplate size={20} />
                </Button>
            </div>

            {/* Mobile Preview */}
            {showMobilePreview && (
                <div className="w-full fixed bottom-4 left-4 z-50 bg-gray-950 h-96 py-5">
                    <div
                        className="transition-colors overflow-hidden scrollbar-hide"
                        style={{
                            maxHeight: `calc(100vh - 120px)`, // adjust for header + margin
                            msOverflowStyle: "none", // IE and Edge
                            scrollbarWidth: "none", // Firefox
                        }}
                    >
                        {/* Tab Switcher */}
                        <div className="flex justify-center gap-2 mb-2">
                            {(["Customize", "Templates", "Layout"] as const).map((tab) => (
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

                        {/* UNSTYME: Color and Font Controls (Mobile) */}
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
                                    onChange={e => setSelectedFont(e.target.value)}
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
                        <div className="space-y-4">
                            {/* CVs Tab */}
                            {selectedTab === "Customize" && (
                                <>
                                    <div className="flex gap-2 flex-wrap justify-center mb-2">
                                        {/* Only show the available demo CVs */}
                                        {demoCVs.map(({ title, cv }, idx) => (
                                            <Button
                                                key={title + idx}
                                                onClick={() => setSelectedCV(cv)}
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
                                                    onClick={() => setSelectedCV(cv)}
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

                            {/* Templates Tab */}
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
                                        <div className="flex gap-3 px-2" style={{ minWidth: "max-content" }}>
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
                                                            <span className="text-gray-400 text-xs select-none pointer-events-none">No preview</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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
            )}
        </div>
    );
};

export default DemoPage;
