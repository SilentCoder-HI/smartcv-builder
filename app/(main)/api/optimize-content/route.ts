import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cvData, template } = await request.json()

    const optimizationPrompt = `Optimize this entire CV content for maximum impact and ATS compatibility:

CURRENT CV DATA:
${JSON.stringify(cvData, null, 2)}

TEMPLATE: ${template}

Please provide comprehensive optimization including:
1. Enhanced professional summary with strong action words and quantifiable achievements
2. Optimized experience descriptions with metrics and impact statements
3. Improved skill categorization and presentation
4. Better keyword integration for ATS systems
5. Enhanced education and certification descriptions
6. Overall content flow and readability improvements

Return the complete optimized CV data in the same JSON structure, with all improvements applied.
Focus on:
- Action verbs and quantifiable results
- Industry-relevant keywords
- ATS-friendly formatting
- Professional language and tone
- Compelling value propositions`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: optimizationPrompt,
      system:
        "You are a senior resume writer and career strategist with expertise in ATS optimization, industry trends, and compelling professional storytelling. Always maintain the original data structure while enhancing content quality.",
    })

    let optimizedCV
    try {
      optimizedCV = JSON.parse(text)
    } catch (parseError) {
      // Fallback optimization - enhance existing content
      optimizedCV = {
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          summary: cvData.personalInfo.summary
            ? `Results-driven ${cvData.personalInfo.jobTitle} with proven expertise in ${cvData.skills.slice(0, 3).join(", ")}. ${cvData.personalInfo.summary} Demonstrated ability to deliver exceptional results and drive organizational success.`
            : `Accomplished ${cvData.personalInfo.jobTitle} with strong background in ${cvData.skills.slice(0, 3).join(", ")}. Proven track record of delivering results and exceeding expectations in fast-paced environments.`,
        },
        experience: cvData.experience.map((exp: { description: string; position: any }) => ({
          ...exp,
          description: exp.description
            ? `• ${exp.description.split(".")[0]} with measurable impact\n• Collaborated with cross-functional teams to achieve organizational goals\n• Implemented innovative solutions that improved efficiency and performance`
            : `• Led ${exp.position} responsibilities with focus on results and quality\n• Collaborated effectively with team members and stakeholders\n• Contributed to organizational success through dedicated performance`,
        })),
      }
    }

    return NextResponse.json({ optimizedCV })
  } catch (error) {
    console.error("Error optimizing content:", error)
    return NextResponse.json({ error: "Failed to optimize content" }, { status: 500 })
  }
}
