"use client"

import { RefObject, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, ArrowRight, Sparkles, CheckCircle } from "lucide-react"

export interface Skill {
  category: string
  items: string[]
}

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  address?: string
  summary?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

export interface JobAnalysisResults {
  matchScore: number
  missingSkills: string[]
  keywordSuggestions: string[]
  improvementSuggestions: string[]
  optimizedSummary?: string
}

export interface CVData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  certifications: string[]
  hobbies: string[]
  languages?: {
    language: string
    proficiency: string
  }[]
}

interface CVFormProps {
  cvData: CVData
  setCvData: (data: CVData) => void
  scrollRef: RefObject<HTMLDivElement | null>
  onSave: (data: CVData) => void
  onNext: () => void
  show: ()=> void
}

export function CVForm({ cvData, setCvData, onNext, show, onSave }: CVFormProps) {
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<JobAnalysisResults | null>(null)

  const handleSave = () => {
      onSave(cvData)
  }

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-job-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription, cvData }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", errorText)
        throw new Error("Failed to analyze job description.")
      }

      const data = await response.json()
      setAnalysisResults(data)
      return data
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }
  const applyAIRecommendations = () => {
    if (!analysisResults) return

    // Apply recommended skills
    if (analysisResults.missingSkills?.length > 0) {
      const newSkills = [...cvData.skills]
      const technicalSkills = newSkills.find(skill => skill.category.toLowerCase() === "technical")

      if (technicalSkills) {
        technicalSkills.items = [...new Set([...technicalSkills.items, ...analysisResults.missingSkills])]
      } else {
        newSkills.push({
          category: "Technical",
          items: analysisResults.missingSkills
        })
      }

      setCvData({
        ...cvData,
        skills: newSkills,
      })
    }

    // Apply optimized summary if provided
    if (analysisResults.optimizedSummary) {
      setCvData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          summary: analysisResults.optimizedSummary,
        },
      })
    }

    alert("AI recommendations applied successfully!")
  }

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value,
      },
    })
  }

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
        },
      ],
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCvData({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          current: false,
        },
      ],
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addSkill = () => {
    setCvData({
      ...cvData,
      skills: [
        ...cvData.skills,
        {
          category: "",
          items: [] // Initialize as empty array
        },
      ],
    })
  }
  const updateSkillItems = (index: number, value: string) => {
    const newSkills = [...cvData.skills]
    newSkills[index] = {
      ...newSkills[index],
      items: value.split(",")
        .map(item => item.trim())
        .filter(item => item) || [], // Fallback to empty array
    }
    setCvData({
      ...cvData,
      skills: newSkills,
    })
  }


  const updateSkillCategory = (index: number, value: string) => {
    const newSkills = [...cvData.skills]
    newSkills[index] = {
      ...newSkills[index],
      category: value,
    }
    setCvData({
      ...cvData,
      skills: newSkills,
    })
  }

  const removeSkill = (index: number) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index),
    })
  }

  const generateAIContent = async () => {
    if (!cvData.personalInfo.jobTitle) {
      alert("Please enter a job title first to generate AI content.")
      return
    }

    setIsGeneratingContent(true)
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: cvData.personalInfo.jobTitle,
          currentData: cvData,
        }),
      })

      if (response.ok) {
        const aiContent = await response.json()

        // Transform AI skills data to match our expected format
        const formattedSkills = aiContent.skills
          ? aiContent.skills.map((skill: any) => ({
            category: skill.category || "Technical",
            items: Array.isArray(skill.items)
              ? skill.items
              : typeof skill.items === 'string'
                ? skill.items.split(',').map((s: string) => s.trim())
                : []
          }))
          : cvData.skills

        setCvData({
          ...cvData,
          personalInfo: {
            ...cvData.personalInfo,
            summary: aiContent.summary || cvData.personalInfo.summary,
          },
          skills: formattedSkills,
        })

      }
    } catch (error) {
      console.error("Error generating AI content:", error)
    } finally {
      setIsGeneratingContent(false)
    }
  }

  const isFormValid = () => {
    return (
      cvData.personalInfo.fullName &&
      cvData.personalInfo.email &&
      cvData.personalInfo.phone &&
      cvData.personalInfo.jobTitle
    )
  }

  const addLanguage = () => {
    setCvData({
      ...cvData,
      languages: [...(cvData.languages || []), { language: "", proficiency: "" }],
    })
  }

  const updateLanguage = (index: number, field: "language" | "proficiency", value: string) => {
    const newLanguages = [...(cvData.languages || [])]
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value,
    }
    setCvData({
      ...cvData,
      languages: newLanguages,
    })
  }

  const removeLanguage = (index: number) => {
    setCvData({
      ...cvData,
      languages: (cvData.languages || []).filter((_, i) => i !== index),
    })
  }

  const addHobby = () => {
    setCvData({
      ...cvData,
      hobbies: [...(cvData.hobbies || []), ""],
    })
  }

  const updateHobby = (index: number, value: string) => {
    const newHobbies = [...(cvData.hobbies || [])]
    newHobbies[index] = value
    setCvData({
      ...cvData,
      hobbies: newHobbies,
    })
  }

  const removeHobby = (index: number) => {
    setCvData({
      ...cvData,
      hobbies: (cvData.hobbies || []).filter((_, i) => i !== index),
    })
  }


  return (
      <div className="max-w-4xl h-full mx-auto space-y-8 my-5 overflow-auto no-scrollbar">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Build Your Resume</h1>
        <p className="text-gray-600">Fill in your information to get started</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Personal Information
            <Button
              onClick={generateAIContent}
              disabled={isGeneratingContent || !cvData.personalInfo.jobTitle}
              variant="outline"
              size="sm"
              className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGeneratingContent ? "Generating..." : "AI Enhance"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={cvData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={cvData.personalInfo.jobTitle}
                onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={cvData.personalInfo.address || ""}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              placeholder="City, State, Country"
            />
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={cvData.personalInfo.summary || ""}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder="Brief description of your professional background and goals..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Job Description Analysis */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-900">
            <Sparkles className="w-5 h-5 mr-2" />
            AI Job Description Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobDescription">Paste Job Description (Optional)</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here and AI will tailor your resume content accordingly..."
              rows={6}
              className="resize-none"
            />
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={analyzeJobDescription}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isAnalyzing ? "Analyzing..." : "Analyze & Optimize"}
            </Button>
            {analysisResults && (
              <Button
                onClick={applyAIRecommendations}
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Apply Recommendations
              </Button>
            )}
          </div>

          {analysisResults && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3">AI Analysis Results:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Match Score:</span>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysisResults.matchScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-purple-700">{analysisResults.matchScore}%</span>
                  </div>
                </div>

                {analysisResults.missingSkills?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Recommended Skills to Add:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysisResults.missingSkills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysisResults.keywordSuggestions?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Important Keywords:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysisResults.keywordSuggestions.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysisResults.improvementSuggestions?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Improvement Suggestions:</span>
                    <ul className="mt-1 space-y-1">
                      {analysisResults.improvementSuggestions.map((suggestion, index) => (
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
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button onClick={addEducation} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button
                  onClick={() => removeEducation(edu.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    placeholder="2018"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    placeholder="2022"
                  />
                </div>
              </div>
            </div>
          ))}
          {cvData.education.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No education added yet. Click "Add Education" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Work Experience
            <Button onClick={addExperience} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cvData.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    placeholder="Jan 2020"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    placeholder="Present"
                    disabled={exp.current}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor={`current-${exp.id}`}>Current Position</Label>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
          {cvData.experience.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No work experience added yet. Click "Add Experience" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Skills
            <Button
              onClick={addSkill}
              variant="outline"
              size="sm"
              disabled={cvData.skills.length >= 8}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill Category
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cvData.skills.map((skill: { category: string; items: string[] }, index: number) => {
              // Ensure items is always an array of strings
              let skillItems: string[] = [];
              if (Array.isArray(skill.items)) {
                skillItems = skill.items.filter((item) => typeof item === "string");
              } else if (typeof skill.items === "string") {
                skillItems = (skill.items as string).split(",").map((s: string) => s.trim())
              }

              return (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Skill Category {index + 1}</h4>
                    <Button
                      onClick={() => removeSkill(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Category Name</Label>
                    <Input
                      value={skill.category || ''}
                      onChange={(e) => updateSkillCategory(index, e.target.value)}
                      placeholder="e.g., Technical, Soft Skills"
                    />
                  </div>
                  <div>
                    <Label>Skills (comma separated)</Label>
                    <Input
                      value={skillItems.join(", ")}
                      onChange={(e) => updateSkillItems(index, e.target.value)}
                      placeholder="e.g., JavaScript, Python, Communication"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate multiple skills with commas
                    </p>
                  </div>
                  {skillItems.length > 0 && (
                    <div className="mt-2">
                      <Label>Preview:</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {skillItems.map((item: string, i: number) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {cvData.skills.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No skill categories added yet. Click "Add Skill Category" to get started.</p>
                <p className="text-sm mt-2">Example: "Technical: JavaScript, Python"</p>
              </div>
            )}

            {cvData.skills.length >= 8 && (
              <div className="text-center text-sm text-gray-500 mt-2">
                Maximum of 8 skill categories reached
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Languages Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Languages
            <Button onClick={addLanguage} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(cvData.languages || []).map((lang, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label>Language</Label>
                  <Input
                    value={lang.language}
                    onChange={(e) => updateLanguage(index, "language", e.target.value)}
                    placeholder="e.g., Spanish"
                  />
                </div>
                <div>
                  <Label>Proficiency</Label>
                  <Input
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                    placeholder="e.g., Fluent, Intermediate"
                  />
                </div>
                <Button
                  onClick={() => removeLanguage(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          {(cvData.languages || []).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No languages added yet. Click "Add Language" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hobbies Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Hobbies & Interests
            <Button onClick={addHobby} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Hobby
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {(cvData.hobbies || []).map((hobby, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={hobby}
                  onChange={(e) => updateHobby(index, e.target.value)}
                  placeholder="e.g., Photography, Hiking"
                />
                <Button
                  onClick={() => removeHobby(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          {(cvData.hobbies || []).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No hobbies added yet. Click "Add Hobby" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4 mt-8 pb-8">
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={show}
        >
          Cancel
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={onNext}
          disabled={!isFormValid()}
        >
          Next          
        </Button>
      </div>
    </div>
  )
}