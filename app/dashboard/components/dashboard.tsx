"use client";

import React, { useCallback } from "react";
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
import { CV } from "../data/data";
import { Job } from "@/types/jobs-types";
import LoadingSpinner from "./loading/loading";

type Activity = {
  id: number;
  type: "created" | "exported" | "ai" | "matched";
  description: string;
  time: string;
};

// Helper: get the N most recent CVs
const getRecentCVs = (cvs: any): CV[] => {
  let count = 3;
  return [...cvs]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, count);
};

// Remove HTML tags and normalize whitespace
function stripHTML(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// Helper: get metrics from CVs
function getMetricsFromCVs(cvs: CV[]) {
  const totalCVs = cvs.length;

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
      value: "0%",
      icon: Sparkles,
      trend: "up",
      change: "+0 from last week",
      badgeColor: "success",
      iconClass: "h-5 w-5 text-[#f59e42]",
    },
    {
      label: "Jobs Saved",
      value: "25",
      icon: Briefcase,
      trend: "up",
      change: 5 > 0 ? `+${Math.round(5 * 0.2)} this week` : "+0 this week",
      badgeColor: "success",
      iconClass: "h-5 w-5 text-[#10b981]",
    },
  ];
}

type MyDashboardProps = {
  cvs: CV[];
  allJobs: Job[];
  onNavigate: (path: string) => void;
  jobloading: [boolean, String];
};

// Shorten a string to a max length, clean whitespace, and add ellipsis if needed
function shortText(text: string, maxLen: number = 120): string {
  if (!text) return "";
  const clean = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  return clean.length <= maxLen ? clean : clean.slice(0, maxLen).trim() + "...";
}

// For job cards: ensure all titles and descriptions are the same height/width and responsive
const JOB_TITLE_MAX_LEN = 40;
const JOB_DESC_MAX_LEN = 140;

function uniformJobTitle(title: string): string {
  if (!title) return "";
  const clean = title.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  return clean.length <= JOB_TITLE_MAX_LEN
    ? clean
    : clean.slice(0, JOB_TITLE_MAX_LEN).trim() + "...";
}

function uniformJobDescription(desc: string): string {
  if (!desc) return "";
  const clean = desc.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  return clean.length <= JOB_DESC_MAX_LEN
    ? clean
    : clean.slice(0, JOB_DESC_MAX_LEN).trim() + "...";
}

export default function Dashboard({ cvs, onNavigate, allJobs, jobloading }: MyDashboardProps) {
  const aiSuggestionsUsed = 1; // This can be dynamic
  const metricsData = getMetricsFromCVs(cvs);
  const recentResumes = getRecentCVs(cvs);

  // Use the improved shortener for both resume and job descriptions
  const getShortDescription = useCallback((desc: string) => shortText(desc, 180), []);
  // Not used for jobs anymore, replaced by uniformJobDescription/uniformJobTitle

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
              className={`flex-1 rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-lg px-6 py-5 flex items-center gap-5 transition-all hover:scale-[1.025] hover:shadow-xl duration-200 ${idx === 0
                  ? "border-l-4 border-[#3b82f6]"
                  : idx === 1
                    ? "border-l-4 border-[#f59e42]"
                    : "border-l-4 border-[#10b981]"
                }`}
            >
              <div
                className={`rounded-xl p-3 flex items-center justify-center ${idx === 0
                    ? "bg-[#e0edfd]"
                    : idx === 1
                      ? "bg-[#fff7e6]"
                      : "bg-[#e6f9f3]"
                  } dark:bg-gray-800`}
              >
                <Icon className={metric.iconClass} />
              </div>
              <div>
                <div
                  className={`text-xs font-bold uppercase tracking-wider ${idx === 0
                      ? "text-[#3b82f6]"
                      : idx === 1
                        ? "text-[#f59e42]"
                        : "text-[#10b981]"
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
              Add New
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
              {recentResumes.map((cv) => (
                <article
                  key={cv.id}
                  className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col border-0 hover:shadow-xl transition-all duration-200 ${cv.status === "inactive"
                      ? "border-l-4 border-[#f59e42] dark:border-[#fbbf24]"
                      : "border-l-4 border-[#10b981] dark:border-[#34d399]"
                    }`}
                >
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Title and Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-xl text-[#22223b] dark:text-white line-clamp-1">
                        {cv.title}
                      </h4>
                      <div className="rounded-xl p-2 flex items-center justify-center bg-[#e0edfd] dark:bg-transparent">
                        <FileText className="w-6 h-6 text-[#1a73e8] dark:text-[#60a5fa]" />
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-[#64748b] dark:text-[#a3aed6] text-sm mb-2 line-clamp-2">
                      {cv.description}
                    </div>
                    {/* Dates */}
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="text-xs text-[#64748b] dark:text-[#a3aed6] flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#94a3b8] dark:text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm0 2V3h8v1H6zm-1 2h10v10H5V6z"></path></svg>
                        <span>{cv.createdAt ? new Date(cv.createdAt).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Unknown date"}</span>
                      </span>
                      <span className="text-xs text-[#94a3b8] dark:text-[#64748b] flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#94a3b8] dark:text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M12 8v4l3 1m5-5a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{cv.updatedAt ? new Date(cv.updatedAt).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Unknown date"}</span>
                      </span>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2 border-t border-[#e0e7ef] dark:border-[#23262f] pt-3">
                      <button
                        type="button"
                        onClick={() => alert(`Editing: ${cv.title}`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#10b981] dark:text-[#34d399] hover:bg-[#e6fbe6] dark:hover:bg-[#1e3a1e] text-xs font-semibold transition hover:scale-105 transform"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Deleting: ${cv.title}`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[#ea4335] dark:text-[#f87171] hover:bg-[#fdeaea] dark:hover:bg-[#3f1e1e] text-xs font-semibold transition hover:scale-105 transform"
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
            onClick={() => onNavigate("/job-search")}
            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-5 py-2 rounded-lg shadow"
            variant="secondary"
          >
            View All <ChevronRight size={18} />
          </Button>
        </div>
        {/* Job Loading and Error Handling */}
        {jobloading[0] ? (
          // Show loading spinner while loading
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner />
            <span className="mt-4 text-[#8a8fa3] dark:text-gray-400 text-lg font-medium select-none">
              Loading job matches...
            </span>
          </div>
        ) : jobloading[1] === "No CV found. Please create a new CV to see job recommendations." ? (
          // Show message and button to go to My CVs if no CVs found
          <div className="text-center text-[#8a8fa3] dark:text-gray-400 py-16 text-lg font-medium select-none">
            <span>
              No jobs found for your CVs. Please create or update your CV to get job recommendations.
            </span>
            <button
              onClick={() => onNavigate("/my-cvs")}
              className="mt-4 block mx-auto text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
            >
              Go to My CVs
            </button>
          </div>
        ) : (
          // Show job cards if jobs are available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {allJobs.slice(0, 3).map((job) => (
              <article
                key={job.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border-0 flex flex-col justify-between hover:shadow-xl transition-all duration-200 min-h-[260px] min-w-0"
              >
                <div className="flex flex-col h-full">
                  <div className="flex flex-col flex-grow">
                    <h4
                      className="text-xl font-bold text-[#22223b] dark:text-white mb-1 truncate"
                      style={{
                        minHeight: "2.5rem",
                        maxHeight: "2.5rem",
                        lineHeight: "2.5rem",
                        overflow: "hidden",
                        wordBreak: "break-word",
                        display: "block",
                      }}
                      title={job.jobTitle}
                    >
                      {uniformJobTitle(job.jobTitle)}
                    </h4>
                    <p className="text-[#64748b] dark:text-gray-400 mb-1 truncate" style={{
                      minHeight: "1.25rem",
                      maxHeight: "1.25rem",
                      lineHeight: "1.25rem",
                      overflow: "hidden",
                      wordBreak: "break-word",
                      display: "block",
                    }}>
                      {job.companyName}
                    </p>
                    <p
                      className="text-[#64748b] dark:text-gray-400 mb-2"
                      style={{
                        minHeight: "3.5rem",
                        maxHeight: "3.5rem",
                        lineHeight: "1.25rem",
                        overflow: "hidden",
                        wordBreak: "break-word",
                        display: "block",
                      }}
                      title={stripHTML(job.jobDescription)}
                    >
                      {uniformJobDescription(stripHTML(job.jobDescription))}
                    </p>
                    <p className="text-sm text-[#94a3b8] dark:text-gray-400 mb-1">
                      Location: {job.location || job.jobGeo || "Remote"}
                    </p>
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-xs px-3 py-1 bg-[#e6f9f3] dark:bg-gray-800 text-[#10b981] dark:text-[#34d399] font-bold rounded-lg">
                      Match Score: {Math.floor(Math.random() * 40) + 60}%
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3b82f6] hover:text-[#2563eb] font-semibold flex items-center transition-colors"
                      >
                        View Job <ExternalLink className="ml-1 text-xs" size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
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
                    ${activity.type === "created"
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
