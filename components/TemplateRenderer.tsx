"use client";

import React from "react";

interface TemplateRendererProps {
  template: any;
  cvData: any;
  width?: number;
  height?: number;
  customColors?: {
    mainHeadingColor?: string;
    secmainHeadingColor?: string;
    secsubHeadingColor?: string;
    textColor?: string;
    backgroundColor?: string;
    skillItemBg?: string;
  };
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  template,
  cvData,
  width,
  height,
  customColors = {},
}) => {
  const styles = template.styles;

  // Extract new props from customColors
  const {
    mainHeadingColor,
    secmainHeadingColor,
    secsubHeadingColor,
    textColor,
    backgroundColor,
    skillItemBg,
  } = customColors;

  return (
    <div
      style={{
        ...styles.root,
        backgroundColor: backgroundColor ?? styles.root?.backgroundColor,
        width: width ?? styles.root?.width,
        height: height ?? styles.root?.height,
      }}
    >
      {/* === 📘 MAIN HEADING: Header (Name, Job, Contact Info) === */}
      <div style={styles.header.wrapper}>
        {/* 🟦 Full Name */}
        <h1
          style={{
            ...styles.header.h1,
            color: mainHeadingColor ?? styles.header.h1?.color,
          }}
        >
          {cvData.personalInfo.fullName}
        </h1>

        {/* 🟦 Job Title */}
        <div
          style={{
            ...styles.header.jobTitle,
            color: secmainHeadingColor ?? styles.header.jobTitle?.color,
          }}
        >
          {cvData.personalInfo.jobTitle}
        </div>

        {/* 🟦 Contact Info */}
        <div style={styles.header.contact.container}>
          {/* 📧 Email */}
          <div
            style={{
              ...styles.header.contact.item,
              color: secsubHeadingColor ?? styles.header.contact.item?.color,
            }}
          >
            <span style={styles.header.contact.icon}>📧</span>
            {cvData.personalInfo.email}
          </div>

          {/* 📞 Phone */}
          <div
            style={{
              ...styles.header.contact.item,
              color: secsubHeadingColor ?? styles.header.contact.item?.color,
            }}
          >
            <span style={styles.header.contact.icon}>📞</span>
            {cvData.personalInfo.phone}
          </div>

          {/* 📍 Address */}
          <div
            style={{
              ...styles.header.contact.item,
              color: secsubHeadingColor ?? styles.header.contact.item?.color,
            }}
          >
            <span style={styles.header.contact.icon}>📍</span>
            {cvData.personalInfo.address}
          </div>
        </div>
      </div>

      {/* === 📘 MAIN HEADING: Summary === */}
      <div>
        <div
          style={{
            ...styles.summary.sectionTitle,
            color: secmainHeadingColor ?? styles.summary.sectionTitle?.color,
          }}
        >
          Professional Summary
        </div>
        <div
          style={{
            ...styles.summary.summaryText,
            color: textColor ?? styles.summary.summaryText?.color,
          }}
        >
          {cvData.personalInfo.summary}
        </div>
      </div>

      {/* === 📘 MAIN HEADING: Experience === */}
      <div>
        <div
          style={{
            ...styles.experience.sectionTitle,
            color: secmainHeadingColor ?? styles.experience.sectionTitle?.color,
          }}
        >
          Experience
        </div>
        <div style={styles.layout.experienceList}>
          {cvData.experience.map((exp: any) => (
            <div key={exp.id}>
              {/* 🟦 Position + Company */}
              <h3
                style={{
                  ...styles.experience.h3,
                  color: secsubHeadingColor ?? styles.experience.h3?.color,
                }}
              >
                {exp.position} - {exp.company}
              </h3>

              {/* 🟦 Dates */}
              <h4
                style={{
                  ...styles.experience.h4,
                  color: textColor ?? styles.experience.h4?.color,
                }}
              >
                {new Date(exp.startDate).toLocaleDateString()} –{" "}
                {exp.current
                  ? "Present"
                  : new Date(exp.endDate).toLocaleDateString()}
              </h4>

              {/* 🟦 Description */}
              <div
                style={{
                  ...styles.experience.summaryText,
                  color: textColor ?? styles.experience.summaryText?.color,
                }}
              >
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === 📘 MAIN HEADING: Education === */}
      <div>
        <div
          style={{
            ...styles.education.sectionTitle,
            color: secmainHeadingColor ?? styles.education.sectionTitle?.color,
          }}
        >
          Education
        </div>
        <div style={styles.layout.educationList}>
          {cvData.education.map((edu: any) => (
            <div key={edu.id}>
              {/* 🟦 Degree + Field */}
              <h3
                style={{
                  ...styles.education.h3,
                  color: secsubHeadingColor ?? styles.education.h3?.color,
                }}
              >
                {edu.degree} in {edu.field}
              </h3>

              {/* 🟦 Institution */}
              <h4
                style={{
                  ...styles.education.h4,
                  color: secsubHeadingColor ?? styles.education.h4?.color,
                }}
              >
                {edu.institution}
              </h4>

              {/* 🟦 Dates */}
              <div
                style={{
                  ...styles.education.dateText,
                  color: textColor ?? styles.education.dateText?.color,
                }}
              >
                {new Date(edu.startDate).toLocaleDateString()} –{" "}
                {new Date(edu.endDate).toLocaleDateString()}
              </div>

              {/* 🟦 GPA */}
              <div
                style={{
                  ...styles.education.gpaText,
                  color: textColor ?? styles.education.gpaText?.color,
                }}
              >
                GPA: {edu.gpa}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === 📘 MAIN HEADING: Skills === */}
      <div>
        <div
          style={{
            ...styles.skills.sectionTitle,
            color: secmainHeadingColor ?? styles.skills.sectionTitle?.color,
          }}
        >
          Skills
        </div>
        {cvData.skills.map((group: any, i: number) => (
          <div key={i}>
            {/* 🟦 Category Title */}
            <div
              style={{
                ...styles.skills.skillCategory,
                color: secsubHeadingColor ?? styles.skills.skillCategory?.color,
              }}
            >
              {group.category}
            </div>

            {/* 🟦 Skills List */}
            <div style={styles.skills.container}>
              {group.items.map((skill: string, j: number) => (
                <span
                  key={j}
                  style={{
                    ...styles.skills.skillItem,
                    backgroundColor:
                      skillItemBg ?? styles.skills.skillItem?.backgroundColor,
                    color: textColor ?? styles.skills.skillItem?.color,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* === 📘 MAIN HEADING: Certifications === */}
      <div>
        <div
          style={{
            ...styles.certifications.sectionTitle,
            color: secmainHeadingColor ?? styles.certifications.sectionTitle?.color,
          }}
        >
          Certifications
        </div>
        <ul style={styles.certifications.list}>
          {cvData.certifications.map((cert: string, i: number) => (
            <li
              key={i}
              style={{ color: textColor ?? styles.certifications.list?.color }}
            >
              {cert}
            </li>
          ))}
        </ul>
      </div>

      {/* === 📘 MAIN HEADING: Languages === */}
      <div>
        <div
          style={{
            ...styles.languages.sectionTitle,
            color: secmainHeadingColor ?? styles.languages.sectionTitle?.color,
          }}
        >
          Languages
        </div>
        <ul style={styles.languages.list}>
          {cvData.languages.map((lang: any, i: number) => (
            <li
              key={i}
              style={{ color: textColor ?? styles.languages.list?.color }}
            >
              {lang.language} — {lang.proficiency}
            </li>
          ))}
        </ul>
      </div>

      {/* === 📘 MAIN HEADING: Hobbies === */}
      <div>
        <div
          style={{
            ...styles.hobbies.sectionTitle,
            color: secmainHeadingColor ?? styles.hobbies.sectionTitle?.color,
          }}
        >
          Hobbies
        </div>
        <ul style={styles.hobbies.list}>
          {cvData.hobbies.map((hobby: string, i: number) => (
            <li
              key={i}
              style={{ color: textColor ?? styles.hobbies.list?.color }}
            >
              {hobby}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplateRenderer;
