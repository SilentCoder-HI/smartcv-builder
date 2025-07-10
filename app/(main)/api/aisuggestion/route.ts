import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, templates: rawTemplates } = await request.json()
    const templates = rawTemplates.flat?.() || rawTemplates // flatten if double nested

    const comprehensivePrompt = `Perform a comprehensive analysis of this professional profile and provide detailed recommendations:

PROFILE DATA:
Job Title: ${jobTitle}

Templates Available:
${templates.map((t: any) => `- ${t.name} (${t.type})`).join("\n")}

Provide comprehensive analysis including:

1. TEMPLATE RECOMMENDATION:
   - Analyze the profile and recommend the **best template by name** (must match one from the provided list)
   - Consider industry, experience level, and career goals
   - Provide reasoning for the recommendation

Format response as JSON with:
- recommendedTemplateName: string (must exactly match one of the template names provided above)
- recommendedTemplateId: string (must exactly match the template's id from the list, not the name or any other value)
`

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
