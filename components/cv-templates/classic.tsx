"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface CVTemplateClassicProps {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export function CVTemplateClassic({ data, isPreview = false, onEdit, editingField }: CVTemplateClassicProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white min-h-[297mm] w-full p-12 font-serif text-gray-800">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <h1
          className={`text-3xl font-bold mb-2 text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-lg text-gray-700 mb-4 italic ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        {/* Contact Info */}
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
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
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">PROFESSIONAL SUMMARY</h2>
          <p
            className={`text-gray-700 leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-400 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className={`text-base font-bold text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`text-gray-700 italic ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p
                    className={`text-gray-700 leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
                    onClick={() => handleClick(`experience.description.${exp.id}`, exp.description)}
                  >
                    {exp.description}
                  </p>
                )}
                {index < data.experience.length - 1 && <hr className="mt-4 border-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-400 pb-1">EDUCATION</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700 italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
                {index < data.education.length - 1 && <hr className="mt-3 border-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills and Additional Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">CORE COMPETENCIES</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="text-gray-700 text-sm">
                  • {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">CERTIFICATIONS</h2>
            <div className="space-y-1">
              {data.certifications.map((cert, index) => (
                <div key={index} className="text-gray-700 text-sm">
                  • {cert}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages and Hobbies */}
      {(data.languages.length > 0 || data.hobbies.length > 0) && (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">LANGUAGES</h2>
              <div className="space-y-1">
                {data.languages.map((language, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    • {language}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">INTERESTS</h2>
              <div className="space-y-1">
                {data.hobbies.map((hobby, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    • {hobby}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
