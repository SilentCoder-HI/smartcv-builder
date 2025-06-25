"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import type { CVData, Template } from "@/types/cv-types"
import { useEffect, useRef, useState } from "react"
import TemplatePreview from "./TemplatePreview"
import { templates } from "@/data/data"

interface TemplateSelectorProps {
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
  cvData: CVData
  onNext: () => void
  onPrev: () => void
  scrollRef?: React.RefObject<HTMLDivElement>
}
const categorySortOrder = [
  "Professional",
  "Modern",
  "Minimal",
  "Classic",
  "Creative",
  "Elegant",
]
const categoryDisplayNames: { [key: string]: string } = {
  Professional: "Professional",
  Modern: "Modern",
  Minimal: "Minimal",
  Classic: "Classic",
  Creative: "Creative",
  Elegant: "Elegant",
}


export function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
  cvData,
  onNext,
  onPrev,
  scrollRef,
}: TemplateSelectorProps) {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [shuffledTemplates, setShuffledTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  function toKebabCase(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")        // spaces → hyphen
      .replace(/[()]/g, "")        // remove brackets (optional for names like Modern Light (Modern))
      .replace(/[^a-z0-9-]/g, "")  // remove special characters except hyphens
      .replace(/-+/g, "-")         // collapse multiple hyphens
  }

  // Shuffle templates on mount
  useEffect(() => {
    const shuffled = templates.flat().sort(() => 0.5 - Math.random());
    setShuffledTemplates(shuffled);

  }, [])

  // Filtered templates based on selected category
  const displayedTemplates = selectedCategory
    ? shuffledTemplates.filter((tpl) => tpl.type === selectedCategory)
    : shuffledTemplates

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
          templates,
        }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setAiAnalysis(analysis)
        // Auto-select recommended template
        if (analysis.recommendedTemplate) {
          setSelectedTemplate(analysis.recommendedTemplate)
        }
        if (analysis.recommendedTemplateId) {
          const normalizedId = toKebabCase(analysis.recommendedTemplateId)
          setSelectedTemplate(normalizedId)
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
          education: cvData.education,
          cvData,
          templates, // ✅ Fixed line here
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
  const templateRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

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
                        {aiAnalysis.recommendedTemplateName}
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
                className="bg-purple-600 hover:bg-purple-700 w-full"
              >
                {isGeneratingAI ? "Analyzing..." : "AI Analysis"}
              </Button>

              {aiAnalysis && (
                <Button
                onClick={() => {
                  const normalizedId = toKebabCase(aiAnalysis.recommendedTemplateId)
                  setSelectedTemplate(normalizedId)
                
                  // Wait for the DOM to update
                  setTimeout(() => {
                    requestAnimationFrame(() => {
                      const target = templateRefs.current[normalizedId]
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "center" })
                      } else {
                        console.warn("Scroll target not found:", normalizedId)
                        console.log("Available refs:", templateRefs.current)
                      }
                    })
                  }, 150) // Optional: increase if needed
                }}                
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

      {/* Category Filter */}
      <div className="flex justify-center mb-12">
        <ul className="flex flex-wrap gap-3">
          <li>
            <button
              className={`px-4 py-2 rounded-full border transition ${!selectedCategory ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
          </li>
          {categorySortOrder.map((type) => (
            <li key={type}>
              <button
                className={`px-4 py-2 rounded-full border transition ${selectedCategory === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                onClick={() => setSelectedCategory(type)}
              >
                {categoryDisplayNames[type] || type}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayedTemplates.map((template) => {
          return (
            <Card
              key={template.id}
              ref={(el) => {
                templateRefs.current[template.id] = el
              }}
              className={`cursor-pointer w-full transition-all overflow-hidden duration-200 hover:shadow-lg ${selectedTemplate === template.id
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:shadow-md"
                }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-0 h-fit w-full mx-auto flex flex-col justify-center">
                {/* Template Preview */}
                <TemplatePreview cvData={cvData} selectedTemplate={template.id} />

                {/* Template Info */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold">
                      {template.name}
                    </h3>
                    {selectedTemplate === template.id && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          );
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
    </div >
  )
}
