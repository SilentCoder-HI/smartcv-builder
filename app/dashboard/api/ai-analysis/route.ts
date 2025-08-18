import { NextRequest, NextResponse } from "next/server";

/**
 * POST handler for AI CV/job analysis.
 * Handles errors gracefully and ensures robust skill extraction.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, cvData, templateData } = body;

    if (!jobDescription || !cvData) {
      return NextResponse.json(
        { error: "Job description and CV data are required" },
        { status: 400 }
      );
    }

    // Extract key information from CV data
    const cvSkills = Array.isArray(cvData.skills) ? cvData.skills : [];
    const cvExperience = Array.isArray(cvData.experience) ? cvData.experience : [];
    const cvEducation = Array.isArray(cvData.education) ? cvData.education : [];
    const cvSummary = typeof cvData.summary === "string" ? cvData.summary : "";
    const cvProjects = Array.isArray(cvData.projects) ? cvData.projects : [];

    // Extract keywords from job description
    const jobKeywords = extractKeywords(jobDescription);

    // Analyze CV skills against job requirements
    const skillsMatch = analyzeSkillsMatch(cvSkills, jobKeywords);

    // Calculate ATS score
    const atsScore = calculateATSScore(cvData, jobDescription);

    // Analyze template effectiveness
    const templateAnalysis = analyzeTemplate(templateData, jobDescription);

    // Generate improvement suggestions
    const suggestions = generateSuggestions(cvData, jobDescription, skillsMatch);

    const analysis = {
      jobMatch: {
        overallScore: Math.round((atsScore + skillsMatch.score) / 2),
        atsScore: atsScore,
        skillsMatch: skillsMatch,
        keywordMatch: skillsMatch.keywordMatch,
        missingKeywords: skillsMatch.missingKeywords
      },
      templateAnalysis: templateAnalysis,
      suggestions: suggestions,
      summary: {
        strengths: skillsMatch.matchedSkills.slice(0, 3),
        weaknesses: skillsMatch.missingKeywords.slice(0, 3),
        recommendations: suggestions.slice(0, 3)
      }
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("AI Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze CV" },
      { status: 500 }
    );
  }
}

/**
 * Extracts up to 20 ranked keywords from a text, ignoring common stopwords.
 */
function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 3);

  const stopWords = new Set([
    "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by",
    "this", "that", "these", "those", "is", "are", "was", "were", "be", "been",
    "have", "has", "had", "do", "does", "did", "will", "would", "could", "should"
  ]);

  const keywordCount: Record<string, number> = {};
  for (const word of words) {
    if (!stopWords.has(word)) {
      keywordCount[word] = (keywordCount[word] || 0) + 1;
    }
  }

  return Object.entries(keywordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word);
}

/**
 * Analyzes how well the CV skills match the job keywords.
 * Handles both string and object skill representations robustly.
 */
function analyzeSkillsMatch(cvSkills: any[], jobKeywords: string[]): any {
  // Robustly extract skill names as lowercase strings
  const cvSkillNames: string[] = cvSkills
    .map(skill => {
      if (typeof skill === "string") {
        return skill.toLowerCase();
      }
      if (skill && typeof skill === "object" && typeof skill.name === "string") {
        return skill.name.toLowerCase();
      }
      return null;
    })
    .filter((s): s is string => typeof s === "string" && !!s);

  const matchedSkills: string[] = [];
  const missingKeywords: string[] = [];
  let matchCount = 0;

  for (const keyword of jobKeywords) {
    const isMatched = cvSkillNames.some(skill =>
      skill.includes(keyword) || keyword.includes(skill)
    );
    if (isMatched) {
      matchedSkills.push(keyword);
      matchCount++;
    } else {
      missingKeywords.push(keyword);
    }
  }

  const score = jobKeywords.length > 0
    ? Math.round((matchCount / jobKeywords.length) * 100)
    : 0;

  return {
    score,
    matchedSkills,
    missingKeywords,
    keywordMatch: `${matchCount}/${jobKeywords.length} keywords matched`
  };
}

/**
 * Calculates a simple ATS score based on presence of sections and keyword density.
 */
function calculateATSScore(cvData: any, jobDescription: string): number {
  let score = 50; // Base score

  // Check for required sections
  if (cvData.personalInfo?.fullName) score += 10;
  if (cvData.personalInfo?.email) score += 5;
  if (cvData.personalInfo?.phone) score += 5;
  if (Array.isArray(cvData.experience) && cvData.experience.length > 0) score += 10;
  if (Array.isArray(cvData.education) && cvData.education.length > 0) score += 5;
  if (Array.isArray(cvData.skills) && cvData.skills.length > 0) score += 10;

  // Check for keyword density
  const jobKeywords = extractKeywords(jobDescription);
  const cvText = JSON.stringify(cvData).toLowerCase();
  const keywordMatches = jobKeywords.filter(keyword =>
    cvText.includes(keyword)
  ).length;

  score += Math.min(keywordMatches * 2, 20);

  return Math.min(score, 100);
}

/**
 * Analyzes the template for ATS-friendliness and gives recommendations.
 */
function analyzeTemplate(templateData: any, jobDescription: string): any {
  if (!templateData) {
    return {
      score: 70,
      feedback: "Template analysis not available",
      recommendations: ["Ensure template is clean and professional"]
    };
  }

  let score = 80;
  const recommendations: string[] = [];

  // Analyze template structure
  if (templateData.layout === "modern") score += 10;
  if (templateData.colorScheme === "professional") score += 5;

  // Check for readability
  if (templateData.fontSize && templateData.fontSize >= 11) score += 5;
  else recommendations.push("Consider increasing font size for better readability");

  return {
    score: Math.min(score, 100),
    feedback: "Template appears well-structured for ATS systems",
    recommendations
  };
}

/**
 * Generates improvement suggestions based on analysis.
 */
function generateSuggestions(cvData: any, jobDescription: string, skillsMatch: any): string[] {
  const suggestions: string[] = [];

  if (skillsMatch.score < 60) {
    suggestions.push("Add more relevant skills that match the job requirements");
  }

  if (skillsMatch.missingKeywords.length > 0) {
    suggestions.push(`Consider adding these keywords: ${skillsMatch.missingKeywords.slice(0, 3).join(", ")}`);
  }

  if (!cvData.summary || typeof cvData.summary !== "string" || cvData.summary.length < 100) {
    suggestions.push("Add a professional summary highlighting your key achievements");
  }

  if (!Array.isArray(cvData.experience) || cvData.experience.length < 2) {
    suggestions.push("Consider adding more work experience or relevant projects");
  }

  return suggestions;
}
