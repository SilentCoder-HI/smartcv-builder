"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, Share2, CheckCircle } from "lucide-react"
import type { CVData } from "@/types/cv-types"
import { CVTemplateModern } from "@/components/cv-templates/modern"
import { CVTemplateMinimal } from "@/components/cv-templates/minimal"
import { CVTemplateClassic } from "@/components/cv-templates/classic"
import { useState } from "react"

interface ExportOptionsProps {
  cvData: CVData
  selectedTemplate: string
  onPrev: () => void
}

const templates = {
  modern: CVTemplateModern,
  minimal: CVTemplateMinimal,
  classic: CVTemplateClassic,
}

export function ExportOptions({ cvData, selectedTemplate, onPrev }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const TemplateComponent = templates[selectedTemplate as keyof typeof templates] || CVTemplateModern

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      // Create a temporary div to render the CV
      const tempDiv = document.createElement("div")
      tempDiv.style.position = "absolute"
      tempDiv.style.left = "-9999px"
      tempDiv.style.width = "210mm" // A4 width
      tempDiv.style.backgroundColor = "white"
      document.body.appendChild(tempDiv)

      // Import html2pdf dynamically
      const html2pdf = (await import("html2pdf.js")).default

      // Render the CV component to the temp div
      const { createRoot } = await import("react-dom/client")
      const root = createRoot(tempDiv)

      await new Promise<void>((resolve) => {
        root.render(
          <div style={{ width: "210mm", minHeight: "297mm", padding: "20mm", backgroundColor: "white" }}>
            <TemplateComponent data={cvData} />
          </div>,
        )
        setTimeout(resolve, 1000) // Wait for render
      })

      // Configure PDF options
      const opt = {
        margin: 0,
        filename: `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }

      // Generate and download PDF
      await html2pdf().set(opt).from(tempDiv).save()

      // Cleanup
      document.body.removeChild(tempDiv)
      setExportComplete(true)
    } catch (error) {
      console.error("Error exporting PDF:", error)
      alert("Error exporting PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const exportToWord = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/export-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvData,
          template: selectedTemplate,
        }),
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvData,
          template: selectedTemplate,
        }),
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
        {/* Export Options */}
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
                <p className="text-xs text-gray-500 mt-2 text-center">Create a shareable link to your resume</p>
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

        {/* Final Preview */}
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

      {/* Navigation */}
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
