"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface CreativePortfolioProps {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export function CreativePortfolio({ data, isPreview = false, onEdit }: CreativePortfolioProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white min-h-[297mm] w-full p-10 font-mono text-gray-800">
      {/* Header */}
      <div className="text-left mb-8 border-l-4 border-purple-500 pl-4">
        <h1
          className={`text-4xl font-extrabold text-purple-700 ${!isPreview ? "cursor-pointer hover:bg-purple-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-xl text-purple-600 mt-1 ${!isPreview ? "cursor-pointer hover:bg-purple-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="flex gap-6 text-sm text-gray-600 mt-2">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {data.personalInfo.address}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2 text-purple-700 uppercase">Profile</h2>
          <p
            className={`text-gray-700 leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-purple-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3 text-purple-700 uppercase">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3
                    className={`text-base font-semibold text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-purple-100 p-1 rounded" : ""}`}
                    onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                  >
                    {exp.position}
                  </h3>
                  <p
                    className={`text-sm italic text-gray-600 ${!isPreview ? "cursor-pointer hover:bg-purple-100 p-1 rounded" : ""}`}
                    onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
              </div>
              {exp.description && (
                <p
                  className={`text-gray-700 text-sm ${!isPreview ? "cursor-pointer hover:bg-purple-100 p-2 rounded" : ""}`}
                  onClick={() => handleClick(`experience.description.${exp.id}`, exp.description)}
                >
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3 text-purple-700 uppercase">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3 text-purple-700 uppercase">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="text-base font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Languages and Hobbies */}
      {(data.languages.length > 0 || data.hobbies.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-purple-700 uppercase">Languages</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {data.languages.map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            </div>
          )}
          {data.hobbies.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-purple-700 uppercase">Hobbies</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {data.hobbies.map((hobby, i) => (
                  <li key={i}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
