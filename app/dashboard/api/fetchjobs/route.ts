import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CV from "@/model/CV";
import { Types } from "mongoose";

/**
 * Fetch jobs from Jobicy API for a given keyword, with retry and 429 handling.
 * Adds a random delay before each request to avoid hitting rate limits.
 */
const fetchJobsFromJobicy = async (
  keyword: string,
  maxRetries = 3,
  retryDelayMs = 2000,
  preRequestDelayMin = 1200,
  preRequestDelayMax = 2500
) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      // Add a random delay before each request to avoid too many requests in a short time
      const randomDelay =
        Math.floor(
          Math.random() * (preRequestDelayMax - preRequestDelayMin + 1)
        ) + preRequestDelayMin;
      await new Promise((resolve) => setTimeout(resolve, randomDelay));

      const encodedKeyword = encodeURIComponent(keyword);
      const res = await fetch(
        `https://jobicy.com/api/v2/remote-jobs?count=100&tag=${encodedKeyword}`,
        { cache: "no-store" }
      );
      if (res.status === 429) {
        // Too Many Requests, wait and retry
        attempt++;
        if (attempt < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelayMs * attempt)
          );
          continue;
        }
        throw new Error(
          `Jobicy error: 429 (Too Many Requests) after ${maxRetries} attempts`
        );
      }
      if (!res.ok) throw new Error(`Jobicy error: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data.jobs)
        ? data.jobs.map((job: any) => ({
            id: job.id,
            url: job.url,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
            companyLogo: job.companyLogo,
            jobType: job.jobType,
            jobLevel: job.jobLevel,
            jobDescription: job.jobDescription,
            pubDate: job.pubDate,
            source: "Jobicy",
          }))
        : [];
    } catch (error) {
      if (attempt >= maxRetries - 1) {
        console.error("Error fetching Jobicy jobs:", error);
        return [];
      }
      attempt++;
      await new Promise((resolve) =>
        setTimeout(resolve, retryDelayMs * attempt)
      );
    }
  }
  return [];
};

/**
 * List of common English stopwords and non-professional words to ignore.
 */
const COMMON_WORDS = new Set([
  "the", "and", "a", "an", "to", "of", "in", "on", "for", "with", "at", "by", "from", "as", "is", "are", "was", "were", "be", "been", "being", "that", "this", "it", "or", "but", "if", "then", "so", "than", "too", "very", "can", "will", "just", "about", "into", "over", "after", "before", "such", "not", "no", "yes", "do", "does", "did", "have", "has", "had", "i", "me", "my", "we", "us", "our", "you", "your", "he", "him", "his", "she", "her", "they", "them", "their", "which", "who", "whom", "whose", "what", "when", "where", "why", "how", "all", "any", "each", "few", "more", "most", "other", "some", "such", "only", "own", "same", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"
]);

/**
 * Extract unique, normalized skills and main professional keywords from CVs.
 */
function extractSkillAndSummaryKeywordsFromCVs(CVs: any[]): Set<string> {
  const keywordSet = new Set<string>();

  for (const cv of CVs) {
    // Extract skills
    if (cv?.content?.skills && Array.isArray(cv.content.skills)) {
      for (const skillSection of cv.content.skills) {
        if (skillSection?.items) {
          for (const item of skillSection.items) {
            if (typeof item === "string" && item.trim().length > 0) {
              keywordSet.add(item.trim().toLowerCase());
            } else if (item?.name) {
              keywordSet.add(item.name.trim().toLowerCase());
            }
          }
        }
      }
    }

    // Extract keywords from professional summary
    const summary = cv?.content?.personalInfo?.summary;
    if (typeof summary === "string" && summary.trim().length > 0) {
      // Split summary into words, remove punctuation, lowercase, filter out common words and short words
      const words = summary
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
        .split(/\s+/)
        .map((w: string) => w.trim().toLowerCase())
        .filter(
          (w: string) =>
            w.length > 1 &&
            !COMMON_WORDS.has(w) &&
            /^[a-zA-Z0-9\-]+$/.test(w) // only words, numbers, hyphens
        );
      for (const word of words) {
        keywordSet.add(word);
      }
    }
  }

  // Remove any keywords that are still in the common words list or are too short
  return new Set(
    Array.from(keywordSet).filter(
      (kw) => kw.length > 1 && !COMMON_WORDS.has(kw)
    )
  );
}

/**
 * Fetch jobs from Jobicy for each skill/keyword, deduplicate, and merge.
 * Now with concurrency limit to avoid hitting rate limits.
 * Adds a delay between each keyword request to further avoid rate limits.
 */
const fetchJobs = async (CVs: any[], concurrencyLimit = 1, perKeywordDelayMin = 1200, perKeywordDelayMax = 2500) => {
  if (!CVs || CVs.length === 0) return [];

  const keywordSet = extractSkillAndSummaryKeywordsFromCVs(CVs);

  if (keywordSet.size === 0) return [];

  const allResults: any[] = [];
  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();
  const keywords = Array.from(keywordSet);

  // Concurrency control
  let idx = 0;
  async function worker() {
    while (idx < keywords.length) {
      const kw = keywords[idx++];
      try {
        // Add a random delay before each keyword request (even with concurrency=1, this helps)
        const randomDelay =
          Math.floor(
            Math.random() * (perKeywordDelayMax - perKeywordDelayMin + 1)
          ) + perKeywordDelayMin;
        await new Promise((resolve) => setTimeout(resolve, randomDelay));

        const jobicyJobs = await fetchJobsFromJobicy(kw);

        for (const job of jobicyJobs) {
          const jobId = job.id || "";
          const jobUrl = job.url || "";
          if (
            (jobId && !seenIds.has(jobId)) ||
            (jobUrl && !seenUrls.has(jobUrl))
          ) {
            allResults.push({
              ...job,
              sourceKeyword: kw,
            });
            if (jobId) seenIds.add(jobId);
            if (jobUrl) seenUrls.add(jobUrl);
          }
        }
      } catch (err) {
        console.error(`Error fetching jobs for keyword "${kw}":`, err);
      }
    }
  }

  // Launch workers (set concurrencyLimit to 1 for maximum safety)
  const workers = [];
  for (let i = 0; i < concurrencyLimit; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  return allResults;
};

/**
 * API route to fetch jobs.
 * This version fetches the user's CVs directly from MongoDB using the userId from the request body,
 * then uses those CVs to fetch jobs.
 * Now with built-in delays to avoid too many requests.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "No userId provided" },
        { status: 400 }
      );
    }

    await connectDB();

    // Try to find CVs by userId as string
    let userCvs = await CV.find({ userId }).lean();

    // If not found, try as ObjectId
    if (
      (!userCvs || userCvs.length === 0) &&
      Types.ObjectId.isValid(userId)
    ) {
      userCvs = await CV.find({ userId: new Types.ObjectId(userId) }).lean();
    }

    if (!Array.isArray(userCvs) || userCvs.length === 0) {
      return NextResponse.json(
        { error: "No CVs found for user" },
        { status: 404 }
      );
    }

    // Limit the number of keywords to avoid too many API calls (e.g., 10)
    // Set concurrencyLimit to 1 and add per-keyword delay for safety
    const jobs = await fetchJobs(userCvs, 1, 1200, 2500);

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error in fetchjobs API:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
