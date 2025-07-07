"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowLeft,
  Download,
  FileText,
  Share2,
  CheckCircle,
  X,
} from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { CVData } from "@/types/cv-types"

import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack"
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue"
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern"
import { CorporateFormal } from "@/components/cv-templates/Corporate/CorporateFormal"
import { CreativeColorful } from "@/components/cv-templates/Creative/CreativeColorful"
import { CreativePortfolio } from "@/components/cv-templates/Creative/CreativePortfolio"
import { ElegantContrast } from "@/components/cv-templates/Elegant/ElegantContrast"
import { ElegantSerif } from "@/components/cv-templates/Elegant/ElegantSerif"
import MinimalSerif from "@/components/cv-templates/Minimal/MinimalSerif"
import MinimalWhite from "@/components/cv-templates/Minimal/MinimalWhite"
import ModernGrid from "@/components/cv-templates/Modern/ModernGrid"
import ModernDark from "@/components/cv-templates/Modern/ModernDark"
import ModernLight from "@/components/cv-templates/Modern/ModernLight"

interface ExportOptionsProps {
  cvData: CVData
  selectedTemplate: string
  onPrev: () => void
  isBuilderMode?: boolean
  setSelectedTemplate: (template: string) => void
}

const templates = {
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
}

export function ExportOptions({
  cvData,
  selectedTemplate,
  onPrev,
  isBuilderMode = false,
  setSelectedTemplate,
}: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState<null | "pdf" | "docx">(null)
  const [exportComplete, setExportComplete] = useState(false)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const TemplateComponent =
    templates[selectedTemplate as keyof typeof templates] || templates["classic-black"]

  const exportViaAPI = async (type: "pdf" | "docx") => {
    const html = previewRef.current?.outerHTML;
    if (!html) return;

    setIsExporting(type);

    const res = await fetch("/api/export", {
      method: "POST",
      body: JSON.stringify({ html, type }),
      headers: { "Content-Type": "application/json" },
    });

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "My_CV_Resume.pdf";
    link.click();

    setExportComplete(true);
    setIsExporting(null);
  };


  const exportToWord = () => exportViaAPI("docx")
  const exportPDF = () => exportViaAPI("pdf")

  const shareResume = async () => {
    try {
      const response = await fetch("/api/share-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, template: selectedTemplate }),
      })

      if (response.ok) {
        const { shareUrl } = await response.json()
        await navigator.clipboard.writeText(shareUrl)
      } else {
        throw new Error("Share failed")
      }
    } catch (error) {
      console.error("Error sharing resume:", error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {showFullPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-auto">
          <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowFullPreview(false)}
              className="absolute top-4 right-4 z-50 bg-red-500 hover:bg-red-600 rounded-full p-2 text-white"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="origin-top-left h-fit relative"
              style={{
                width: "794px", // A4 width at 72 DPI
                minHeight: "1123px", // A4 height at 72 DPI
                padding: "40px", // margin inside page
                boxSizing: "border-box",
              }}
              ref={previewRef}>

              <TemplateComponent data={cvData} />
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Your Resume</h1>
        <p className="text-gray-600">Download your professional resume or share it online</p>
      </div>

      {!isBuilderMode && (
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <p className="text-gray-700 text-sm">Want to use this template?</p>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setSelectedTemplate(selectedTemplate)}
            >
              Use This Template
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-8 w-full">
        <div className="space-y-6">
          {exportComplete && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center text-green-800">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  <div>
                    <h3 className="font-semibold">Export Successful!</h3>
                    <p className="text-sm">Your resume has been downloaded successfully.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={exportPDF}
                disabled={isExporting !== null}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                {isExporting === "pdf" ? "Generating PDF..." : "Download as PDF"}
              </Button>

              <Button
                onClick={exportToWord}
                disabled={true}
                variant="outline"
                className="w-full bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Coming Soon: Word Export
              </Button>

              {isBuilderMode && (
                <div className="border-t pt-4">
                  <Button onClick={shareResume} variant="outline" className="w-full" size="lg">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Online Link
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Create a shareable link to your resume
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tailor your resume to each job application</li>
                <li>• Use keywords from the job description</li>
                <li>• Keep it clear and relevant</li>
                <li>• Proofread for grammar and spelling</li>
                <li>• Save in both PDF and Word formats</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-center">Final Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <div className="relative group rounded-lg overflow-hidden h-full bg-white border">
                <div className="absolute inset-0 scale-75 origin-top-left w-[133%] pointer-events-none transition-all duration-300" ref={previewRef}>
                  <TemplateComponent data={cvData} />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg" />
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowFullPreview(true)}
                    className="shadow-md"
                  >
                    Preview Fullscreen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isBuilderMode && (
        <div className="flex justify-between">
          <Button onClick={onPrev} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Preview
          </Button>
          <div className="flex space-x-4">
            <Button
              onClick={exportPDF}
              disabled={isExporting === "pdf"}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
