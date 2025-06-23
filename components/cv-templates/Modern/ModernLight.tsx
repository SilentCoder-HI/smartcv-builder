"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface Props {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export default function ModernLight({ data, isPreview = false, onEdit }: Props) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white min-h-[297mm] w-full p-10 font-sans text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-300 pb-6 mb-6 text-center">
        <h1
          className={`text-4xl font-bold ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-lg text-gray-600 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="mt-3 flex justify-center gap-6 text-sm text-gray-500">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
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
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3
                  className={`font-bold ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                  onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                >
                  {exp.position}
                </h3>
                <p
                  className={`italic text-gray-700 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                  onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                >
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p
                    className={`text-sm mt-2 text-gray-700 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
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
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="flex flex-wrap gap-3 text-sm text-gray-700">
            {data.skills.map((skill, i) => (
              <li key={i} className="bg-gray-100 px-3 py-1 rounded">{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Certifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages & Hobbies */}
      <div className="grid grid-cols-2 gap-8">
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Languages</h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>
        )}
        {data.hobbies.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Interests</h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.hobbies.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
