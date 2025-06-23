import { generateText } from "ai"
import { groq } from "@ai-sdk/groq";

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cvData, template } = await request.json()

    const atsCheckPrompt = `Analyze this CV for ATS (Applicant Tracking System) compatibility and provide a detailed assessment:

CV DATA:
${JSON.stringify(cvData, null, 2)}

TEMPLATE: ${template}

Evaluate the CV based on these ATS criteria:
1. Keyword optimization and density
2. Standard section headings usage
3. Format compatibility (no graphics, tables, etc.)
4. Contact information placement and format
5. Skills section organization
6. Experience description structure
7. Education format
8. Overall readability for ATS parsing

Provide assessment as JSON with:
- score: Overall ATS compatibility score (0-100)
- recommendations: Array of specific improvement suggestions
- strengths: Array of current ATS-friendly elements
- criticalIssues: Array of major problems that could cause ATS rejection
- keywordAnalysis: Assessment of keyword usage and suggestions
- formatAnalysis: Evaluation of format compatibility`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: atsCheckPrompt,
      system:
        "You are an ATS expert and technical recruiter with deep knowledge of how Applicant Tracking Systems parse and rank resumes. Provide detailed, actionable feedback.",
    })

    let atsResults
    try {
      atsResults = JSON.parse(text)
    } catch (parseError) {
      // Fallback ATS analysis
      const hasContact = cvData.personalInfo.email && cvData.personalInfo.phone
      const hasSkills = cvData.skills.length > 0
      const hasExperience = cvData.experience.length > 0

      let score = 60 // Base score
      if (hasContact) score += 15
      if (hasSkills) score += 10
      if (hasExperience) score += 10
      if (cvData.personalInfo.summary) score += 5

      atsResults = {
        score,
        recommendations: [
          "Add more industry-specific keywords to your skills section",
          "Use standard section headings (Experience, Education, Skills)",
          "Include quantifiable achievements in experience descriptions",
          "Ensure contact information is clearly formatted",
          "Use bullet points for better readability",
        ],
        strengths: [
          hasContact ? "Complete contact information provided" : null,
          hasSkills ? "Skills section present" : null,
          hasExperience ? "Work experience included" : null,
          cvData.personalInfo.summary ? "Professional summary included" : null,
        ].filter(Boolean),
        criticalIssues: [
          !hasContact ? "Missing essential contact information" : null,
          !hasSkills ? "No skills section found" : null,
          !hasExperience ? "No work experience provided" : null,
        ].filter(Boolean),
        keywordAnalysis:
          "Consider adding more industry-specific keywords and technical terms relevant to your target role",
        formatAnalysis: `${template} template is generally ATS-friendly with standard formatting`,
      }
    }

    return NextResponse.json(atsResults)
  } catch (error) {
    console.error("Error checking ATS compatibility:", error)
    return NextResponse.json({ error: "Failed to check ATS compatibility" }, { status: 500 })
  }
}
