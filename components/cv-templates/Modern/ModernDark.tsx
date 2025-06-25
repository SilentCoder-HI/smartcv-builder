"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import type { CVData } from "@/types/cv-types";

interface Props {
  data: CVData;
  isPreview?: boolean;
  onEdit?: (field: string, value: string) => void;
  editingField?: string | null;
}

export default function ModernDark({ data, isPreview = false, onEdit }: Props) {
  const handleClick = (field: string, value: string) => {
    if (!isPreview && onEdit) {
      onEdit(field, value);
    }
  };

  const textHoverStyle = !isPreview
    ? {
      cursor: "pointer",
      backgroundColor: "#1f2937", // dark gray-800
      padding: "4px",
      borderRadius: "4px",
    }
    : {};

  return (
    <div
      style={{
        backgroundColor: "#111827", // gray-900
        color: "#fff",
        minHeight: "100%",
        width: "100%",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #374151", // gray-700
          paddingBottom: "24px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "4px",
            ...(textHoverStyle as React.CSSProperties),
          }}
          onClick={() =>
            handleClick("personalInfo.fullName", data.personalInfo.fullName)
          }
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#D1D5DB", // gray-300
            marginBottom: "12px",
            ...(textHoverStyle as React.CSSProperties),
          }}
          onClick={() =>
            handleClick("personalInfo.jobTitle", data.personalInfo.jobTitle)
          }
        >
          {data.personalInfo.jobTitle || "Job Title"}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            color: "#9CA3AF", // gray-400
            fontSize: "14px",
          }}
        >
          {data.personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Mail size={16} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Phone size={16} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={16} />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
            Professional Summary
          </h2>
          <p
            style={{
              color: "#D1D5DB",
              lineHeight: "1.6",
              ...(textHoverStyle as React.CSSProperties),
            }}
            onClick={() =>
              handleClick("personalInfo.summary", data.personalInfo.summary)
            }
          >
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontWeight: "bold",
                  ...(textHoverStyle as React.CSSProperties),
                }}
                onClick={() =>
                  handleClick(`experience.position.${exp.id}`, exp.position)
                }
              >
                {exp.position}
              </h3>
              <p
                style={{
                  fontStyle: "italic",
                  color: "#D1D5DB",
                  ...(textHoverStyle as React.CSSProperties),
                }}
                onClick={() =>
                  handleClick(`experience.company.${exp.id}`, exp.company)
                }
              >
                {exp.company}
              </p>
              <p style={{ fontSize: "14px", color: "#6B7280" }}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
              {exp.description && (
                <p
                  style={{
                    marginTop: "8px",
                    color: "#D1D5DB",
                    fontSize: "14px",
                    ...(textHoverStyle as React.CSSProperties),
                  }}
                  onClick={() =>
                    handleClick(`experience.description.${exp.id}`, exp.description)
                  }
                >
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "20px" }}>
              <h3 style={{ fontWeight: "600" }}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </h3>
              <p style={{ color: "#D1D5DB" }}>{edu.institution}</p>
              <p style={{ fontSize: "14px", color: "#6B7280" }}>
                {edu.startDate} - {edu.endDate}
              </p>
              {edu.gpa && (
                <p style={{ fontSize: "14px", color: "#6B7280" }}>GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
            Skills:
          </h2>
          <ul style={{ margin: 0 }}>
            {data.skills.map((skillObj, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "15px" }}>
                  {skillObj.category}:
                </strong>{" "}
                <span style={{ fontSize: "14px" }}>
                  {Array.isArray(skillObj.items) ? skillObj.items.join(", ") : String(skillObj.items)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
            Certifications
          </h2>
          <ul style={{ paddingLeft: "20px", color: "#D1D5DB" }}>
            {data.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages & Hobbies */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
              Languages
            </h2>
            <ul style={{ paddingLeft: "20px", color: "#D1D5DB" }}>
              {data.languages.map((lang, i) => (
                <li key={i}>
                  {lang.language}{" "}
                  <span style={{ color: "#9CA3AF" }}>({lang.proficiency})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.hobbies.length > 0 && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
              Interests
            </h2>
            <ul style={{ paddingLeft: "20px", color: "#D1D5DB" }}>
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
