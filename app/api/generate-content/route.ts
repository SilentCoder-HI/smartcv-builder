import { generateText } from "ai"
import { groq } from "@ai-sdk/groq";

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, currentData } = await request.json()

    const prompt = `Generate professional CV content for a ${jobTitle} position. 
    
Current data: ${JSON.stringify(currentData, null, 2)}

Please provide:
1. A compelling professional summary (2-3 sentences)
2. A list of relevant skills for this job title (8-12 skills)

Format the response as JSON with "summary" and "skills" fields.
Make the content professional, ATS-friendly, and tailored to the job title.`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      system:
        "You are a professional resume writer with expertise in creating ATS-optimized content. Always respond with valid JSON format.",
    })
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
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
