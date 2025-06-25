"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface Props {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export default function ModernGrid({ data, isPreview = false, onEdit }: Props) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white h-full w-full p-10 font-sans text-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6 border-r border-gray-300 pr-6">
          {/* Header */}
          <div className="space-y-2 text-center md:text-left">
            <h1
              className={`text-3xl font-bold ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
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
          </div>

          {/* Contact Info */}
          <div className="text-sm text-gray-600 space-y-2">
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

          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Skills:</h2>
              <ul className="mt-2 space-y-2">
                {data.skills.map((skillGroup, i) => (
                  <li key={i}>
                    <strong className="text-[15px]">
                      {skillGroup.category}
                    </strong>{" "}
                    <span className="text-sm">
                      {Array.isArray(skillGroup.items)
                        ? skillGroup.items.join(", ")
                        : String(skillGroup.items)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-2">Languages</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {data.languages.map((lang, index) => (
                  <li key={index}>
                    {lang.language} <span className="text-gray-600">({lang.proficiency})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-2">Interests</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {data.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Main Content) */}
        <div className="col-span-2 space-y-10">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-bold mb-2">Summary</h2>
              <p
                className={`text-gray-800 text-sm ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
                onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
              >
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Professional Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3
                      className={`text-base font-semibold ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`italic text-sm text-gray-600 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
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
            <div>
              <h2 className="text-xl font-bold mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-semibold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Certifications</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
