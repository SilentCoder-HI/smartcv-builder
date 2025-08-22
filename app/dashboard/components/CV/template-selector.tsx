"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import type { CVData } from "@/types/cv-types"
import { RefObject, useEffect, useRef, useState, useCallback } from "react"
import TemplateRenderer from "@dashboard/components/TemplateRenderer";
import { htmltemplates } from "@/data/TempleteIndex";
import { TemplateMeta } from "@/types/template-types"
import { frontendDeveloperCV } from "@/data/demoCVS/developer/developer-demo-cvs"
import LoadingSpinner from "../loading/loading"

interface TemplateSelectorProps {
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
  cvData: CVData
  onNext: () => void
  onPrev: () => void
  scrollRef: RefObject<HTMLDivElement | null>
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

// Lazy loading constants
const INITIAL_LOAD_COUNT = 6
const LOAD_MORE_COUNT = 6

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
  const [shuffledTemplates, setShuffledTemplates] = useState<TemplateMeta[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const templateRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [loading, setLoading] = useState(true)

  // Lazy loading state
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  function toKebabCase(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[()]/g, "")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
  }

  // Shuffle templates on mount
  useEffect(() => {
    let safeTemplates: TemplateMeta[] = []
    if (Array.isArray(htmltemplates)) {
      safeTemplates = [...htmltemplates]
    }
    const shuffled = safeTemplates.sort(() => 0.5 - Math.random());
    setShuffledTemplates(shuffled);
  }, [])

  // Set loading to false when shuffledTemplates are loaded
  useEffect(() => {
    if (Array.isArray(shuffledTemplates) && shuffledTemplates.length > 0) {
      setLoading(false)
    }
  }, [shuffledTemplates])

  // Filtered templates based on selected category
  const displayedTemplates = Array.isArray(shuffledTemplates)
    ? (selectedCategory
      ? shuffledTemplates.filter((tpl) => tpl && tpl.templateType === selectedCategory)
      : shuffledTemplates)
    : [];

  // Lazy loading: only show visibleCount templates
  const templatesToShow = displayedTemplates.slice(0, visibleCount);

  // Intersection Observer for lazy loading
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => {
        // Only load more if there are more templates to show
        if (prev < displayedTemplates.length) {
          return Math.min(prev + LOAD_MORE_COUNT, displayedTemplates.length);
        }
        return prev;
      });
    }
  }, [displayedTemplates.length]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new window.IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
    if (loaderRef.current) observerRef.current.observe(loaderRef.current);
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, templatesToShow.length, displayedTemplates.length]);

  // Reset visibleCount when category changes
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
  }, [selectedCategory, shuffledTemplates]);

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
          htmltemplates,
        }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setAiAnalysis(analysis)
        // Auto-select recommended template
        if (analysis.recommendedTemplateId) {
          const normalizedId = toKebabCase(analysis.recommendedTemplateId)
          setSelectedTemplate(normalizedId)
        } else if (analysis.recommendedTemplate) {
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
          education: cvData.education,
          cvData,
          htmltemplates,
        }),
      })

      if (response.ok) {
        const aiTemplate = await response.json()
        setSelectedTemplate(aiTemplate.recommendedTemplate || "modern")
      }
    } catch (error) {
      console.error("Error generating AI template:", error)
      setSelectedTemplate("modern")
    } finally {
      setIsGeneratingAI(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 h-full my-5 sm:px-6 lg:px-8 flex flex-col min-h-screen">
      <div className="flex-grow overflow-y-auto no-scrollbar pb-4">
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
                      {Array.isArray(aiAnalysis.suggestions) && (
                        <div>
                          <span className="font-medium text-gray-700">Key Suggestions:</span>
                          <ul className="mt-1 space-y-1">
                            {aiAnalysis.suggestions.slice(0, 3).map((suggestion: any, index: number) => (
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
                      }, 150)
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
        <div className="flex justify-center my-5">
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

        {/* Template Grid with Lazy Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {!loading && Array.isArray(templatesToShow) && templatesToShow.length > 0 ? (
            templatesToShow.map((tpl, index) =>
              tpl ? (
                <div
                  key={tpl.templateId || tpl.templateName || index}
                  ref={el => {
                    if (el) templateRefs.current[tpl.templateId] = el;
                  }}
                  className={`p-3 border rounded-lg shadow-sm cursor-pointer overflow-hidden transition flex flex-col items-center ${selectedTemplate === tpl.templateId
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                    : "bg-white border-gray-200 dark:bg-gray-800"
                    }`}
                  onClick={() => setSelectedTemplate(tpl.templateId)}
                >
                  <div className="font-semibold mb-2">{tpl.templateName}</div>
                  <div className="w-full h-96 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden flex items-center justify-center mb-2 border select-none pointer-events-none">
                    {tpl.styles ? (
                      <div className="h-96 w-full overflow-hidden bg-white border-b select-none pointer-events-none">
                        <div className="scale-[0.5] w-[200%] h-[144%] origin-top-left select-none pointer-events-none">
                          <TemplateRenderer
                            template={tpl}
                            cvData={frontendDeveloperCV}
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
              ) : null
            )
          ) : loading ? (
            <div className="w-full h-96 col-span-full text-center text-gray-500 py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No templates available.
            </div>
          )}
        </div>
        {/* Lazy load loader sentinel */}
        <div ref={loaderRef} style={{ height: 1 }} />
        {/* Show spinner if more templates are available to load */}
        {!loading && visibleCount < displayedTemplates.length && (
          <div className="w-full h-20 col-span-full text-center text-gray-500 py-8">
            <LoadingSpinner />
          </div>
        )}
        <div className=" bg-white border-t my-5 py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <Button onClick={onPrev} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Form
            </Button>
            <Button
              onClick={onNext}
              disabled={!selectedTemplate}
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Preview Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
    </div >
  )
}
