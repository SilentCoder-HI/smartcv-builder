"use client";

import type { CVData } from "@/types/cv-types";
import { Mail, Phone, MapPin } from "lucide-react";

interface CorporateFormalProps {
  data: CVData;
  isPreview?: boolean;
  onEdit?: (field: string, value: string) => void;
  editingField?: string | null;
}

export function CorporateFormal({ data, isPreview = false, onEdit }: CorporateFormalProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value);
    }
  };

  return (
    <div className="h-full w-full p-12 bg-white font-serif text-gray-800 border border-gray-300 text-left">
      <div className="border-b-2 border-gray-500 pb-6 mb-8">
        <h1
          className={`text-4xl font-bold text-gray-900 uppercase tracking-wider ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded-sm" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-xl text-gray-700 mt-2 italic ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded-sm" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="flex gap-6 mt-4 text-sm text-gray-600">
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
        <div className="mb-8">
          <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Summary</h2>
          <p
            className={`text-gray-700 text-justify leading-relaxed ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded-sm" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary ?? "")}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-bold text-gray-900 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded-sm" : ""}`}
                      onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`italic text-gray-700 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-1 rounded-sm" : ""}`}
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
                    className={`text-sm text-gray-700 mt-1 ${!isPreview ? "cursor-pointer hover:bg-gray-100 p-2 rounded-sm" : ""}`}
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

      {data.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="italic text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skillCategory, i) => (
                <div key={i}>
                  <div className="font-bold text-gray-800">{skillCategory.category}</div>
                  <ul className="flex flex-wrap gap-2 pl-0">
                    {skillCategory.items.map((skill, j) => (
                      <li
                        key={j}
                        className="bg-gray-100 rounded-sm px-3 py-1 text-sm text-gray-700"
                        style={{ listStyle: "none" }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Certifications</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {data.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Languages</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
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
            <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2 border-b border-gray-400">Hobbies</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
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
