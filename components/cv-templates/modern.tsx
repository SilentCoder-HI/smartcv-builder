"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin, Calendar } from "lucide-react"

interface CVTemplateModernProps {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export function CVTemplateModern({ data, isPreview = false, onEdit, editingField }: CVTemplateModernProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white min-h-[297mm] w-full flex font-sans text-gray-800">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-2xl font-bold mb-2 ${!isPreview ? "cursor-pointer hover:bg-slate-700 p-1 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
          >
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <p
            className={`text-slate-300 text-lg ${!isPreview ? "cursor-pointer hover:bg-slate-700 p-1 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
          >
            {data.personalInfo.jobTitle || "Job Title"}
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-slate-200">Contact</h2>
          <div className="space-y-3 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-slate-400" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                <span>{data.personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{skill}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Languages</h2>
            <div className="space-y-2 text-sm">
              {data.languages.map((language, index) => (
                <div key={index}>{language}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">
              Professional Summary
            </h2>
            <p
              className={`text-gray-700 leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
              onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
            >
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">Work Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className={`text-lg font-semibold text-gray-800 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                        onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                      >
                        {exp.position}
                      </h3>
                      <p
                        className={`text-blue-600 font-medium ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                        onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p
                      className={`text-gray-700 leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
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
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                  {edu.gpa && <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">Certifications</h2>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="text-gray-700">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
