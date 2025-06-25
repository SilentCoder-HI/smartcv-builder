import type { CVData } from "@/types/cv-types";
import { Mail, Phone, MapPin } from "lucide-react";

interface CVTemplateElegantContrastProps {
  data: CVData;
  isPreview?: boolean;
  onEdit?: (field: string, value: string) => void;
  editingField?: string | null;
}

export function ElegantContrast({ data, isPreview = false, onEdit, editingField }: CVTemplateElegantContrastProps) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value);
    }
  };

  return (
    <div className="bg-black text-white min-h-full w-full p-12 font-serif">
      <div className="text-center mb-8 border-b-2 border-white pb-6">
        <h1
          className={`text-4xl font-bold mb-2 ${!isPreview ? "cursor-pointer hover:bg-white/10 p-2 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className={`text-lg italic mb-4 ${!isPreview ? "cursor-pointer hover:bg-white/10 p-1 rounded" : ""}`}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        <div className="flex justify-center space-x-6 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">PROFESSIONAL SUMMARY</h2>
          <p
            className={`leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-white/10 p-2 rounded" : ""}`}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary)}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 border-b border-white pb-1">EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className={`text-base font-bold ${!isPreview ? "cursor-pointer hover:bg-white/10 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className={`italic ${!isPreview ? "cursor-pointer hover:bg-white/10 p-1 rounded" : ""}`}
                      onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                  </div>
                </div>
                {exp.description && (
                  <p
                    className={`leading-relaxed text-justify ${!isPreview ? "cursor-pointer hover:bg-white/10 p-2 rounded" : ""}`}
                    onClick={() => handleClick(`experience.description.${exp.id}`, exp.description)}
                  >
                    {exp.description}
                  </p>
                )}
                {index < data.experience.length - 1 && <hr className="mt-4 border-white/30" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 border-b border-white pb-1">EDUCATION</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm">
                    <p>{edu.startDate} - {edu.endDate}</p>
                  </div>
                </div>
                {index < data.education.length - 1 && <hr className="mt-3 border-white/30" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">SKILLS</h2>
            <div className="space-y-3">
              {data.skills.map((skillCategory, i) => (
                <div key={i}>
                  <div className="font-semibold">{skillCategory.category}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skillCategory.items.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
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

        {data.hobbies.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">INTERESTS</h2>
            <div className="space-y-1">
              {data.hobbies.map((hobby, index) => (
                <div key={index} className="text-sm">
                  • {hobby}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {Array.isArray(data.languages) && data.languages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">LANGUAGES</h2>
          <div className="space-y-1">
            {data.languages.map((language, index) => (
              <div key={index} className="text-sm">
                • {language.language}
                {language.proficiency ? ` – ${language.proficiency}` : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}