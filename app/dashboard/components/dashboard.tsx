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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
type Resume = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string;
  views: number;
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

// Sample mock CV data for demonstration
const sampleCVs: Resume[] = [
  {
    id: "1",
    title: "Software Engineer Resume",
    description: "A detailed resume for software engineering roles.",
    image: "/images/cv1.png",
    status: "active",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-07-01T15:00:00Z",
    lastUsedAt: "2024-08-10T08:30:00Z",
    views: 120,
  },
  {
    id: "2",
    title: "Product Manager Resume",
    description: "Resume tailored for product management positions.",
    image: "/images/cv2.png",
    status: "draft",
    createdAt: "2023-12-10T10:00:00Z",
    updatedAt: "2024-06-15T09:30:00Z",
    lastUsedAt: "2024-07-20T11:00:00Z",
    views: 80,
  },
  {
    id: "3",
    title: "Graphic Designer Resume",
    description: "Creative resume for graphic design roles.",
    image: "/images/cv3.png",
    status: "active",
    createdAt: "2024-02-05T14:20:00Z",
    updatedAt: "2024-08-05T10:00:00Z",
    lastUsedAt: "2024-08-10T12:00:00Z",
    views: 95,
  },
];

// Helper: get the N most recent CVs
const getRecentCVs = (cvs: Resume[], count = 3): Resume[] => {
  return [...cvs]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, count);
};

// Helper: get metrics from CVs
function getMetricsFromCVs(cvs: Resume[]) {
  const totalCVs = cvs.length;
  const avgViews = totalCVs
    ? Math.round(
        cvs.reduce((sum, cv) => sum + (typeof cv.views === "number" ? cv.views : 0), 0) / totalCVs
      )
    : 0;
  const applications = cvs.reduce((sum, cv) => sum + (typeof cv.views === "number" ? cv.views : 0), 0);

  return [
    {
      label: "Total CVs",
      value: totalCVs.toString(),
      icon: FileText,
      trend: "up",
      change: totalCVs > 1 ? `+${totalCVs - 1} from last month` : "+0 from last month",
      badgeColor: "success",
      iconClass: "h-5 w-5 text-[#3b82f6]",
    },
    {
      label: "Avg Match Score",
      value: avgViews + "%",
      icon: Sparkles,
      trend: "up",
      change: avgViews > 0 ? `+${Math.round(avgViews * 0.1)} from last week` : "+0 from last week",
      badgeColor: "success",
      iconClass: "h-5 w-5 text-[#f59e42]",
    },
    {
      label: "Jobs Saved",
      value: applications.toString(),
      icon: Briefcase,
      trend: "up",
      change: applications > 0 ? `+${Math.round(applications * 0.2)} this week` : "+0 this week",
      badgeColor: "success",
      iconClass: "h-5 w-5 text-[#10b981]",
    },
  ];
}

// Use sampleCVs for resumes - get 3 most recent
const recentResumes = getRecentCVs(sampleCVs, 3);

// Mock Jobs data
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

// Mock Activities based on recent resumes
const mockActivities: Activity[] = recentResumes.map((cv, idx) => ({
  id: idx + 1,
  type: idx === 0 ? "created" : idx === 1 ? "exported" : "matched",
  description:
    idx === 0
      ? `Created new resume "${cv.title}"`
      : idx === 1
      ? `Exported resume "${cv.title}" as PDF`
      : `Matched resume "${cv.title}" with ${Math.floor(Math.random() * 5) + 1} new jobs`,
  time: idx === 0 ? "2 hours ago" : idx === 1 ? "1 day ago" : "3 days ago",
}));

const metricsData = getMetricsFromCVs(sampleCVs);

export default function Dashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const aiSuggestionsUsed = 1; // This can be dynamic

  return (
    <div className="max-w-7xl py-8 px-6 sm:px-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#22223b] dark:text-white mb-2 tracking-tight">
          Dashboard
        </h1>
        <p className="text-lg text-[#64748b] dark:text-gray-400">
          Welcome back! Here’s a summary of your Smart CV Builder activity.
        </p>
      </div>

      {/* Metrics */}
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        {metricsData.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={`flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 ${
                idx === 0
                  ? "border-l-4 border-[#3b82f6]"
                  : idx === 1
                  ? "border-l-4 border-[#f59e42]"
                  : "border-l-4 border-[#10b981]"
              }`}
            >
              <div
                className={`rounded-xl p-3 flex items-center justify-center ${
                  idx === 0 ? "bg-[#e0edfd]" : idx === 1 ? "bg-[#fff7e6]" : "bg-[#e6f9f3]"
                } dark:bg-gray-800`}
              >
                <Icon className={metric.iconClass} />
              </div>
              <div>
                <div
                  className={`text-xs font-bold uppercase tracking-wider ${
                    idx === 0 ? "text-[#3b82f6]" : idx === 1 ? "text-[#f59e42]" : "text-[#10b981]"
                  }`}
                >
                  {metric.label}
                </div>
                <div className="text-3xl font-extrabold text-[#22223b] dark:text-white leading-tight">
                  {metric.value}
                </div>
                <div className="text-xs text-[#64748b] dark:text-gray-400 font-medium">
                  {metric.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resume Templates */}
      <section className="mb-12">
        {recentResumes.length === 0 ? (
          <div className="text-center text-[#8a8fa3] dark:text-gray-400 py-16 text-lg font-medium select-none">
            No CVs found for the selected filters.
            <button
              onClick={() => onNavigate("/my-cvs")}
              className="mt-4 block mx-auto text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-[#22223b] dark:text-white">Your Resumes</h3>
              <Button
                onClick={() => onNavigate("/my-cvs")}
                className="flex items-center gap-2 justify-center bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-5 py-2 rounded-lg shadow"
                variant="secondary"
              >
                View All
                <ChevronRight size={18} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {recentResumes.map((resume) => (
                <article
                  key={resume.id}
                  className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col border-0 hover:shadow-xl transition-all duration-200 ${
                    resume.status === "draft"
                      ? "border-l-4 border-[#f59e42]"
                      : "border-l-4 border-[#10b981]"
                  }`}
                >
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-xl text-[#22223b] dark:text-white line-clamp-1">
                        {resume.title}
                      </h4>
                      <div className="rounded-xl p-2 flex items-center justify-center bg-[#e0edfd] dark:bg-gray-800">
                        <FileText className="w-6 h-6 text-[#1a73e8] dark:text-[#60a5fa]" />
                      </div>
                    </div>
                    <div className="text-[#64748b] dark:text-gray-400 text-sm mb-2 line-clamp-2">
                      {resume.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-[#f1f5f9] dark:bg-gray-800 text-[#22223b] dark:text-gray-300 rounded-lg font-semibold">
                        {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                      </span>
                      <span className="text-xs text-[#94a3b8] dark:text-gray-400">
                        Last used: {new Date(resume.lastUsedAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-[#94a3b8] dark:text-gray-400">
                        Views: {resume.views}
                      </span>
                    </div>
                    <div className="mt-auto flex gap-2 border-t border-[#e0e7ef] dark:border-gray-800 pt-3">
                      <button
                        type="button"
                        onClick={() => alert(`Editing: ${resume.title}`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#10b981] dark:text-[#4ade80] hover:bg-[#e6fbe6] dark:hover:bg-green-900 text-xs font-semibold transition hover:scale-105 transform"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Deleting: ${resume.title}`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#ea4335] dark:text-[#f87171] hover:bg-[#fdeaea] dark:hover:bg-red-900 text-xs font-semibold transition hover:scale-105 transform"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* AI Assistant Section */}
      <section className="mb-12 bg-gradient-to-r from-[#e0edfd] via-[#f8fafc] to-[#fff7e6] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-7 border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <p className="text-[#22223b] dark:text-white text-lg font-medium">
          You have used <span className="text-[#3b82f6] font-bold">{aiSuggestionsUsed}</span> AI suggestions this month.{" "}
          <span className="text-[#64748b] dark:text-gray-400">Upgrade for unlimited assistance.</span>
        </p>
        <button className="px-7 py-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold rounded-lg shadow flex items-center gap-2 hover:scale-105 transition-transform">
          <Rocket className="inline-block" size={20} /> Upgrade
        </button>
      </section>

      {/* Job Matches */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-bold text-[#22223b] dark:text-white">Job Matches</h3>
          <Button
            onClick={() => onNavigate("/resume-matches")}
            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-5 py-2 rounded-lg shadow"
            variant="secondary"
          >
            View All <ChevronRight size={18} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {mockJobs.map((job) => (
            <article
              key={job.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border-0 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
            >
              <div>
                <h4 className="text-xl font-bold text-[#22223b] dark:text-white mb-1">{job.title}</h4>
                <p className="text-[#64748b] dark:text-gray-400">{job.company}</p>
                <p className="text-sm text-[#94a3b8] dark:text-gray-400 mb-1">Location: {job.location}</p>
                <p className="text-sm font-semibold text-[#10b981] dark:text-[#34d399]">Salary: {job.salary}</p>
              </div>
              <div className="mt-5 flex justify-between items-center">
                <span className="text-xs px-3 py-1 bg-[#e6f9f3] dark:bg-gray-800 text-[#10b981] dark:text-[#34d399] font-bold rounded-lg">
                  Match Score: {job.matchScore}%
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="text-[#3b82f6] hover:text-[#2563eb] font-semibold flex items-center transition-colors"
                  >
                    View Job <ExternalLink className="ml-1 text-xs" size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-7 border-0">
        <h3 className="text-2xl font-bold text-[#22223b] dark:text-white mb-5">Recent Activity</h3>
        <ul className="divide-y divide-[#e0e7ef] dark:divide-gray-800">
          {mockActivities.map((activity) => (
            <li key={activity.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl flex items-center justify-center text-white
                    ${
                      activity.type === "created"
                        ? "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]"
                        : activity.type === "exported"
                        ? "bg-gradient-to-br from-[#10b981] to-[#059669]"
                        : activity.type === "ai"
                        ? "bg-gradient-to-br from-[#f59e42] to-[#fbbf24]"
                        : "bg-gradient-to-br from-[#a78bfa] to-[#6366f1]"
                    }`}
                >
                  {activity.type === "created" && <FileText size={22} />}
                  {activity.type === "exported" && <Download size={22} />}
                  {activity.type === "ai" && <Bot size={22} />}
                  {activity.type === "matched" && <Briefcase size={22} />}
                </div>
                <div>
                  <p className="text-[#22223b] dark:text-white font-semibold">{activity.description}</p>
                  <p className="text-sm text-[#94a3b8] dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[#3b82f6] hover:text-[#2563eb] font-semibold transition-colors px-3 py-1 rounded-lg bg-[#e0edfd] dark:bg-gray-800">
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
