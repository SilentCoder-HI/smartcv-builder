"use client"

import React, { useRef } from "react"
import { usePathname } from "next/navigation"
import NotFound from "@/components/notFound"
import type { CVData } from "@/types/cv-types"

// Import all templates
import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack"
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue"
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern"
import { CorporateFormal } from "@/components/cv-templates/Corporate/CorporateFormal"
import { CreativeColorful } from "@/components/cv-templates/Creative/CreativeColorful"
import { CreativePortfolio } from "@/components/cv-templates/Creative/CreativePortfolio"
import { ElegantContrast } from "@/components/cv-templates/Elegant/ElegantContrast"
import { ElegantSerif } from "@/components/cv-templates/Elegant/ElegantSerif"
import MinimalSerif from "@/components/cv-templates/Minimal/MinimalSerif"
import MinimalWhite from "@/components/cv-templates/Minimal/MinimalWhite"
import ModernGrid from "@/components/cv-templates/Modern/ModernGrid"
import ModernDark from "@/components/cv-templates/Modern/ModernDark"
import ModernLight from "@/components/cv-templates/Modern/ModernLight"
import { ExportOptions } from "@/components/export-options"
import { setTemplate } from "@/store/templateSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

const templates: Record<string, React.FC<{ data: CVData; isPreview: boolean }>> = {
  "classic-black": ClassicBlack,
  "classic-blue": ClassicBlue,
  "corporate-modern": CorporateModern,
  "corporate-formal": CorporateFormal,
  "creative-colorful": CreativeColorful,
  "creative-portfolio": CreativePortfolio,
  "elegant-contrast": ElegantContrast,
  "elegant-serif": ElegantSerif,
  "minimal-serif": MinimalSerif,
  "minimal-white": MinimalWhite,
  "modern-grid": ModernGrid,
  "modern-dark": ModernDark,
  "modern-light": ModernLight,
}

function Page() {
  const pathname = usePathname()
  const templateId = pathname.split("/").pop() || ""
  const mainRef = useRef<HTMLDivElement>(null)
  
  if (!templateId || !(templateId in templates)) {
    return <NotFound />
  }
  const handleSelectTemplate = () => {
    dispatch(setTemplate(templateId));
    router.push("/builder");
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const SelectedTemplate = templates[templateId]

  const sampleCV: CVData = {
    personalInfo: {
      fullName: "Jonathan E. Blake",
      email: "jonathan.blake@techmail.com",
      phone: "+1 (415) 987-6543",
      address: "500 Mission Street, San Francisco, CA",
      jobTitle: "Senior Frontend Architect",
      summary: `Innovative and performance-driven Senior Frontend Architect with 13+ years of progressive experience in designing, developing, and optimizing complex web platforms for enterprise and consumer-grade products. Adept at translating business goals into functional, elegant, and responsive user interfaces using modern JavaScript frameworks such as React, Next.js, and Vue. Experienced in leading frontend teams, mentoring junior developers, and collaborating with cross-functional stakeholders to ensure cohesive design and functionality. Proficient in architecting reusable component libraries, implementing scalable design systems, and ensuring accessibility (WCAG) compliance. Passionate about code quality, system performance, and delivering exceptional digital experiences that delight users and drive growth.`,
    },

    education: [
      {
        id: "edu-1",
        institution: "Massachusetts Institute of Technology (MIT)",
        degree: "Master of Science",
        field: "Human-Computer Interaction",
        startDate: "2010-09-01",
        endDate: "2012-06-01",
        gpa: "3.9",
      },
      {
        id: "edu-2",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2006-09-01",
        endDate: "2010-06-01",
        gpa: "3.8",
      },
    ],

    experience: [
      {
        id: "exp-1",
        company: "NextSphere Technologies",
        position: "Senior Frontend Architect",
        startDate: "2018-05-01",
        endDate: "Present",
        description: `Architected and led the development of enterprise-grade SPAs using React, TypeScript, and GraphQL. Collaborated with product teams and designers to develop component libraries and design systems that reduced dev time by 40%. Migrated legacy AngularJS apps to modern React/Next.js stack, significantly improving performance and user satisfaction. Mentored 8+ junior developers and established code review standards and frontend best practices.`,
        current: true,
      },
      {
        id: "exp-2",
        company: "BlueWave Solutions",
        position: "Lead Frontend Engineer",
        startDate: "2015-02-01",
        endDate: "2018-04-30",
        description: `Led the development of an internal CMS and B2B dashboard used by over 10,000 clients. Introduced TypeScript and modern testing frameworks (Jest, Cypress) into the development pipeline. Coordinated with backend teams to integrate REST and GraphQL APIs, improving data sync and frontend reliability.`,
        current: false,
      },
      {
        id: "exp-3",
        company: "BrightApps Inc.",
        position: "Frontend Developer",
        startDate: "2012-06-01",
        endDate: "2015-01-31",
        description: `Built responsive web applications using HTML5, CSS3, JavaScript, and jQuery. Participated in Agile sprints and collaborated with UX teams to implement mobile-first designs. Improved page load times by 30% through smart bundling and lazy loading strategies.`,
        current: false,
      },
    ],

    skills: [
      {
        category: "Frontend",
        items: [
          "React",
          "Next.js",
          "Vue.js",
          "TypeScript",
          "Redux Toolkit",
          "Tailwind CSS",
          "Storybook",
        ],
      },
      {
        category: "Backend & APIs",
        items: ["Node.js", "Express", "GraphQL", "REST APIs", "Firebase"],
      },
      {
        category: "DevOps & Tools",
        items: [
          "Docker",
          "Git",
          "GitHub Actions",
          "Vercel",
          "Webpack",
          "Jenkins",
          "CI/CD",
        ],
      },
      {
        category: "Testing & QA",
        items: ["Jest", "Cypress", "React Testing Library", "Playwright"],
      },
      {
        category: "Architecture & Design",
        items: [
          "Component Libraries",
          "Design Systems",
          "Atomic Design",
          "Accessibility (WCAG)",
          "Performance Optimization",
        ],
      },
    ],

    certifications: [
      "Google UX Design Professional Certificate – Coursera",
      "React & Redux Advanced – Udemy",
      "Frontend Architect Nanodegree – Udacity",
      "JavaScript Algorithms and Data Structures – freeCodeCamp",
      "Advanced TypeScript – Pluralsight",
    ],

    languages: [
      {
        language: "English",
        proficiency: "Native",
      },
      {
        language: "Spanish",
        proficiency: "Professional Working Proficiency",
      },
    ],

    hobbies: [
      "Photography (Street and Landscape)",
      "Chess (Online Blitz Rated ~2100)",
      "Tech Blogging (Medium & Dev.to)",
      "UI/UX Podcast Host",
      "Mentoring Junior Developers on GitHub",
    ],
  }


  return (
    <div>
      <ExportOptions
        cvData={sampleCV}
        selectedTemplate={templateId}
        onPrev={handleSelectTemplate}
        setSelectedTemplate={handleSelectTemplate}
        isBuilderMode={false}
      />
    </div>
  )
}

export default Page
