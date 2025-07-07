"use client"

import type { CVData } from "@/types/cv-types"
import { Mail, Phone, MapPin } from "lucide-react"

interface Props {
  data: CVData
  isPreview?: boolean
  onEdit?: (field: string, value: string) => void
  editingField?: string | null
}

export default function ClassicBlack({ data, isPreview = false, onEdit }: Props) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value)
    }
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "40px",
        fontFamily: "serif",
        color: "black",
        width: "100%",
        minHeight: "297mm",
        maxWidth: "210mm",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #d1d5db" }}>
        <h1
          style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "0.25rem", cursor: isPreview ? "default" : "pointer" }}
          onClick={() => handleClick("personalInfo.fullName", data.personalInfo.fullName)}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          style={{ fontSize: "1.125rem", fontStyle: "italic", marginBottom: "1rem", color: "#4b5563", cursor: isPreview ? "default" : "pointer" }}
          onClick={() => handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)}
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.875rem", color: "#4b5563" }}>
          {data.personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Mail style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Phone style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <MapPin style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "1px solid #d1d5db", paddingBottom: "0.25rem" }}>Professional Summary</h2>
          <p
            style={{ color: "#1f2937", lineHeight: 1.6, fontSize: "0.875rem", textAlign: "justify", cursor: isPreview ? "default" : "pointer" }}
            onClick={() => handleClick("personalInfo.summary", data.personalInfo.summary || "")}
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "1px solid #d1d5db", paddingBottom: "0.25rem" }}>Experience</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3
                      style={{ fontSize: "1rem", fontWeight: "bold", color: "black", cursor: isPreview ? "default" : "pointer" }}
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
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </p>
                    {exp.description && (
                      <p
                        style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#1f2937", lineHeight: 1.6, cursor: isPreview ? "default" : "pointer" }}
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
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "1px solid #d1d5db", paddingBottom: "0.25rem" }}>Education</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>{edu.institution}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {edu.startDate} – {edu.endDate}
                    </p>
                    {edu.gpa && <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                  borderBottom: "1px solid #d1d5db",
                  paddingBottom: "0.25rem",
                }}
              >
                Skills
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {data.skills.map((skillCategory, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#374151",
                        fontSize: "0.95rem",
                        marginBottom: "0.25rem"
                      }}
                    >
                      {skillCategory.category}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {Array.isArray(skillCategory.items) ? (
                        skillCategory.items.map((skill, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: "#f3f4f6",
                              fontSize: "0.875rem",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              color: "#1f2937",
                            }}
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#f3f4f6",
                            fontSize: "0.875rem",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            color: "#1f2937",
                          }}
                        >
                          {String(skillCategory.items)}
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
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "1px solid #d1d5db", paddingBottom: "0.25rem" }}>Certifications</h2>
              <ul style={{ listStyle: "disc", paddingLeft: "1rem", fontSize: "0.875rem", color: "#1f2937" }}>
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {Array.isArray(data.languages) && data.languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "1px solid #d1d5db", paddingBottom: "0.25rem" }}>Languages</h2>
              <ul style={{ listStyle: "disc", paddingLeft: "1rem", fontSize: "0.875rem", color: "#1f2937" }}>
                {data.languages.map((lang, index) => (
                  <li key={index}>
                    {lang.language}
                    {lang.proficiency ? ` – ${lang.proficiency}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", borderBottom: "1px solid #d1d5db", paddingBottom: "0.25rem" }}>Hobbies</h2>
              <ul style={{ listStyle: "disc", paddingLeft: "1rem", fontSize: "0.875rem", color: "#1f2937" }}>
                {data.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
