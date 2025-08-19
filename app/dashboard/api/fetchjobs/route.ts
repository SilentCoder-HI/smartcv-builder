import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CV from "@/model/CV";

const fetchJobsFromJobicy = async (keyword: string, maxRetries = 3, retryDelayMs = 1000) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      const res = await fetch(
        `https://jobicy.com/api/v2/remote-jobs?count=100&tag=${encodedKeyword}`,
        { cache: "no-store" }
      );

      if (res.status === 429) {
        attempt++;
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
          continue;
        }
        throw new Error(`Jobicy error: 429 after ${maxRetries} attempts`);
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
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
    }
  }
  return [];
};

const COMMON_WORDS = new Set([
  "the","and","a","an","to","of","in","on","for","with","at","by","from","as",
  "is","are","was","were","be","been","being","that","this","it","or","but",
  "if","then","so","than","too","very","can","will","just","about","into",
  "over","after","before","such","not","no","yes","do","does","did","have",
  "has","had","i","me","my","we","us","our","you","your","he","him","his",
  "she","her","they","them","their","which","who","whom","whose","what",
  "when","where","why","how","all","any","each","few","more","most","other",
  "some","only","own","same","don","should","now"
]);

function extractSkillAndSummaryKeywordsFromCVs(CVs: any[]): string[] {
  const keywordSet = new Set<string>();

  for (const cv of CVs) {
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

    const summary = cv?.content?.personalInfo?.summary;
    if (typeof summary === "string" && summary.trim().length > 0) {
      const words = summary
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(
          (w) =>
            w.length > 1 &&
            !COMMON_WORDS.has(w) &&
            /^[a-zA-Z0-9\-]+$/.test(w)
        );
      for (const word of words) keywordSet.add(word);
    }
  }

  return Array.from(keywordSet).filter((kw) => kw.length > 1 && !COMMON_WORDS.has(kw));
}

/**
 * API route: fetch jobs for first 10 keywords only.
 * If user wants more, they can call again with pagination.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, offset = 0, limit = 20 } = body;

    if (!userId) {
      return NextResponse.json({ error: "No userId provided" }, { status: 400 });
    }

    await connectDB();
    const userCvs = await CV.find({ userId }).lean();

    if (!Array.isArray(userCvs) || userCvs.length === 0) {
      return NextResponse.json({ error: "No CVs found for user" }, { status: 404 });
    }

    const keywords = extractSkillAndSummaryKeywordsFromCVs(userCvs);
    if (keywords.length === 0) {
      return NextResponse.json([]);
    }

    const selectedKeywords = keywords.slice(offset, offset + limit);
    const allResults: any[] = [];
    const seenIds = new Set<string>();
    const seenUrls = new Set<string>();

    for (const kw of selectedKeywords) {
      const jobs = await fetchJobsFromJobicy(kw);
      for (const job of jobs) {
        const jobId = job.id || "";
        const jobUrl = job.url || "";
        if ((jobId && !seenIds.has(jobId)) || (jobUrl && !seenUrls.has(jobUrl))) {
          allResults.push({ ...job, sourceKeyword: kw });
          if (jobId) seenIds.add(jobId);
          if (jobUrl) seenUrls.add(jobUrl);
        }
      }
    }

    return NextResponse.json(allResults);
  } catch (error) {
    console.error("Error in fetchjobs API:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
