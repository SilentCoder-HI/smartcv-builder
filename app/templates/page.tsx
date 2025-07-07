"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Eye, Sparkles } from "lucide-react"
import { templates } from "@/data/data"
import { Template } from "@/types/cv-types"
import TemplatePreview from "@/components/TemplatePreview"


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
const sampleCV = {
  personalInfo: {
    fullName: "Jonathan E. Blake",
    email: "jonathan.blake@techmail.com",
    phone: "+1 (415) 987-6543",
    address: "500 Mission Street, San Francisco, CA",
    jobTitle: "Senior Frontend Architect",
    summary: `Innovative and performance-driven Senior Frontend Architect with 13+ years of progressive experience in designing, developing, and optimizing complex web platforms for enterprise and consumer-grade products. Adept at translating business goals into functional, elegant, and responsive user interfaces using modern JavaScript frameworks such as React, Next.js, and Vue. Experienced in leading frontend teams, mentoring junior developers, and collaborating with cross-functional stakeholders to ensure cohesive design and functionality. Proficient in architecting reusable component libraries, implementing scalable design systems, and ensuring accessibility (WCAG) compliance. Passionate about code quality, system performance, and delivering exceptional digital experiences that delight users and drive growth.`,
  },

  education: [
    {
      id: "edu-1",
      institution: "Massachusetts Institute of Technology (MIT)",
      degree: "Master of Science",
      field: "Human-Computer Interaction",
      startDate: "2010-09-01",
      endDate: "2012-06-01",
      gpa: "3.9",
    },
    {
      id: "edu-2",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2006-09-01",
      endDate: "2010-06-01",
      gpa: "3.8",
    },
  ],

  experience: [
    {
      id: "exp-1",
      company: "NextSphere Technologies",
      position: "Senior Frontend Architect",
      startDate: "2018-05-01",
      endDate: "Present",
      description: `Architected and led the development of enterprise-grade SPAs using React, TypeScript, and GraphQL. Collaborated with product teams and designers to develop component libraries and design systems that reduced dev time by 40%. Migrated legacy AngularJS apps to modern React/Next.js stack, significantly improving performance and user satisfaction. Mentored 8+ junior developers and established code review standards and frontend best practices.`,
      current: true,
    },
    {
      id: "exp-2",
      company: "BlueWave Solutions",
      position: "Lead Frontend Engineer",
      startDate: "2015-02-01",
      endDate: "2018-04-30",
      description: `Led the development of an internal CMS and B2B dashboard used by over 10,000 clients. Introduced TypeScript and modern testing frameworks (Jest, Cypress) into the development pipeline. Coordinated with backend teams to integrate REST and GraphQL APIs, improving data sync and frontend reliability.`,
      current: false,
    },
    {
      id: "exp-3",
      company: "BrightApps Inc.",
      position: "Frontend Developer",
      startDate: "2012-06-01",
      endDate: "2015-01-31",
      description: `Built responsive web applications using HTML5, CSS3, JavaScript, and jQuery. Participated in Agile sprints and collaborated with UX teams to implement mobile-first designs. Improved page load times by 30% through smart bundling and lazy loading strategies.`,
      current: false,
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "Redux Toolkit",
        "Tailwind CSS",
        "Storybook",
      ],
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Express", "GraphQL", "REST APIs", "Firebase"],
    },
    {
      category: "DevOps & Tools",
      items: [
        "Docker",
        "Git",
        "GitHub Actions",
        "Vercel",
        "Webpack",
        "Jenkins",
        "CI/CD",
      ],
    },
    {
      category: "Testing & QA",
      items: ["Jest", "Cypress", "React Testing Library", "Playwright"],
    },
    {
      category: "Architecture & Design",
      items: [
        "Component Libraries",
        "Design Systems",
        "Atomic Design",
        "Accessibility (WCAG)",
        "Performance Optimization",
      ],
    },
  ],

  certifications: [
    "Google UX Design Professional Certificate – Coursera",
    "React & Redux Advanced – Udemy",
    "Frontend Architect Nanodegree – Udacity",
    "JavaScript Algorithms and Data Structures – freeCodeCamp",
    "Advanced TypeScript – Pluralsight",
  ],

  languages: [
    {
      language: "English",
      proficiency: "Native",
    },
    {
      language: "Spanish",
      proficiency: "Professional Working Proficiency",
    },
  ],

  hobbies: [
    "Photography (Street and Landscape)",
    "Chess (Online Blitz Rated ~2100)",
    "Tech Blogging (Medium & Dev.to)",
    "UI/UX Podcast Host",
    "Mentoring Junior Developers on GitHub",
  ],
}



export default function TemplatesPage() {
  const [shuffledTemplates, setShuffledTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [jobInput, setJobInput] = useState("")
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>()
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)


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
    const shuffled = [...templates].sort(() => 0.5 - Math.random())
    setShuffledTemplates(shuffled)
  }, [])

  // Filtered templates based on selected category
  const displayedTemplates = selectedCategory
    ? shuffledTemplates.filter((tpl) => tpl.type === selectedCategory)
    : shuffledTemplates

  // For showing category description in grid cards
  const getCategoryDescription = (tpl: Template) => tpl.description

  const generateAIAnalysis = async () => {
    try {
      const response = await fetch("/api/aisuggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobInput,
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
            <Button className="flex gap-2 items-center" onClick={generateAIAnalysis}>
              <Sparkles className="h-4 w-4" />
              AI Suggestion
            </Button>
          </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {displayedTemplates.map((tpl) => (
              <Card
                key={tpl.previewUrl}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              >
                <TemplatePreview selectedTemplate={tpl.id}  cvData={sampleCV}/>
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
