"use client";

import type { CVData } from "@/types/cv-types";
import { Mail, Phone, MapPin } from "lucide-react";

interface CorporateModernProps {
  data: CVData;
  isPreview?: boolean;
  onEdit?: (field: string, value: string) => void;
  editingField?: string | null;
}

export function CorporateModern({
  data,
  isPreview = false,
  onEdit,
}: CorporateModernProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) onEdit(field, value);
  };

  return (
    <div className="h-full w-full p-12 bg-gray-50 font-sans text-gray-800 border border-gray-300 shadow-md rounded-xl text-left">
      {/* Header */}
      <div className="border-b border-gray-300 pb-6 mb-10">
        <h1
          className={`text-4xl font-extrabold text-gray-900 tracking-tight ${
            !isPreview ? "cursor-pointer hover:bg-blue-100 p-2 rounded-md" : ""
          }`}
          onClick={() =>
            handleClick("personalInfo.fullName", data.personalInfo.fullName)
          }
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-lg text-gray-600 mt-1 ${
            !isPreview ? "cursor-pointer hover:bg-blue-100 p-1 rounded-md" : ""
          }`}
          onClick={() =>
            handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)
          }
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {data.personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
            Summary
          </h2>
          <p
            className={`text-gray-700 leading-relaxed ${
              !isPreview ? "cursor-pointer hover:bg-blue-100 p-3 rounded-md" : ""
            }`}
            onClick={() =>
              handleClick("personalInfo.summary", data.personalInfo.summary)
            }
          >
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
            Work Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between flex-wrap items-start">
                  <div>
                    <h3
                      className={`font-semibold text-lg text-gray-900 ${
                        !isPreview ? "cursor-pointer hover:underline" : ""
                      }`}
                      onClick={() =>
                        handleClick(
                          `experience.position.${exp.id}`,
                          exp.position
                        )
                      }
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`italic text-gray-600 ${
                        !isPreview ? "cursor-pointer hover:underline" : ""
                      }`}
                      onClick={() =>
                        handleClick(
                          `experience.company.${exp.id}`,
                          exp.company
                        )
                      }
                    >
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <p
                    className={`text-sm mt-2 text-gray-700 ${
                      !isPreview ? "cursor-pointer hover:bg-blue-50 p-2 rounded-md" : ""
                    }`}
                    onClick={() =>
                      handleClick(
                        `experience.description.${exp.id}`,
                        exp.description
                      )
                    }
                  >
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-medium text-gray-900">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="italic text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} – {edu.endDate}
                </p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills, Certifications, Languages, Hobbies */}
      <div className="grid md:grid-cols-2 gap-10">
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
              Skills
            </h2>
            {data.skills.map((group, i) => (
              <div key={i}>
                <p className="font-medium text-gray-800">{group.category}</p>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {group.items.map((skill, j) => (
                    <li
                      key={j}
                      className="bg-blue-100 text-sm px-3 py-1 rounded-full text-blue-800"
                      style={{ listStyle: "none" }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.certifications?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
              Certifications
            </h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {data.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
              Languages
            </h2>
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

        {data.hobbies?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-blue-700 border-l-4 border-blue-500 pl-3 mb-3">
              Hobbies
            </h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {data.hobbies.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
