"use client"

import { useState } from "react"
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
} from "lucide-react"
import type { CVData } from "@/types/cv-types"

// Templates
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
  scrollRef?: React.RefObject<HTMLDivElement>
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

export function ExportOptions({ cvData, selectedTemplate, onPrev, scrollRef }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const TemplateComponent = templates[selectedTemplate as keyof typeof templates] || templates["classic-black"]

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      // 1. Create hidden container
      const tempDiv = document.createElement("div")
      tempDiv.id = "pdf-container"
      tempDiv.style.position = "absolute"
      tempDiv.style.left = "-9999px"
      tempDiv.style.top = "0"
      tempDiv.style.width = "794px" // A4 size in pixels @ 96dpi
      tempDiv.style.padding = "40px"
      tempDiv.style.backgroundColor = "white"
      document.body.appendChild(tempDiv)
  
      // 2. Render template inside it
      const { createRoot } = await import("react-dom/client")
      const root = createRoot(tempDiv)
  
      await new Promise<void>((resolve) => {
        root.render(
          <div
            id="pdf-content"
            style={{
              width: "794px",              // A4 width at 96 DPI
              minHeight: "1123px",         // A4 height at 96 DPI
              padding: "40px",
              backgroundColor: "#ffffff",  // Ensure white background
              fontFamily: "Arial, sans-serif", // Fallback font
              boxSizing: "border-box",
            }}
          >
            <TemplateComponent data={cvData} />
          </div>
        )
        
        setTimeout(resolve, 1000) // Give React time to render
      })
  
      // 3. Convert to image
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
      })
  
      const imgData = canvas.toDataURL("image/png")
  
      // 4. Create PDF
      const { jsPDF } = await import("jspdf")
      const pdf = new jsPDF("p", "mm", "a4")
  
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
  
      const imgProps = pdf.getImageProperties(imgData)
      const ratio = imgProps.width / imgProps.height
  
      const pdfWidth = pageWidth
      const pdfHeight = pageWidth / ratio
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`)
  
      root.unmount()
      document.body.removeChild(tempDiv)
      setExportComplete(true)
    } catch (err) {
      console.error("Export to PDF failed:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }
  

  const exportToWord = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/export-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, template: selectedTemplate }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.docx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        setExportComplete(true)
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      console.error("Error exporting Word:", error)
      alert("Error exporting Word document. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

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
        alert("Share link copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing resume:", error)
      alert("Error creating share link. Please try again.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Your Resume</h1>
        <p className="text-gray-600">Download your professional resume or share it online</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
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
                onClick={exportToPDF}
                disabled={isExporting}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                {isExporting ? "Generating PDF..." : "Download as PDF"}
              </Button>

              <Button
                onClick={exportToWord}
                disabled={isExporting}
                variant="outline"
                className="w-full bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                {isExporting ? "Generating Word..." : "Download as Word"}
              </Button>

              <div className="border-t pt-4">
                <Button onClick={shareResume} variant="outline" className="w-full" size="lg">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Online Link
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Create a shareable link to your resume
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tailor your resume for each job application</li>
                <li>• Use keywords from the job description</li>
                <li>• Keep it concise and relevant</li>
                <li>• Proofread for spelling and grammar</li>
                <li>• Save in both PDF and Word formats</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Final Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="scale-75 origin-top-left w-[133%] h-[400px] overflow-hidden">
                  <TemplateComponent data={cvData} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Preview
        </Button>
        <div className="flex space-x-4">
          <Button onClick={exportToPDF} disabled={isExporting} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
