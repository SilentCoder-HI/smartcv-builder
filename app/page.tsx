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
      fullName: "Ayaan Mirza",
      email: "ayaan.mirza@example.com",
      phone: "+1 (646) 555-0198",
      address: "Brooklyn, NY, United States",
      jobTitle: "Full Stack Developer",
      summary:
        "Results-driven Full Stack Developer with 3+ years of experience designing and implementing scalable web applications. Adept in modern JavaScript frameworks, cloud infrastructure, and RESTful API development. Passionate about writing clean, efficient code and solving complex problems.",
    },
    education: [
      {
        id: "edu1",
        institution: "New York Institute of Technology",
        degree: "Bachelor of Science",
        field: "Information Technology",
        startDate: "2019-09",
        endDate: "2023-06",
        gpa: "3.6",
      },
    ],
    experience: [
      {
        id: "exp1",
        company: "TechNova Solutions",
        position: "Frontend Developer",
        startDate: "2023-07",
        endDate: "2025-03",
        description:
          "Developed responsive interfaces using React and Tailwind CSS. Collaborated with designers to improve UI/UX. Implemented dynamic components and handled state management with Redux Toolkit.",
        current: false,
      },
      {
        id: "exp2",
        company: "CloudStack Innovations",
        position: "Full Stack Developer",
        startDate: "2025-04",
        endDate: "",
        description:
          "Building and maintaining scalable web apps using Next.js, Node.js, and PostgreSQL. Leading frontend integration and contributing to backend API development. Actively involved in code reviews and DevOps practices.",
        current: true,
      },
    ],
    skills: [
      {
        category: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Redux"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
      },
      {
        category: "DevOps & Tools",
        items: ["Docker", "Git", "GitHub Actions", "Vercel", "Jira"],
      },
    ],
    certifications: [
      "Certified JavaScript Developer – HackerRank",
      "AWS Cloud Practitioner – Amazon Web Services",
      "Frontend Developer Certification – freeCodeCamp",
    ],
    hobbies: ["Open-source contribution", "Reading tech blogs", "Photography"],
    languages: [
      {
        language: "English",
        proficiency: "Fluent",
      },
      {
        language: "Urdu",
        proficiency: "Native",
      },
    ],
  };
  
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
