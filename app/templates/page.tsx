"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Eye, Sparkles } from "lucide-react"
import originalTemplates from "@/data/data"
import { Template } from "@/types/cv-types"


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

export default function TemplatesPage() {
  const [shuffledTemplates, setShuffledTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [jobInput, setJobInput] = useState("")

  // Shuffle templates on mount
  useEffect(() => {
    const shuffled = [...originalTemplates].sort(() => 0.5 - Math.random())
    setShuffledTemplates(shuffled)
  }, [])

  // Filtered templates based on selected category
  const displayedTemplates = selectedCategory
    ? shuffledTemplates.filter((tpl) => tpl.type === selectedCategory)
    : shuffledTemplates

  // For showing category description in grid cards
  const getCategoryDescription = (tpl: Template) => tpl.description

  const handleAISuggestion = () => {
    alert(`🎯 AI Suggestion based on: "${jobInput}" (Connect with your backend here)`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore Resume Templates</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professionally designed templates — pick based on your job or style.
          </p>

          {/* AI Suggestion Input */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <div className="relative w-full sm:w-[400px]">
              <input
                type="text"
                value={jobInput}
                onChange={(e) => setJobInput(e.target.value)}
                placeholder="e.g., Frontend Developer or UI/UX Designer"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
              />
              <Sparkles className="absolute right-4 top-3.5 text-gray-400" />
            </div>
            <Button className="flex gap-2 items-center" onClick={handleAISuggestion}>
              <Sparkles className="h-4 w-4" />
              AI Suggestion
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <ul className="flex flex-wrap gap-3">
              <li>
                <button
                  className={`px-4 py-2 rounded-full border transition ${
                    !selectedCategory ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
              </li>
              {categorySortOrder.map((type) => (
                <li key={type}>
                  <button
                    className={`px-4 py-2 rounded-full border transition ${
                      selectedCategory === type
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {displayedTemplates.map((tpl, idx) => (
              <Card
                key={tpl.previewUrl}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              >
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                <CardContent className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold mb-2">{tpl.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{getCategoryDescription(tpl)}</p>
                  <Link href={tpl.previewUrl} className="mt-auto">
                    <Button variant="outline" className="flex items-center justify-center gap-2 w-full">
                      <Eye className="h-4 w-4" />
                      Preview Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
