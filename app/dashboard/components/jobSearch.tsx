"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bookmark,
  Sparkles,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import LoadingSpinner from "./loading/loading";
import { Job } from "@/types/jobs-types";

const JOBS_PER_PAGE = 8;

// Search and sort by rank
function searchKeywords(query: string, allKeywords: Record<string, number>): { word: string; count: number }[] {
  const lowerQuery = query.toLowerCase();
  return Object.entries(allKeywords)
    .filter(([word]) => word.includes(lowerQuery))
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([word, count]) => ({ word, count: count as number }));
}

// Remove HTML tags and normalize whitespace
function stripHTML(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

type JobsPageProps = {
  allJobs: Job[];
  savedJobs: string[];
  setSavedJobs: React.Dispatch<React.SetStateAction<string[]>>;
  setAllJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  allKeywords: Record<string, number>;
  onNavigate?: (path: string, sub?: string) => void;
  jobMatchingRequestsLeft?: number;
};

export default function JobsPage({ 
  allJobs, 
  savedJobs, 
  setSavedJobs, 
  setAllJobs,
  allKeywords, 
  onNavigate,
  jobMatchingRequestsLeft = 10 
}: JobsPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { display: string; value: string }[]
  >([]);

  // Persist saved jobs to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      } catch {
        // ignore
      }
    }
  }, [savedJobs]);

  // Suggestions logic: show both job field matches and keyword matches
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase();

    // 1. Suggestions from job fields (title, company, location)
    const jobFieldMatches = allJobs
      .filter((job: Job) => {
        const title = stripHTML(job.jobTitle);
        const company = typeof job.companyName === "string" ? job.companyName : "";
        const location = typeof job.location === "string" ? job.location : "";
        return (
          title.toLowerCase().includes(term) ||
          company.toLowerCase().includes(term) ||
          location.toLowerCase().includes(term)
        );
      })
      .slice(0, 5)
      .map((job: Job) => ({
        display: `${job.jobTitle} at ${job.companyName}`,
        value: job.jobTitle,
      }));

    // 2. Suggestions from extracted keywords (ranked)
    const keywordMatches = searchKeywords(searchTerm, allKeywords)
      .slice(0, 5)
      .map((kw) => ({
        display: kw.word,
        value: kw.word,
      }));

    // Combine, deduplicate by value, and limit to 8 suggestions
    const seen = new Set<string>();
    const combined = [...jobFieldMatches, ...keywordMatches].filter((item) => {
      if (seen.has(item.value.toLowerCase())) return false;
      seen.add(item.value.toLowerCase());
      return true;
    }).slice(0, 8);

    setSuggestions(combined);
  }, [searchTerm, allJobs, allKeywords]);

  // Save/unsave job
  const handleSaveJob = useCallback(
    (jobId: string) => {
      setAllJobs((prev: Job[]) =>
        prev.map((job: Job) =>
          job.id === jobId ? { ...job, saved: !job.saved } : job
        )
      );
      setSavedJobs((prev: string[]) =>
        prev.includes(jobId)
          ? prev.filter((id) => id !== jobId)
          : [...prev, jobId]
      );
    },
    [setAllJobs, setSavedJobs]
  );

  // Open job link
  const handleApply = useCallback((job: Job) => {
    if (job.applicationUrl) {
      window.open(job.applicationUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  // Shorten job description
  const getShortDescription = useCallback((desc: string) => {
    if (!desc) return "";
    const clean = desc.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    return clean.length <= 180 ? clean : clean.slice(0, 180) + "...";
  }, []);

  // Filter jobs client-side (search in title, company, location, description)
  const filteredJobs = useMemo(() => {
    const term = (searchTerm || "").toLowerCase();
    if (!term) return allJobs;
    return allJobs.filter((job: Job) => {
      const jobTitle = typeof job.jobTitle === "string" ? job.jobTitle : "";
      const company = typeof job.companyName === "string" ? job.companyName : "";
      const location = typeof job.location === "string" ? job.location : "";
      const description = typeof job.jobDescription === "string" ? job.jobDescription : "";
      return (
        jobTitle.toLowerCase().includes(term) ||
        company.toLowerCase().includes(term) ||
        location.toLowerCase().includes(term) ||
        description.toLowerCase().includes(term)
      );
    });
  }, [allJobs, searchTerm]);

  // Pagination logic (client-side)
  const totalJobs = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / JOBS_PER_PAGE));
  const pagedJobs = useMemo(() => {
    const start = (page - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(start, start + JOBS_PER_PAGE);
  }, [filteredJobs, page]);

  const hasMore = page < totalPages;
  const jobListRef = useRef<HTMLDivElement | null>(null);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
      if (jobListRef.current) {
        jobListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [page]);

  const handleNextPage = useCallback(() => {
    if (hasMore) {
      setPage((p) => p + 1);
      if (jobListRef.current) {
        jobListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hasMore]);

  // Generate page numbers for pagination controls
  const getPageNumbers = useCallback(() => {
    const maxPagesToShow = 5;
    let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  // Reset to page 1 if search term changes (so user doesn't get stuck on empty page)
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // Modal for job details
  const handleViewDetails = useCallback((job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedJob(null);
  }, []);

  // Keyboard accessibility for modal
  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, handleCloseModal]);

  // Improved search change handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Suggestions are handled in useEffect above
  };

  return (
    <div className="max-w-7xl py-8 px-6 sm:px-8 min-h-screen transition-colors">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 pointer-events-none" />
        <Input
          placeholder="Search job titles, companies, locations, keywords..."
          className="pl-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          value={searchTerm}
          onChange={e => {
            handleSearchChange(e);
            setShowSuggestions(true);
          }}
          aria-label="Search jobs"
          autoFocus
        />

        {suggestions.length > 0 && showSuggestions && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border no-scrollbar border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((item, idx) => {
              const regex = new RegExp(
                `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                "gi"
              );
              const highlighted = item.display.replace(
                regex,
                "<b>$1</b>"
              );

              return (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                  onClick={() => {
                    setSearchTerm(item.value);
                    setShowSuggestions(false);
                  }}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <p
          className="text-red-500 dark:text-red-400 mb-4"
          role="alert"
        >
          {error}
        </p>
      )}
      {totalJobs > 0 && !loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Showing {pagedJobs.length} of {totalJobs} jobs
        </p>
      )}

      {loading && allJobs.length === 0 ? (
        <div className="flex items-center justify-center mt-10 min-h-screen w-full mx-auto">
          <LoadingSpinner />
        </div>
      ) : pagedJobs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No jobs found
        </p>
      ) : (
        <>
          {/* Job Cards */}
          <div
            ref={jobListRef}
            className="grid sm:grid-cols-2 gap-6 animate-fadeIn"
          >
            {pagedJobs.map((job: Job) => (
              <div
                key={job.id}
                className="relative bg-white dark:bg-gray-900 dark:text-gray-100 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-xl hover:border-blue-400 group"
                tabIndex={0}
                aria-label={`Job card for ${job.jobTitle} at ${job.companyName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleViewDetails(job);
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 mr-2">
                      <Briefcase
                        className="w-6 h-6 text-blue-600 dark:text-blue-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {job.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.companyName} • {job.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSaveJob(job.id)}
                    title={job.saved ? "Unsave job" : "Save job"}
                    aria-pressed={!!job.saved}
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${job.saved ? "ring-2 ring-blue-400" : ""
                      }`}
                  >
                    <Bookmark
                      className={`w-6 h-6 transition-colors duration-200 ${job.saved
                        ? "text-blue-600 fill-blue-500"
                        : "text-gray-300 dark:text-gray-600 group-hover:text-blue-400"
                        }`}
                      aria-label={job.saved ? "Saved" : "Not saved"}
                    />
                  </Button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.jobType && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                      {job.jobType}
                    </Badge>
                  )}
                  {job.publisher && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                      {job.publisher}
                    </Badge>
                  )}
                  {job.salary && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {job.salary}
                    </Badge>
                  )}
                  {job.benefits && job.benefits.length > 0 && (
                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">
                      {job.benefits[0]}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div
                  className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-4 min-h-[48px] text-sm"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      getShortDescription(job.jobDescription)
                    ),
                  }}
                />

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="dark:text-white dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                    onClick={() => handleViewDetails(job)}
                    aria-label={`View details for ${job.jobTitle}`}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-1"
                    onClick={() => handleApply(job)}
                    aria-label={`Apply for ${job.jobTitle}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <Button
              onClick={handlePrevPage}
              disabled={page === 1}
              variant="outline"
              className="px-4 py-2"
              aria-label="Previous page"
            >
              Previous
            </Button>
            {getPageNumbers().map((pg) => (
              <Button
                key={pg}
                onClick={() => setPage(pg)}
                variant={pg === page ? "default" : "outline"}
                className={`px-3 py-2 ${pg === page ? "bg-blue-600 text-white dark:bg-blue-700" : ""
                  }`}
                aria-current={pg === page ? "page" : undefined}
                aria-label={`Go to page ${pg}`}
              >
                {pg}
              </Button>
            ))}
            <Button
              onClick={handleNextPage}
              disabled={!hasMore}
              variant="outline"
              className="px-4 py-2"
              aria-label="Next page"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-900 my-5 rounded-2xl shadow-2xl p-8 w-full max-w-3xl no-scrollbar relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent close on inner click
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={handleCloseModal}
              aria-label="Close details"
              type="button"
            >
              ×
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 mr-2">
                <Briefcase
                  className="w-6 h-6 text-blue-600 dark:text-blue-300"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedJob.jobTitle || "Untitled Job"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedJob.companyName || "Unknown Company"} •{" "}
                  {selectedJob.location || "Location not specified"}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedJob.jobType && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                      {selectedJob.jobType}
                    </Badge>
                  )}
                  {selectedJob.publisher && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                      {selectedJob.publisher}
                    </Badge>
                  )}
                  {selectedJob.salary && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {selectedJob.salary}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            {selectedJob.jobDescription && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Description</h3>
                <div
                  className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      selectedJob.jobDescription || ""
                    ),
                  }}
                />
              </div>
            )}

            {/* Benefits */}
            {Array.isArray(selectedJob.benefits) &&
              selectedJob.benefits.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Benefits</h3>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {selectedJob.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSaveJob(selectedJob.id)}
                aria-pressed={!!selectedJob.saved}
                className="flex-1"
              >
                {selectedJob.saved ? "Unsave" : "Save"}
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 flex-1"
                onClick={() => handleApply(selectedJob)}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Counter */}
      <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl px-5 py-3 flex items-center gap-3 transition-colors">
        <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          Job matching requests left:{" "}
          <span className="text-blue-500">{jobMatchingRequestsLeft}</span>
        </span>
      </div>
    </div>
  );
}