"use client";

import React from "react";
import type { CVData } from "@/types/cv-types";

interface Props {
  data: CVData;
  isPreview?: boolean;
  onEdit?: (field: string, value: string) => void;
  editingField?: string | null;
}

const ModernDark: React.FC<Props> = ({ data, isPreview = false, onEdit }: Props) => {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value);
    }
  };

  const {
    personalInfo,
    education,
    experience,
    skills,
    certifications,
    languages,
    hobbies,
  } = data;

  const sectionStyle: React.CSSProperties = { marginBottom: "24px" };
  const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "1px solid #444",
    paddingBottom: "4px",
    marginBottom: "12px",
    color: "#f0f0f0",
  };
  const labelStyle: React.CSSProperties = { fontWeight: "bold", color: "#e0e0e0" };
  const listStyle: React.CSSProperties = { paddingLeft: "20px", margin: 0, color: "#ccc" };
  const containerStyle: React.CSSProperties = {
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#1e1e1e",
    padding: "40px",
    minHeight: "100%",
    fontFamily: "Arial, sans-serif",
    color: "#ccc",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "4px",
            cursor: !isPreview ? "pointer" : "default",
            color: "#fff",
          }}
          onClick={() =>
            handleClick("personalInfo.fullName", personalInfo.fullName)
          }
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p
          style={{
            fontSize: "18px",
            margin: "4px 0",
            cursor: !isPreview ? "pointer" : "default",
            color: "#ddd",
          }}
          onClick={() =>
            handleClick("personalInfo.jobTitle", personalInfo.jobTitle)
          }
        >
          {personalInfo.jobTitle || "Job Title"}
        </p>
        <p style={{ margin: "4px 0" }}>
          {personalInfo.email} | {personalInfo.phone}
        </p>
        <p style={{ margin: "4px 0" }}>{personalInfo.address}</p>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={sectionStyle}>
          <h2 style={titleStyle}>Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Left Column */}
        <div style={{ flex: "1", minWidth: "260px" }}>
          {/* Skills */}
          {skills?.length > 0 && (
            <section style={sectionStyle}>
              <h3 style={titleStyle}>Skills</h3>
              <ul style={listStyle}>
                {skills.map((skillObj, i) => (
                  <li key={i}>
                    <strong style={{ color: "#f0f0f0" }}>{
                      skillObj.category.charAt(0).toUpperCase() + skillObj.category.slice(1)
                    }:</strong>{" "}
                    {Array.isArray(skillObj.items) ? skillObj.items.join(", ") : String(skillObj.items)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section style={sectionStyle}>
              <h3 style={titleStyle}>Certifications</h3>
              <ul style={listStyle}>
                {certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {Array.isArray(languages) && languages.length > 0 && (
            <section style={sectionStyle}>
              <h3 style={titleStyle}>Languages</h3>
              <ul style={listStyle}>
                {languages.map((lang, i) => {
                  if (
                    typeof lang === "object" &&
                    lang !== null &&
                    "language" in lang &&
                    "proficiency" in lang
                  ) {
                    return (
                      <li key={i}>
                        {lang.language} – {lang.proficiency}
                      </li>
                    );
                  }
                  return <li key={i}>{String(lang)}</li>;
                })}
              </ul>
            </section>
          )}

          {/* Hobbies */}
          {hobbies?.length > 0 && (
            <section style={sectionStyle}>
              <h3 style={titleStyle}>Hobbies</h3>
              <ul style={listStyle}>
                {hobbies.map((hobby, i) => (
                  <li key={i}>{hobby}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          {/* Experience */}
          {experience?.length > 0 && (
            <section style={sectionStyle}>
              <h2 style={titleStyle}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={labelStyle}>
                      {exp.position} – {exp.company}
                    </div>
                    <div>
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section style={sectionStyle}>
              <h2 style={titleStyle}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={labelStyle}>
                      {edu.degree} in {edu.field}
                    </div>
                    <div>
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                  <p>{edu.institution}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernDark;
