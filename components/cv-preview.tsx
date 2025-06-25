"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Edit3, Save, Sparkles, FileText, CheckCircle } from "lucide-react"
import type { CVData } from "@/types/cv-types"
// Classic
import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack"
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue"

// Corporate
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern"
import { CorporateFormal } from "@/components/cv-templates/Corporate/CorporateFormal"

// Creative
import { CreativeColorful } from "@/components/cv-templates/Creative/CreativeColorful"
import { CreativePortfolio } from "@/components/cv-templates/Creative/CreativePortfolio"

// Elegant
import { ElegantContrast } from "@/components/cv-templates/Elegant/ElegantContrast"
import { ElegantSerif } from "@/components/cv-templates/Elegant/ElegantSerif"

// Minimal
import MinimalSerif from "@/components/cv-templates/Minimal/MinimalSerif"
import MinimalWhite from "@/components/cv-templates/Minimal/MinimalWhite"

// Modern
import ModernGrid from "@/components/cv-templates/Modern/ModernGrid"
import ModernDark from "@/components/cv-templates/Modern/ModernDark"
import ModernLight from "@/components/cv-templates/Modern/ModernLight"
import TemplatePreview from "./TemplatePreview"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CVPreviewProps {
  cvData: CVData
  setCvData: (data: CVData) => void
  selectedTemplate: string
  onNext: () => void
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

export function CVPreview({ cvData, setCvData, selectedTemplate, onNext, onPrev, scrollRef }: CVPreviewProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isGeneratingCover, setIsGeneratingCover] = useState(false)
  const [isCheckingATS, setIsCheckingATS] = useState(false)
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [atsRecommendations, setAtsRecommendations] = useState<string[] | null>(null)

  const TemplateComponent = templates[selectedTemplate as keyof typeof templates] || templates["classic-black"]

  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field)
    setEditValue(currentValue)
  }

  const saveEdit = () => {
    if (!editingField) return

    const [section, field, id] = editingField.split(".")

    if (section === "personalInfo") {
      setCvData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          [field]: editValue,
        },
      })
    } else if (section === "experience" && id) {
      setCvData({
        ...cvData,
        experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: editValue } : exp)),
      })
    } else if (section === "education" && id) {
      setCvData({
        ...cvData,
        education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: editValue } : edu)),
      })
    }

    setEditingField(null)
    setEditValue("")
  }

  const cancelEdit = () => {
    setEditingField(null)
    setEditValue("")
  }

  const optimizeWithAI = async () => {
    setIsOptimizing(true)
    try {
      const response = await fetch("/api/optimize-content", {
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
        const optimizedData = await response.json()
        setCvData(optimizedData.optimizedCV)
        alert("Content optimized successfully!")
      }
    } catch (error) {
      console.error("Error optimizing content:", error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const generateCoverLetter = async () => {
    setIsGeneratingCover(true)
    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvData,
          jobDescription: "", // You can add a field for this
          companyName: "", // You can add a field for this
        }),
      })

      if (response.ok) {
        const coverLetter = await response.json()
        // You can display this in a modal or new page
        console.log("Generated cover letter:", coverLetter)
        alert("Cover letter generated! Check the console for now.")
      }
    } catch (error) {
      console.error("Error generating cover letter:", error)
    } finally {
      setIsGeneratingCover(false)
    }
  }

  const checkATS = async () => {
    setIsCheckingATS(true)
    try {
      const response = await fetch("/api/check-ats", {
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
        const atsResults = await response.json()
        setAtsScore(atsResults.score)
        setAtsRecommendations(atsResults.recommendations)
      }
    } catch (error) {
      console.error("Error checking ATS:", error)
    } finally {
      setIsCheckingATS(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Preview & Customize</h1>
        <p className="text-gray-600">Review your resume and make final adjustments</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Edit Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Quick Edit
              </h3>

              {editingField ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Editing: {editingField.split(".").pop()}
                    </label>
                    {editingField.includes("description") || editingField.includes("summary") ? (
                      <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={4} />
                    ) : (
                      <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={saveEdit} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button onClick={cancelEdit} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">Click on any text in the preview to edit it directly.</p>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => startEditing("personalInfo.summary", cvData.personalInfo.summary)}
                    >
                      Edit Summary
                    </Button>

                    {cvData.experience.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() =>
                          startEditing(
                            `experience.description.${cvData.experience[0].id}`,
                            cvData.experience[0].description,
                          )
                        }
                      >
                        Edit Latest Job Description
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Enhancement Panel */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                AI Enhancement
              </h3>

              <div className="space-y-3">
                <Button
                  onClick={optimizeWithAI}
                  disabled={isOptimizing}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isOptimizing ? "Optimizing..." : "AI Content Optimization"}
                </Button>

                <Button
                  onClick={generateCoverLetter}
                  disabled={isGeneratingCover}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {isGeneratingCover ? "Generating..." : "Generate Cover Letter"}
                </Button>

                <Button
                  onClick={checkATS}
                  disabled={isCheckingATS}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isCheckingATS ? "Checking..." : "ATS Compatibility Check"}
                </Button>
              </div>

              {atsScore && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">ATS Score</span>
                    <span className="text-lg font-bold text-green-600">{atsScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${atsScore}%` }}
                    />
                  </div>
                  {atsRecommendations && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Recommendations:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {atsRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Template Options</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Current template: <span className="font-medium capitalize">{selectedTemplate}</span>
                </p>
                <Button variant="outline" size="sm" onClick={onPrev} className="w-full">
                  Change Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="bg-white min-h-[800px] h-full">
                <TemplateComponent data={cvData} onEdit={startEditing} editingField={editingField} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="outline" size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Templates
        </Button>
        <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Export Resume
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
