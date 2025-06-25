"use client";

import type { CVData } from "@/types/cv-types";

// Classic
import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack";
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue";

// Corporate
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern";
import { CorporateFormal } from "@/components/cv-templates/Corporate/CorporateFormal";

// Creative
import { CreativeColorful } from "@/components/cv-templates/Creative/CreativeColorful";
import { CreativePortfolio } from "@/components/cv-templates/Creative/CreativePortfolio";

// Elegant
import { ElegantContrast } from "@/components/cv-templates/Elegant/ElegantContrast";
import { ElegantSerif } from "@/components/cv-templates/Elegant/ElegantSerif";

// Minimal
import MinimalSerif from "@/components/cv-templates/Minimal/MinimalSerif";
import MinimalWhite from "@/components/cv-templates/Minimal/MinimalWhite";

// Modern
import ModernGrid from "@/components/cv-templates/Modern/ModernGrid";
import ModernDark from "@/components/cv-templates/Modern/ModernDark";
import ModernLight from "@/components/cv-templates/Modern/ModernLight";
import { FC } from "react";

const templates: Record<string, React.FC<{ data: CVData; isPreview: boolean }>> = {
    "classic-black": ClassicBlack,
    "classic-blue": ClassicBlue,
    "corporate-modern": CorporateModern,
    "corporate-formal": CorporateFormal,
    "creative-colorful": CreativeColorful,
    "creative-portfolio": CreativePortfolio,
    "elegant-contrast": ElegantContrast,
    "elegant-serif": ElegantSerif,
    "minimal-serif": MinimalSerif,
    "minimal-white": MinimalWhite,
    "modern-grid": ModernGrid,
    "modern-dark": ModernDark,
    "modern-light": ModernLight,
};

interface TemplatePreviewProps {
    selectedTemplate:  string;
    cvData: CVData;
}

export default function TemplatePreview({ selectedTemplate, cvData }: TemplatePreviewProps) {
    const STemplate = templates[selectedTemplate];


    if (!STemplate) {
        return (
            <div className="text-center text-red-500 font-semibold">
                ⚠️ Template not found. Please select a valid template.
            </div>
        );
    }

    return (
        <div className="h-96 w-full overflow-hidden bg-white border-b">
            <div className="scale-[0.3] w-[333%] h-[444%] origin-top-left aspect-">
                <STemplate data={cvData} isPreview={true} />
            </div>
        </div>
    );
}
