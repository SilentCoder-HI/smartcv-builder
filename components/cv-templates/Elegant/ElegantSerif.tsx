import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface ElegantSerifProps {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export function ElegantSerif({ data, isPreview = false, onEdit }: ElegantSerifProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div className="min-h-[297mm] w-full p-12 bg-white font-serif text-gray-900">
      <div className="text-center border-b pb-6 mb-8">
        <h1
          className={`text-5xl font-semibold tracking-tight ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-xl mt-2 italic text-gray-700 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2 border-b pb-1">Professional Summary</h2>
          <p
            className={`text-gray-800 text-justify ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-1">Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3
                    className={`font-semibold ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded" : ""}`}
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
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              {exp.description && (
                <p
                  className={`text-sm text-gray-800 mt-1 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded" : ""}`}
                  onClick={() => handleClick(`experience.description.${exp.id}`, exp.description)}
                >
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-1">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="italic text-gray-700">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b pb-1">Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skillCategory, i) => (
                <div key={i}>
                  <div className="font-semibold text-gray-900">{skillCategory.category}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skillCategory.items.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
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

        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b pb-1">Certifications</h2>
            <ul className="list-disc pl-5 text-sm text-gray-800">
              {data.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b pb-1">Languages</h2>
            <ul className="list-disc pl-5 text-sm text-gray-800">
              {data.languages.map((lang, i) => (
                <li key={i}>
                  {lang.language}
                  {lang.proficiency ? ` – ${lang.proficiency}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.hobbies.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b pb-1">Hobbies</h2>
            <ul className="list-disc pl-5 text-sm text-gray-800">
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
