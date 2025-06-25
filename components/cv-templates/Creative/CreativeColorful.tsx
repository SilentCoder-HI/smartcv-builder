"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface CreativeColorfulProps {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export function CreativeColorful({ data, isPreview = false, onEdit }: CreativeColorfulProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-pink-50 via-white to-blue-50 p-10 font-sans text-gray-900">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className={`text-5xl font-extrabold text-pink-600 ${!isPreview ? "cursor-pointer hover:bg-pink-100 p-2 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-2xl text-blue-600 italic mt-2 ${!isPreview ? "cursor-pointer hover:bg-blue-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-700">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-pink-700 uppercase">About Me</h2>
          <p
            className={`text-gray-800 text-justify leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-pink-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-blue-700 uppercase">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3
                      className={`text-lg font-semibold ${!isPreview ? "cursor-pointer hover:bg-blue-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`text-gray-600 italic ${!isPreview ? "cursor-pointer hover:bg-blue-100 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <p
                    className={`text-gray-700 text-sm ${!isPreview ? "cursor-pointer hover:bg-blue-100 p-2 rounded" : ""}`}
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

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-pink-700 uppercase">Skills</h2>
          <div className="space-y-3">
            {data.skills.map((skillCategory, i) => (
              <div key={i}>
                <div className="font-semibold text-pink-700">{skillCategory.category}</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillCategory.items.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-blue-700 uppercase">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-base font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extra Sections */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-pink-700 uppercase">Certifications</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {data.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-blue-700 uppercase">Languages</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {data.languages.map((lang, i) => (
                <li key={i}>
                  {lang.language}
                  {lang.proficiency ? ` – ${lang.proficiency}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-3 text-purple-700 uppercase">Hobbies & Interests</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
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
