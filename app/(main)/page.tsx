import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Zap, Download, Sparkles } from "lucide-react"
import TemplatePreview from "@/components/TemplatePreview"
import { CVData } from "@/types/cv-types"
import { templates } from "@/data/data"

export default function HomePage() {
  const mockCVData: CVData = {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered CV Builder
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Resume</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Choose from stunning
            templates or let AI design one for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Building Free
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={"/templates"}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SmartCV Builder?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a standout resume that gets you hired
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Content</h3>
                <p className="text-gray-600">
                  Let AI generate professional content tailored to your job title and experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Professional Templates</h3>
                <p className="text-gray-600">Choose from modern, minimal, and classic designs that pass ATS systems.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Easy Export</h3>
                <p className="text-gray-600">Download your resume as PDF or Word document with one click.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Build your perfect resume in just 4 simple steps</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Enter Your Information",
                description: "Fill in your personal details, work experience, education, and skills.",
              },
              {
                step: 2,
                title: "Choose Your Style",
                description: "Select from pre-designed templates or let AI create a custom layout.",
              },
              {
                step: 3,
                title: "Preview & Customize",
                description: "See your resume in real-time and make adjustments as needed.",
              },
              {
                step: 4,
                title: "Download & Apply",
                description: "Export your resume as PDF or Word and start applying to jobs.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Templates</h2>
            <p className="text-xl text-gray-600">
              Choose from our collection of ATS-friendly, professionally designed templates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from(
              new Map(
                templates.map((template) => [template.category, template])
              ).values()
            ).map((template, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <TemplatePreview cvData={mockCVData} selectedTemplate={template.id} />

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{template.category}</h3>
                  <p className="text-gray-600">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Perfect Resume?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have landed their dream jobs with SmartCV Builder
          </p>
          <Link href="/builder">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Start Building Now
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
