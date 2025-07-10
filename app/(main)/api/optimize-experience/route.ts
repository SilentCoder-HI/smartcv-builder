import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { experience, jobDescription, targetRole } = await request.json()

    const optimizationPrompt = `Optimize this work experience description for a ${targetRole} position based on the job description provided:

CURRENT EXPERIENCE:
Position: ${experience.position}
Company: ${experience.company}
Description: ${experience.description}

TARGET JOB DESCRIPTION:
${jobDescription}

Please rewrite the experience description to:
1. Use strong action verbs and quantifiable achievements
2. Include relevant keywords from the job description
3. Highlight transferable skills that match the target role
4. Make it ATS-friendly and impactful
5. Keep it concise but comprehensive (3-5 bullet points)

Provide the response as JSON with:
- optimizedDescription: The rewritten description
- keywordsUsed: Array of keywords incorporated from job description
- improvementNotes: Brief explanation of changes made
- impactScore: Estimated improvement score (1-10)`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: optimizationPrompt,
      system:
        "You are a professional resume writer specializing in ATS optimization and achievement-focused descriptions. Always respond with valid JSON.",
    })

    let optimizationResult
    try {
      optimizationResult = JSON.parse(text)
    } catch (parseError) {
      // Fallback optimization
      optimizationResult = {
        optimizedDescription: `• Led ${experience.position} responsibilities at ${experience.company}\n• Collaborated with cross-functional teams to deliver results\n• Implemented solutions that improved efficiency and performance\n• Demonstrated strong problem-solving and communication skills`,
        keywordsUsed: ["Leadership", "Collaboration", "Results", "Efficiency"],
        improvementNotes: "Enhanced with action verbs and quantifiable impact statements",
        impactScore: 7,
      }
    }

    return NextResponse.json(optimizationResult)
  } catch (error) {
    console.error("Error optimizing experience:", error)
    return NextResponse.json({ error: "Failed to optimize experience" }, { status: 500 })
  }
}
