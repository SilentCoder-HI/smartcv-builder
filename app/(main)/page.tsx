"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, Transition, Easing } from "framer-motion";
import {
  FileText,
  Zap,
  Download,
  Sparkles,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/data/data";
import { CVData } from "@/types/cv-types";
import dynamic from "next/dynamic";

const TemplatePreview = dynamic(() => import("@/components/TemplatePreview"), {
  ssr: false, // Optional: skip server-side rendering if the component is heavy or client-only
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
  ),
});


// Fix: Use correct type for fadeIn, and use Easing type for ease
const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as Easing }, // cubic-bezier for "easeOut"
};

const mockCVData: CVData = {
  personalInfo: {
    fullName: "Jonathan E. Blake",
    email: "jonathan.blake@techmail.com",
    phone: "+1 (415) 987-6543",
    address: "500 Mission Street, San Francisco, CA",
    jobTitle: "Senior Frontend Architect",
    summary:
      "Innovative and performance-driven Senior Frontend Architect with 13+ years of progressive experience in designing, developing, and optimizing complex web platforms for enterprise and consumer-grade products. Adept at translating business goals into functional, elegant, and responsive user interfaces using modern JavaScript frameworks such as React, Next.js, and Vue. Experienced in leading frontend teams, mentoring junior developers, and collaborating with cross-functional stakeholders to ensure cohesive design and functionality. Proficient in architecting reusable component libraries, implementing scalable design systems, and ensuring accessibility (WCAG) compliance. Passionate about code quality, system performance, and delivering exceptional digital experiences that delight users and drive growth.",
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
      description:
        "Architected and led the development of enterprise-grade SPAs using React, TypeScript, and GraphQL. Collaborated with product teams and designers to develop component libraries and design systems that reduced dev time by 40%. Migrated legacy AngularJS apps to modern React/Next.js stack, significantly improving performance and user satisfaction. Mentored 8+ junior developers and established code review standards and frontend best practices.",
      current: true,
    },
    {
      id: "exp-2",
      company: "BlueWave Solutions",
      position: "Lead Frontend Engineer",
      startDate: "2015-02-01",
      endDate: "2018-04-30",
      description:
        "Led the development of an internal CMS and B2B dashboard used by over 10,000 clients. Introduced TypeScript and modern testing frameworks (Jest, Cypress) into the development pipeline. Coordinated with backend teams to integrate REST and GraphQL APIs, improving data sync and frontend reliability.",
      current: false,
    },
    {
      id: "exp-3",
      company: "BrightApps Inc.",
      position: "Frontend Developer",
      startDate: "2012-06-01",
      endDate: "2015-01-31",
      description:
        "Built responsive web applications using HTML5, CSS3, JavaScript, and jQuery. Participated in Agile sprints and collaborated with UX teams to implement mobile-first designs. Improved page load times by 30% through smart bundling and lazy loading strategies.",
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
};

export default function HomePage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const uniqueTemplates = Array.from(
    new Map(
      templates
        .filter(
          (t) =>
            t &&
            typeof t.id === "string" &&
            t.id.trim() !== "" &&
            typeof t.category === "string" &&
            t.category.trim() !== "" &&
            typeof t.description === "string" &&
            t.description.trim() !== ""
        )
        .map((t) => [t.id, t])
    ).values()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.section
        aria-label="Hero section with main headline and call to action"
        initial={fadeIn.initial}
        whileInView={fadeIn.whileInView}
        transition={fadeIn.transition}
        className="pt-24 pb-20 text-center max-w-5xl mx-auto px-6"
      >
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.1 }}
          className="mb-4"
        >
          <span className="inline-flex items-center px-4 py-1 rounded-full text-base font-semibold bg-blue-100 text-blue-800 shadow-sm">
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            AI-Powered Resume Magic
          </span>
        </motion.div>

        <motion.h1
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"
        >
          Write Your Future with a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">
            Smarter Resume
          </span>
        </motion.h1>

        <motion.p
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
          className="text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium"
        >
          Only 2% of resumes stand out. Yours should be one of them. Create a resume powered by AI and proven to impress.
        </motion.p>

        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto"
        >
          <Link href="/auth?mode=signin">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-5 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Create My Resume <Zap className="ml-3 h-6 w-6 animate-bounce" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-5 rounded-lg bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 shadow"
            >
              Try Demo
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row justify-center gap-12 text-gray-700 font-semibold text-lg max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <span className="text-5xl font-extrabold text-blue-600">39%</span>
            <span>More Likely to Get Hired</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-extrabold text-purple-600">8%</span>
            <span>Higher Salary Potential</span>
          </div>
        </motion.div>
      </motion.section>

      {/* Advanced Features Section */}
      <motion.section
        initial={fadeIn.initial}
        whileInView={fadeIn.whileInView}
        transition={fadeIn.transition}
        className="py-24 px-4 bg-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Land Your Dream Job</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to create, optimize, and manage your professional
              resume.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-12 w-12 text-blue-600 mb-4" />,
                title: "AI Writing Assistant",
                desc: "Get intelligent suggestions for content, grammar fixes, and power verbs to make your resume stand out.",
                cardBg: "from-blue-50 via-white to-blue-100",
                border: "border-blue-200 hover:border-blue-400",
                titleColor: "text-blue-900",
              },
              {
                icon: <FileText className="h-12 w-12 text-green-600 mb-4" />,
                title: "25+ Professional Templates",
                desc: "Choose from a wide variety of ATS-friendly templates designed by career experts.",
                cardBg: "from-green-50 via-white to-green-100",
                border: "border-green-200 hover:border-green-400",
                titleColor: "text-green-900",
              },
              {
                icon: <Download className="h-12 w-12 text-purple-600 mb-4" />,
                title: "Multiple Export Formats",
                desc: "Export your resume as PDF or Word document with perfect formatting preserved.",
                cardBg: "from-purple-50 via-white to-purple-100",
                border: "border-purple-200 hover:border-purple-400",
                titleColor: "text-purple-900",
              },
              {
                icon: <Users className="h-12 w-12 text-orange-600 mb-4" />,
                title: "Job Matching",
                desc: "Get AI-powered job recommendations and see how well your resume matches job descriptions.",
                cardBg: "from-orange-50 via-white to-orange-100",
                border: "border-orange-200 hover:border-orange-400",
                titleColor: "text-orange-900",
              },
              {
                icon: <Zap className="h-12 w-12 text-red-600 mb-4" />,
                title: "Real-time Preview",
                desc: "See your changes instantly with live preview and auto-save functionality.",
                cardBg: "from-red-50 via-white to-red-100",
                border: "border-red-200 hover:border-red-400",
                titleColor: "text-red-900",
              },
              {
                icon: <Star className="h-12 w-12 text-yellow-600 mb-4" />,
                title: "ATS Optimization",
                desc: "Ensure your resume passes Applicant Tracking Systems with our optimization suggestions.",
                cardBg: "from-yellow-50 via-white to-yellow-100",
                border: "border-yellow-200 hover:border-yellow-400",
                titleColor: "text-yellow-900",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className={`border-2 ${feature.border} transition-colors shadow-lg bg-gradient-to-br ${feature.cardBg} scale-100 hover:scale-105 duration-200`}
                style={{
                  boxShadow: "0 4px 24px 0 rgba(30, 64, 175, 0.08)",
                  borderRadius: "1.25rem",
                }}
              >
                <CardHeader className="p-8 flex flex-col items-center">
                  <div className="mb-3">{feature.icon}</div>
                  <CardTitle className={`text-2xl font-extrabold mb-2 text-center flex flex-col items-center ${feature.titleColor}`}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 mt-2 text-center text-lg font-medium">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Templates Section */}
      <motion.section
        initial={fadeIn.initial}
        whileInView={fadeIn.whileInView}
        transition={fadeIn.transition}
        className="py-24 px-4 bg-white"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Professional Templates</h2>
            <p className="text-xl text-gray-600">
              Choose from our ATS-friendly, professionally designed templates.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {uniqueTemplates.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg">No templates available.</div>
            ) : (
              uniqueTemplates
                .filter((template, idx, arr) =>
                  arr.findIndex(t => t.category === template.category) === idx
                )
                .map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden">
                      <div className="relative bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
                        <TemplatePreview cvData={mockCVData} selectedTemplate={template.id} />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{template.category}</h3>
                        <p className="text-gray-600">{template.description}</p>
                        <Link href={`/builder?template=${encodeURIComponent(template.id)}`}>
                          <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            Use This Template
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </motion.section>


      {/* Pricing Section */}
      <motion.section
        initial={fadeIn.initial}
        whileInView={fadeIn.whileInView}
        transition={fadeIn.transition}
        className="py-24 px-4 bg-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you need more features</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">
                  $0<span className="text-lg font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />3 Professional Templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    PDF Export
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />1 CV Profile
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Basic Job Board Access
                  </li>
                </ul>
                <Link href="/auth?mode=signup">
                  <Button className="w-full mt-6">Get Started Free</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For serious job seekers</CardDescription>
                <div className="text-3xl font-bold">
                  $4.99<span className="text-lg font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    25+ Premium Templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    AI Resume Assistant
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Word & PDF Export
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Unlimited CV Profiles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    AI Cover Letter Generator
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Job-CV Match Analyzer
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">Upgrade to Pro</Button>
              </CardContent>
            </Card>

            {/* Pro+ Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Pro+</CardTitle>
                <CardDescription>For career professionals</CardDescription>
                <div className="text-3xl font-bold">
                  $9.99<span className="text-lg font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Job Tracker & Notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    LinkedIn Data Sync
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Real-time Collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Priority Support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Upgrade to Pro+
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>


      {/* CTA Section */}
      {/* <motion.section
        initial={fadeIn.initial}
        whileInView={fadeIn.whileInView}
        transition={fadeIn.transition}
        className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">Start Crafting Your Standout Resume Today</h2>
          <p className="text-xl text-blue-100 mb-8">No design skills needed. Just smart AI tools.</p>
          <Link href="/builder">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-xl font-semibold shadow-lg">
              Build for Free <Zap className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </motion.section> */}

      <motion.section
        aria-label="Frequently Asked Questions"
        initial={fadeIn.initial}
        whileInView={fadeIn.whileInView}
        transition={fadeIn.transition}
        className="py-20 max-w-7xl mx-auto px-6"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Can’t find what you need yet? — View our customer support articles or career resources.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <details className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              What is Smart CV Builder?
            </summary>
            <p className="mt-3 text-gray-700">
              Smart CV Builder is an AI-powered web app that helps you create professional, ATS-friendly resumes and CVs in real-time. It offers a variety of templates, AI writing assistance, export options, and job matching tools.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Is Smart CV Builder free to use?
            </summary>
            <p className="mt-3 text-gray-700">
              Yes, Smart CV Builder has a free version that gives you access to all free templates (including 3 professional ones), manual resume building, PDF export, real-time preview, live auto-save, LinkedIn profile linking, and limited job board access. More advanced features and premium templates are available with paid plans.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              How does the AI help me write my resume?
            </summary>
            <p className="mt-3 text-gray-700">
              The AI in Smart CV Builder can generate, correct, and optimize your resume content. It provides resume writing, cover letter generation, grammar and tone suggestions, and job-CV match analysis to help you stand out.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Is my data secure and private?
            </summary>
            <p className="mt-3 text-gray-700">
              Absolutely. Smart CV Builder encrypts your data, never shares your CVs without permission, and is fully GDPR-compliant to ensure your privacy and security.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Can I export my resume and in which formats?
            </summary>
            <p className="mt-3 text-gray-700">
              You can export your resume as a PDF for free. With a paid plan, you can also export as a Word (.docx) document, with all formatting preserved.
            </p>
          </details>
        </div>
      </motion.section>
    </div>
  );
}