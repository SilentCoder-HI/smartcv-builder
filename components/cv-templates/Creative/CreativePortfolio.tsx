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
    <div style={{ backgroundColor: "white", height: "100%", width: "100%", padding: "2.5rem", fontFamily: "monospace", color: "#1f2937" }}>
      {/* Header */}
      <div style={{ textAlign: "left", marginBottom: "2rem", borderLeft: "4px solid #a855f7", paddingLeft: "1rem" }}>
        <h1
          style={{ fontSize: "2.25rem", fontWeight: "900", color: "#7e22ce", cursor: isPreview ? "default" : "pointer" }}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          style={{ fontSize: "1.25rem", color: "#9333ea", marginTop: "0.25rem", cursor: isPreview ? "default" : "pointer" }}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem", color: "#4b5563", marginTop: "0.5rem" }}>
          {data.personalInfo.email && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Mail size={16} /> {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Phone size={16} /> {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.address && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <MapPin size={16} /> {data.personalInfo.address}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#7e22ce", textTransform: "uppercase" }}>Profile</h2>
          <p
            style={{ color: "#374151", lineHeight: "1.6", textAlign: "justify", cursor: isPreview ? "default" : "pointer" }}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary ?? "")}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#7e22ce", textTransform: "uppercase" }}>Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                <div>
                  <h3
                    style={{ fontSize: "1rem", fontWeight: "600", color: "#9333ea", cursor: isPreview ? "default" : "pointer" }}
                    onClick={() => handleClick(`experience.position.${exp.id}`, exp.position)}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{ fontSize: "0.875rem", fontStyle: "italic", color: "#4b5563", cursor: isPreview ? "default" : "pointer" }}
                    onClick={() => handleClick(`experience.company.${exp.id}`, exp.company)}
                  >
                    {exp.company}
                  </p>
                </div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
              </div>
              {exp.description && (
                <p
                  style={{ fontSize: "0.875rem", color: "#374151", cursor: isPreview ? "default" : "pointer" }}
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
        <div>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#7e22ce", textTransform: "uppercase" }}>Skills</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.skills.map((skillCategory, i) => (
              <div key={i}>
                <div style={{ fontWeight: 500, color: "#9333ea", fontSize: "1rem" }}>{skillCategory.category}</div>
                <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingLeft: 0, margin: 0 }}>
                  {skillCategory.items.map((skill, j) => (
                    <li
                      key={j}
                      style={{ backgroundColor: "#f3f4f6", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.875rem", color: "#374151", listStyle: "none" }}
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

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginTop: "2rem", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#7e22ce", textTransform: "uppercase" }}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#9333ea" }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>{edu.institution}</p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{edu.startDate} - {edu.endDate}</p>
              {edu.gpa && <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Languages and Hobbies */}
      {(Array.isArray(data.languages) && data.languages.length > 0) || (Array.isArray(data.hobbies) && data.hobbies.length > 0) ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {Array.isArray(data.languages) && data.languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#7e22ce", textTransform: "uppercase" }}>Languages</h2>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#374151", lineHeight: "1.6" }}>
                {data.languages.map((lang, i) => (
                  <li key={i}>
                    {lang.language}
                    {lang.proficiency ? ` – ${lang.proficiency}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#7e22ce", textTransform: "uppercase" }}>Hobbies</h2>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#374151", lineHeight: "1.6" }}>
                {data.hobbies.map((hobby, i) => (
                  <li key={i}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
