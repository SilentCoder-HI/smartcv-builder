"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { FileText } from "lucide-react"
import Link from "next/link"
import { CVForm } from "@/components/cv-form"
import { TemplateSelector } from "@/components/template-selector"
import { CVPreview } from "@/components/cv-preview"
import { ExportOptions } from "@/components/export-options"
import type { CVData } from "@/types/cv-types"

const steps = [
  { id: 1, title: "Personal Information", description: "Enter your details" },
  { id: 2, title: "Choose Template", description: "Select your style" },
  { id: 3, title: "Preview & Edit", description: "Customize your CV" },
  { id: 4, title: "Download", description: "Export your resume" },
]

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      jobTitle: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    languages: [],
    hobbies: [],
  })
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CVForm cvData={cvData} setCvData={setCvData} onNext={nextStep} />
      case 2:
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            cvData={cvData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <CVPreview
            cvData={cvData}
            setCvData={setCvData}
            selectedTemplate={selectedTemplate}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return <ExportOptions cvData={cvData} selectedTemplate={selectedTemplate} onPrev={prevStep} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 hidden sm:block">
                    <div className="h-0.5 bg-gray-200">
                      <div
                        className={`h-0.5 transition-all duration-300 ${
                          currentStep > step.id ? "bg-blue-600 w-full" : "bg-gray-200 w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{renderStepContent()}</main>
    </div>
  )
}
