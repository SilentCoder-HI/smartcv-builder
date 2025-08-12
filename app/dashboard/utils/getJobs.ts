export const fetchJobsByKeyword = async (keyword: string) => {
  try {
    // Encode keyword for URL (e.g., "frontend developer" → "frontend%20developer")
    const encodedKeyword = encodeURIComponent(keyword);

    const res = await fetch(
      `https://jobicy.com/api/v2/remote-jobs?count=20&tag=${encodedKeyword}`,
      { cache: "no-store" } // ensures always fresh data
    );

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    // Return all relevant job fields as received from the API
    return data.jobs.map((job: any) => ({
      id: job.id,
      url: job.url,
      jobSlug: job.jobSlug,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      jobIndustry: job.jobIndustry,
      jobType: job.jobType,
      jobGeo: job.jobGeo,
      jobLevel: job.jobLevel,
      jobExcerpt: job.jobExcerpt,
      jobDescription: job.jobDescription,
      pubDate: job.pubDate
    }));

  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const fetchJobs = async (keyword: string) => {
  const data = await fetchJobsByKeyword("Web");
  return data;
};
