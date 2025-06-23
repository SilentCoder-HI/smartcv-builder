import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cvData } = await request.json()

    const comprehensivePrompt = `Perform a comprehensive analysis of this professional profile and provide detailed recommendations:

PROFILE DATA:
Name: ${cvData.personalInfo.fullName}
Job Title: ${cvData.personalInfo.jobTitle}
Summary: ${cvData.personalInfo.summary}
Skills: ${cvData.skills.join(", ")}
Experience: ${cvData.experience.map((exp: { position: any; company: any; startDate: any; endDate: any; description: any }) => `${exp.position} at ${exp.company} (${exp.startDate}-${exp.endDate}): ${exp.description}`).join("; ")}
Education: ${cvData.education.map((edu: { degree: any; field: any; institution: any; startDate: any; endDate: any }) => `${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate}-${edu.endDate})`).join("; ")}

Provide comprehensive analysis including:

1. TEMPLATE RECOMMENDATION:
   - Analyze the profile and recommend the best template (modern/minimal/classic)
   - Consider industry, experience level, and career goals
   - Provide reasoning for the recommendation

2. INDUSTRY ANALYSIS:
   - Identify the primary industry/field
   - Assess how well the profile matches industry standards
   - Provide industry match percentage (0-100)

3. PROFILE STRENGTH ASSESSMENT:
   - Overall profile strength score (1-10)
   - Key strengths and areas for improvement
   - Competitiveness in the job market

4. CONTENT OPTIMIZATION:
   - Specific suggestions for improving each section
   - Keyword recommendations for better ATS performance
   - Achievement and impact statement suggestions

5. CAREER POSITIONING:
   - How to position this profile for maximum impact
   - Target role recommendations
   - Career advancement suggestions

Format response as JSON with:
- recommendedTemplate: "modern" | "minimal" | "classic"
- templateReason: string explaining why this template is best
- industryMatch: number (0-100)
- profileStrength: number (1-10)
- primaryIndustry: string
- keyStrengths: string[]
- improvementAreas: string[]
- suggestions: string[] (top 5 actionable recommendations)
- keywordRecommendations: string[]
- careerPositioning: string
- competitivenessScore: number (1-10)
- nextSteps: string[]`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),      
      prompt: comprehensivePrompt,
      system:
        "You are a senior career strategist and executive resume writer with 15+ years of experience. You specialize in comprehensive profile analysis, industry insights, and strategic career positioning. Provide detailed, actionable insights that help professionals advance their careers.",
    })

    let analysisResults
    try {
      analysisResults = JSON.parse(text)
    } catch (parseError) {
    }
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

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error performing comprehensive analysis:", error)
    return NextResponse.json({ error: "Failed to perform comprehensive analysis" }, { status: 500 })
  }
}
