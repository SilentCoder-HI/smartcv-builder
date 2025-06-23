"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface CVTemplateMinimalProps {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export function CVTemplateMinimal({ data, isPreview = false, onEdit, editingField }: CVTemplateMinimalProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white min-h-[297mm] w-full p-12 font-sans text-gray-800">
      {/* Header */}
      <div className="text-center mb-12 border-b border-gray-200 pb-8">
        <h1
          className={`text-4xl font-light mb-4 text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-xl text-gray-600 mb-6 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        {/* Contact Info */}
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 uppercase tracking-wide">Professional Summary</h2>
          <p
            className={`text-gray-700 leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-10">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 uppercase tracking-wide">Work Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="mb-2">
                      <h3
                        className={`text-base font-semibold text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                        onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                      >
                        {exp.position}
                      </h3>
                      <p
                        className={`text-gray-600 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                        onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                      >
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <p
                        className={`text-gray-700 text-sm leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
                        onClick={() => handleClick(`experience.description.${exp.id}`, exp.description)}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 uppercase tracking-wide">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 uppercase tracking-wide">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 uppercase tracking-wide">Languages</h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    {language}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6 text-gray-900 uppercase tracking-wide">Interests</h2>
              <div className="space-y-2">
                {data.hobbies.map((hobby, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    {hobby}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
