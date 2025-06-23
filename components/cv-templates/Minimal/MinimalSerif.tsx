"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface Props {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export default function MinimalSerif({ data, isPreview = false, onEdit }: Props) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white min-h-[297mm] w-full p-12 font-serif text-gray-900">
      {/* Header */}
      <div className="text-center mb-10 border-b pb-6 border-gray-300">
        <h1
          className={`text-4xl font-bold mb-1 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-lg text-gray-700 italic mb-4 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        <div className="flex justify-center space-x-6 text-sm text-gray-700">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-1">Professional Summary</h2>
          <p
            className={`text-sm text-gray-800 leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Two Columns */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-10">
          {/* Work Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3
                      className={`text-base font-bold text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`text-sm text-gray-700 italic ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                    >
                      {exp.company}
                    </p>
                    <p className="text-xs text-gray-500">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </p>
                    {exp.description && (
                      <p
                        className={`text-sm mt-2 text-gray-800 leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
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
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} – {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
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
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Certifications</h2>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Languages</h2>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Hobbies</h2>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {data.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
