"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface Props {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export default function MinimalWhite({ data, isPreview = false, onEdit }: Props) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="bg-white h-full w-full p-12 font-sans text-gray-800">
      {/* Header */}
      <div className="text-center mb-10 border-b pb-6 border-gray-200">
        <h1
          className={`text-4xl font-semibold mb-2 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-lg text-gray-600 italic mb-4 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        {/* Contact Info */}
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
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
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
          <p
            className={`text-sm text-gray-700 leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3
                  className={`text-base font-semibold text-gray-800 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                  onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                >
                  {exp.position}
                </h3>
                <p
                  className={`text-gray-600 italic ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
                  onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                >
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p
                    className={`text-sm text-gray-700 mt-2 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
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
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-base font-semibold text-gray-800">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} – {edu.endDate}
                </p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Extras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="space-y-4">
              {data.skills.map((skillObj, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base text-gray-800">
                    {skillObj.category}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.isArray(skillObj.items) ? (
                      skillObj.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-800"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-800">
                        {String(skillObj.items)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Languages</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
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
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Interests</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
