"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import type { CVData } from "@/types/cv-types"
import { useState } from "react"

// Classic
import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack"
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue"

// Corporate
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern"
import { CorporateFormal } from "@/components/cv-templates/Corporate/Corporate Formal"

// Creative
import { CreativeColorful } from "@/components/cv-templates/Creative/Creative Colorful"
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

interface TemplateSelectorProps {
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
  cvData: CVData
  onNext: () => void
  onPrev: () => void
}

const templates = [
  // Classic
  {
    id: "classic-black",
    name: "Classic Black",
    description: "Traditional professional style",
    component: ClassicBlack,
  },
  {
    id: "classic-blue",
    name: "Classic Blue",
    description: "Traditional professional style",
    component: ClassicBlue,
  },

  // Corporate
  {
    id: "corporate-modern",
    name: "Corporate Modern",
    description: "Formal layout for business professionals",
    component: CorporateModern,
  },
  {
    id: "corporate-formal",
    name: "Corporate Formal",
    description: "Formal layout for business professionals",
    component: CorporateFormal,
  },

  // Creative
  {
    id: "creative-colorful",
    name: "Creative Colorful",
    description: "Stylish and bold format for creatives",
    component: CreativeColorful,
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Portfolio style for creative professionals",
    component: CreativePortfolio,
  },

  // Elegant
  {
    id: "elegant-contrast",
    name: "Elegant Contrast",
    description: "Sleek design with refined typography",
    component: ElegantContrast,
  },
  {
    id: "elegant-serif",
    name: "Elegant Serif",
    description: "Elegant serif type and layout",
    component: ElegantSerif,
  },

  // Minimal
  {
    id: "minimal-serif",
    name: "Minimal Serif",
    description: "Simple and elegant layout",
    component: MinimalSerif,
  },
  {
    id: "minimal-white",
    name: "Minimal White",
    description: "Clean and minimal white design",
    component: MinimalWhite,
  },

  // Modern
  {
    id: "modern-grid",
    name: "Modern Grid",
    description: "Grid-based modern layout",
    component: ModernGrid,
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Dark modern style",
    component: ModernDark,
  },
  {
    id: "modern-light",
    name: "Modern Light",
    description: "Light modern style",
    component: ModernLight,
  },
]

export function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
  cvData,
  onNext,
  onPrev,
}: TemplateSelectorProps) {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)

  const generateAIAnalysis = async () => {
    setIsGeneratingAI(true)
    try {
      const response = await fetch("/api/comprehensive-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvData,
        }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setAiAnalysis(analysis)
        // Auto-select recommended template
        if (analysis.recommendedTemplate) {
          setSelectedTemplate(analysis.recommendedTemplate)
        }
      }
    } catch (error) {
      console.error("Error generating AI analysis:", error)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  const generateAITemplate = async () => {
    setIsGeneratingAI(true)
    try {
      const response = await fetch("/api/generate-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: cvData.personalInfo.jobTitle,
          experience: cvData.experience,
          skills: cvData.skills,
        }),
      })

      if (response.ok) {
        const aiTemplate = await response.json()
        // For now, we'll select the recommended template
        setSelectedTemplate(aiTemplate.recommendedTemplate || "modern")
      }
    } catch (error) {
      console.error("Error generating AI template:", error)
      // Fallback to modern template
      setSelectedTemplate("modern")
    } finally {
      setIsGeneratingAI(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h1>
        <p className="text-gray-600">Select a design that matches your style and industry</p>
      </div>

      {/* Enhanced AI Template Generator */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Template & Content Optimizer
              </h3>
              <p className="text-purple-700 mb-4">
                Let AI analyze your profile, suggest the perfect template, and optimize your content for maximum impact
              </p>

              {aiAnalysis && (
                <div className="mb-4 p-4 bg-white rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">AI Analysis Results:</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Recommended Template:</span>
                      <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs capitalize">
                        {aiAnalysis.recommendedTemplate}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Industry Match:</span>
                      <span className="ml-2 text-gray-600">{aiAnalysis.industryMatch}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Profile Strength:</span>
                      <span className="ml-2 text-gray-600">{aiAnalysis.profileStrength}/10</span>
                    </div>
                    {aiAnalysis.suggestions && (
                      <div>
                        <span className="font-medium text-gray-700">Key Suggestions:</span>
                        <ul className="mt-1 space-y-1">
                          {aiAnalysis.suggestions.slice(0, 3).map((suggestion: any, index: any) => (
                            <li key={index} className="text-gray-600 text-xs flex items-start">
                              <span className="text-purple-500 mr-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-4 space-y-2">
              <Button
                onClick={generateAIAnalysis}
                disabled={isGeneratingAI}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGeneratingAI ? "Analyzing..." : "AI Analysis"}
              </Button>

              {aiAnalysis && (
                <Button
                  onClick={() => setSelectedTemplate(aiAnalysis.recommendedTemplate)}
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 w-full"
                >
                  Apply Recommendation
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {templates.map((template) => {
          const TemplateComponent = template.component
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="h-96 overflow-hidden bg-white border-b">
                  <div className="scale-[0.3] origin-top-left w-[300%] h-[300%]">
                    <TemplateComponent data={cvData} isPreview={true} />
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Form
        </Button>
        <Button onClick={onNext} disabled={!selectedTemplate} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Preview Resume
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
