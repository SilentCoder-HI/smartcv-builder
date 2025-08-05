"use client";

import React from "react";
import {
  FileText,
  Download,
  Bot,
  Briefcase,
  Trash2,
  Rocket,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Overview } from "./Overview";
// Types
type Resume = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
};

type Activity = {
  id: number;
  type: "created" | "exported" | "ai" | "matched";
  description: string;
  time: string;
};

const mockResumes: Resume[] = [
  {
    id: 1,
    title: "Modern Blue",
    description: "A clean and modern template with blue accents, perfect for tech and creative roles.",
    image: "https://storage.googleapis.com/a1aa/image/a4995430-eb2d-4380-0552-eb60b74e5eeb.jpg",
  },
  {
    id: 2,
    title: "Minimalist Black & White",
    description: "A minimalist template with black and white colors, ideal for corporate and formal applications.",
    image: "https://storage.googleapis.com/a1aa/image/4c6f2729-521d-4b24-35cf-c506f23c6315.jpg",
  },
  {
    id: 3,
    title: "Creative Colorful",
    description: "A creative and colorful template with sidebars and icons, great for designers and marketers.",
    image: "https://storage.googleapis.com/a1aa/image/8336152f-f46a-464c-b17b-0bee48048976.jpg",
  },
];

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    salary: "$70,000 - $90,000",
    matchScore: 87,
  },
  {
    id: 2,
    title: "Marketing Specialist",
    company: "Creative Agency",
    location: "New York, NY",
    salary: "$50,000 - $65,000",
    matchScore: 72,
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Finance Corp.",
    location: "San Francisco, CA",
    salary: "$80,000 - $100,000",
    matchScore: 60,
  },
];

const mockActivities: Activity[] = [
  { id: 1, type: "created", description: 'Created new resume "Modern Blue"', time: "2 hours ago" },
  { id: 2, type: "exported", description: 'Exported resume "Minimalist Black & White" as PDF', time: "1 day ago" },
  { id: 3, type: "ai", description: "Used AI to improve summary section", time: "3 days ago" },
  { id: 4, type: "matched", description: "Matched resume with 3 new jobs", time: "5 days ago" },
];

export default function Dashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="max-w-7xl py-5 px-6 sm:px-5 bg-white dark:bg-gray-950">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1 text-gray-600 dark:text-gray-400">
          Welcome to your Smart CV Builder dashboard. Here’s a quick overview of your activity and stats.
        </p>
      </div>
      <Overview/>

      {/* Resume Templates */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your Resumes</h3>
          <Button
            onClick={() => onNavigate("/my-cvs")}
            className="flex items-center gap-2 justify-center"
            variant="secondary"
          >
            View All
            <ChevronRight size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResumes.map((resume) => (
            <article
              key={resume.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow flex flex-col border border-gray-100 dark:border-gray-800"
            >
              <img
                src={resume.image}
                alt={resume.title}
                className="rounded-t-lg object-cover w-full h-48"
                style={{ backgroundColor: "#f3f4f6" }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">{resume.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">{resume.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors">
                    Edit
                  </button>
                  <div className="flex gap-2 items-center">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="mb-10 bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-gray-700 dark:text-gray-300">
            You have used <span className="text-blue-600 dark:text-blue-400 font-semibold">{1}</span> AI suggestions this month. Upgrade for unlimited assistance.
          </p>
          <button className="px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded hover:bg-blue-700 dark:hover:bg-blue-800 flex items-center transition-colors">
            <Rocket className="inline-block mr-2" size={18} /> Upgrade
          </button>
        </div>
      </section>

      {/* Job Matches */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Job Matches</h3>
          <Button
            onClick={() => onNavigate("/resume-matches")}
            className="flex items-center gap-2"
            variant="secondary"
          >
            View All <ChevronRight size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <article
              key={job.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-800"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{job.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location: {job.location}</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Salary: {job.salary}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 font-semibold rounded">
                  Match Score: {job.matchScore}%
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center transition-colors"
                  >
                    View Job <ExternalLink className="ml-1 text-xs" size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-10 bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {mockActivities.map((activity) => (
            <li key={activity.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-full
                    ${
                      activity.type === "created"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        : activity.type === "exported"
                        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                        : activity.type === "ai"
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
                        : "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                    }`}
                >
                  {activity.type === "created" && <FileText size={20} />}
                  {activity.type === "exported" && <Download size={20} />}
                  {activity.type === "ai" && <Bot size={20} />}
                  {activity.type === "matched" && <Briefcase size={20} />}
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold">{activity.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors">
                  {activity.type === "ai" ? "View AI Suggestions" : "Edit"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
