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
  onTextClick?: (path: string, value: string) => void;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  template,
  cvData = {},
  width,
  height,
  customColors = {},
  onTextClick,
}) => {
  const styles = template?.styles ?? {};
  const personalInfo = cvData?.personalInfo ?? {};
  const experience = Array.isArray(cvData?.experience) ? cvData.experience : [];
  const education = Array.isArray(cvData?.education) ? cvData.education : [];
  const skills = Array.isArray(cvData?.skills) ? cvData.skills : [];
  const certifications = Array.isArray(cvData?.certifications) ? cvData.certifications : [];
  const languages = Array.isArray(cvData?.languages) ? cvData.languages : [];
  const hobbies = Array.isArray(cvData?.hobbies) ? cvData.hobbies : [];

  // Extract new props from customColors
  const {
    mainHeadingColor,
    secmainHeadingColor,
    secsubHeadingColor,
    textColor,
    backgroundColor,
    skillItemBg,
  } = customColors;

  const handleTextClick = (path: string, value: string) => {
    if (onTextClick) {
      onTextClick(path, value);
    }
  };

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
      <div style={styles.header?.wrapper}>
        {/* 🟦 Full Name */}
        <h1
          style={{
            ...styles.header?.h1,
            color: mainHeadingColor ?? styles.header?.h1?.color,
          }}
          onClick={() => handleTextClick('personalInfo.fullName', personalInfo.fullName ?? '')}
          className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
        >
          {personalInfo.fullName}
        </h1>

        {/* 🟦 Job Title */}
        <div
          style={{
            ...styles.header?.jobTitle,
            color: secmainHeadingColor ?? styles.header?.jobTitle?.color,
          }}
          onClick={() => handleTextClick('personalInfo.jobTitle', personalInfo.jobTitle ?? '')}
          className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
        >
          {personalInfo.jobTitle}
        </div>

        {/* 🟦 Contact Info */}
        <div style={styles.header?.contact?.container}>
          {/* 📧 Email */}
          {personalInfo.email && (
            <div
              style={{
                ...styles.header?.contact?.item,
                color: secsubHeadingColor ?? styles.header?.contact?.item?.color,
              }}
              onClick={() => handleTextClick('personalInfo.email', personalInfo.email ?? '')}
              className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
            >
              <span style={styles.header?.contact?.icon}>📧</span>
              {personalInfo.email}
            </div>
          )}

          {/* 📞 Phone */}
          {personalInfo.phone && (
            <div
              style={{
                ...styles.header?.contact?.item,
                color: secsubHeadingColor ?? styles.header?.contact?.item?.color,
              }}
              onClick={() => handleTextClick('personalInfo.phone', personalInfo.phone ?? '')}
              className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
            >
              <span style={styles.header?.contact?.icon}>📞</span>
              {personalInfo.phone}
            </div>
          )}

          {/* 📍 Address */}
          {personalInfo.address && (
            <div
              style={{
                ...styles.header?.contact?.item,
                color: secsubHeadingColor ?? styles.header?.contact?.item?.color,
              }}
              onClick={() => handleTextClick('personalInfo.address', personalInfo.address ?? '')}
              className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
            >
              <span style={styles.header?.contact?.icon}>📍</span>
              {personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* === 📘 MAIN HEADING: Summary === */}
      {personalInfo.summary && (
        <div>
          <div
            style={{
              ...styles.summary?.sectionTitle,
              color: secmainHeadingColor ?? styles.summary?.sectionTitle?.color,
            }}
          >
            Professional Summary
          </div>
          <div
            style={{
              ...styles.summary?.summaryText,
              color: textColor ?? styles.summary?.summaryText?.color,
            }}
            onClick={() => handleTextClick('personalInfo.summary', personalInfo.summary ?? '')}
            className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
          >
            {personalInfo.summary}
          </div>
        </div>
      )}

      {/* === 📘 MAIN HEADING: Experience === */}
      {experience.length > 0 && (
        <div>
          <div
            style={{
              ...styles.experience?.sectionTitle,
              color: secmainHeadingColor ?? styles.experience?.sectionTitle?.color,
            }}
          >
            Experience
          </div>
          <div style={styles.layout?.experienceList}>
            {experience.map((exp: any) => (
              <div key={exp.id}>
                {/* 🟦 Position + Company */}
                <h3
                  style={{
                    ...styles.experience?.h3,
                    color: secsubHeadingColor ?? styles.experience?.h3?.color,
                  }}
                  onClick={() => handleTextClick(`experience.${exp.id}.position`, exp.position ?? '')}
                  className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
                >
                  {exp.position} - {exp.company}
                </h3>

                {/* 🟦 Dates */}
                <h4
                  style={{
                    ...styles.experience?.h4,
                    color: textColor ?? styles.experience?.h4?.color,
                  }}
                >
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString()} –{" "}
                  {exp.current
                    ? "Present"
                    : exp.endDate && new Date(exp.endDate).toLocaleDateString()}
                </h4>

                {/* 🟦 Description */}
                {exp.description && (
                  <div
                    style={{
                      ...styles.experience?.summaryText,
                      color: textColor ?? styles.experience?.summaryText?.color,
                    }}
                    onClick={() => handleTextClick(`experience.${exp.id}.description`, exp.description ?? '')}
                    className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
                  >
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === 📘 MAIN HEADING: Education === */}
      {education.length > 0 && (
        <div>
          <div
            style={{
              ...styles.education?.sectionTitle,
              color: secmainHeadingColor ?? styles.education?.sectionTitle?.color,
            }}
          >
            Education
          </div>
          <div style={styles.layout?.educationList}>
            {education.map((edu: any) => (
              <div key={edu.id}>
                {/* 🟦 Degree + Field */}
                <h3
                  style={{
                    ...styles.education?.h3,
                    color: secsubHeadingColor ?? styles.education?.h3?.color,
                  }}
                  onClick={() => handleTextClick(`education.${edu.id}.degree`, edu.degree ?? '')}
                  className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
                >
                  {edu.degree} in {edu.field}
                </h3>

                {/* 🟦 Institution */}
                <h4
                  style={{
                    ...styles.education?.h4,
                    color: secsubHeadingColor ?? styles.education?.h4?.color,
                  }}
                  onClick={() => handleTextClick(`education.${edu.id}.institution`, edu.institution ?? '')}
                  className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
                >
                  {edu.institution}
                </h4>

                {/* 🟦 Dates */}
                <div
                  style={{
                    ...styles.education?.dateText,
                    color: textColor ?? styles.education?.dateText?.color,
                  }}
                >
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString()} –{" "}
                  {edu.endDate && new Date(edu.endDate).toLocaleDateString()}
                </div>

                {/* 🟦 GPA */}
                {edu.gpa && (
                  <div
                    style={{
                      ...styles.education?.gpaText,
                      color: textColor ?? styles.education?.gpaText?.color,
                    }}
                    onClick={() => handleTextClick(`education.${edu.id}.gpa`, edu.gpa ?? '')}
                    className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
                  >
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === 📘 MAIN HEADING: Skills === */}
      {skills.length > 0 && (
        <div>
          <div
            style={{
              ...styles.skills?.sectionTitle,
              color: secmainHeadingColor ?? styles.skills?.sectionTitle?.color,
            }}
          >
            Skills
          </div>
          {skills.map((group: any, i: number) => (
            <div key={i}>
              {/* 🟦 Category Title */}
              <div
                style={{
                  ...styles.skills?.skillCategory,
                  color: secsubHeadingColor ?? styles.skills?.skillCategory?.color,
                }}
                onClick={() => handleTextClick(`skills.${i}.category`, group.category ?? '')}
                className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
              >
                {group.category}
              </div>

              {/* 🟦 Skills List */}
              <div style={styles.skills?.container}>
                {Array.isArray(group.items) && group.items.map((skill: string, j: number) => (
                  <span
                    key={j}
                    style={{
                      ...styles.skills?.skillItem,
                      backgroundColor: skillItemBg ?? styles.skills?.skillItem?.backgroundColor,
                      color: textColor ?? styles.skills?.skillItem?.color,
                    }}
                    onClick={() => handleTextClick(`skills.${i}.items.${j}`, skill ?? '')}
                    className={onTextClick ? 'cursor-pointer hover:bg-gray-200' : ''}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === 📘 MAIN HEADING: Certifications === */}
      {certifications.length > 0 && (
        <div>
          <div
            style={{
              ...styles.certifications?.sectionTitle,
              color: secmainHeadingColor ?? styles.certifications?.sectionTitle?.color,
            }}
          >
            Certifications
          </div>
          <ul style={styles.certifications?.list}>
            {certifications.map((cert: string, i: number) => (
              <li
                key={i}
                style={{ color: textColor ?? styles.certifications?.list?.color }}
                onClick={() => handleTextClick(`certifications.${i}`, cert ?? '')}
                className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* === 📘 MAIN HEADING: Languages === */}
      {languages.length > 0 && (
        <div>
          <div
            style={{
              ...styles.languages?.sectionTitle,
              color: secmainHeadingColor ?? styles.languages?.sectionTitle?.color,
            }}
          >
            Languages
          </div>
          <ul style={styles.languages?.list}>
            {languages.map((lang: any, i: number) => (
              <li
                key={i}
                style={{ color: textColor ?? styles.languages?.list?.color }}
                onClick={() => handleTextClick(`languages.${i}.language`, lang.language ?? '')}
                className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
              >
                {lang.language} — {lang.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* === 📘 MAIN HEADING: Hobbies === */}
      {hobbies.length > 0 && (
        <div>
          <div
            style={{
              ...styles.hobbies?.sectionTitle,
              color: secmainHeadingColor ?? styles.hobbies?.sectionTitle?.color,
            }}
          >
            Hobbies
          </div>
          <ul style={styles.hobbies?.list}>
            {hobbies.map((hobby: string, i: number) => (
              <li
                key={i}
                style={{ color: textColor ?? styles.hobbies?.list?.color }}
                onClick={() => handleTextClick(`hobbies.${i}`, hobby ?? '')}
                className={onTextClick ? 'cursor-pointer hover:bg-gray-100' : ''}
              >
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemplateRenderer;