import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { type NextRequest, NextResponse } from "next/server";

// Define types for personalInfo, experience, education
interface PersonalInfo {
  fullName: string;
  email: string;
  jobTitle: string;
  summary: string;
  phone: string;
}

interface ExperienceItem {
  position: string;
  company: string;
  description: string;
}

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
}

interface CVData {
  personalInfo?: PersonalInfo;
  skills?: string[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
}

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, currentCV }: { jobDescription: string; currentCV: CVData } = await request.json();

    const { personalInfo, skills = [], experience = [], education = [] } = currentCV || {};

    const analysisPrompt = `Analyze this job description and compare it with the current CV data to provide detailed recommendations:

JOB DESCRIPTION:
${jobDescription}

CURRENT CV DATA:
Name: ${personalInfo?.fullName ?? "N/A"}
Job Title: ${personalInfo?.jobTitle ?? "N/A"}
Summary: ${personalInfo?.summary ?? "N/A"}
Skills: ${skills.join(", ")}
Experience: ${experience.map(exp => `${exp.position} at ${exp.company}: ${exp.description}`).join("; ")}
Education: ${education.map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`).join("; ")}

Please provide a comprehensive analysis with:
1. matchScore (0–100)
2. missingSkills: []
3. keywordSuggestions: []
4. improvementSuggestions: []
5. optimizedSummary: string
6. experienceOptimization: []
7. industryInsights: string
8. atsOptimization: []

Respond in valid JSON format. Be specific and actionable.`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: analysisPrompt,
      system: `You are an expert career counselor and resume writer with deep knowledge of ATS systems, hiring practices, and industry requirements. Always return valid JSON.`,
    });

    function extractJsonFromText(text: string): any {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("JSON not found in the string.");
      }

      const jsonString = text.slice(jsonStart, jsonEnd + 1);

      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    }

    const data = extractJsonFromText(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error analyzing job description:", error);
    return NextResponse.json({ error: "Failed to analyze job description" }, { status: 500 });
  }
}
