import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, experience, skills } = await request.json()

    const prompt = `Analyze this professional profile and recommend the best CV template:

Job Title: ${jobTitle}
Experience Level: ${experience.length} positions
Skills: ${skills.join(", ")}

Available templates:
1. Modern - Clean contemporary design with sidebar, great for tech/creative roles
2. Minimal - Simple elegant layout, perfect for any industry
3. Classic - Traditional professional style, ideal for corporate/formal sectors

Consider the job title, industry, and experience level to recommend the most appropriate template.
Respond with JSON containing "recommendedTemplate" (modern/minimal/classic) and "reason".`

    const { text } = await generateText({
      model: xai("grok-beta"),
      prompt,
      system: "You are a career counselor specializing in resume design. Always respond with valid JSON format.",
    })

    let aiResponse
    try {
      aiResponse = JSON.parse(text)
    } catch (parseError) {
      // Fallback recommendation
      aiResponse = {
        recommendedTemplate: "modern",
        reason: "Modern template works well for most professional roles and provides a clean, contemporary look.",
      }
    }

    return NextResponse.json(aiResponse)
  } catch (error) {
    console.error("Error generating template recommendation:", error)
    return NextResponse.json(
      {
        recommendedTemplate: "modern",
        reason: "Default recommendation due to processing error.",
      },
      { status: 200 },
    )
  }
}
