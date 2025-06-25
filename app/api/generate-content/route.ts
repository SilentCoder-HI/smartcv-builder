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
2. A list of relevant skills for this job title (8 skills), formatted like this:
skills: [
  {
    category: "Programming Languages",
    items: ["JavaScript", "Python"]
  }
]

Format the response as JSON with "summary" and "skills" fields.
Make the content professional, ATS-friendly, and tailored to the job title.`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      system:
        "You are a professional resume writer with expertise in creating ATS-optimized content. Always respond with valid JSON format.",
    })

    // Try to extract the JSON block as in the example in file_context_0
    /**
     * Extracts and parses a JSON object from a string, with special handling for
     * malformed JSON where the model outputs a "skills" array as a sequence of
     * key-value pairs (not valid JSON), e.g.:
     * "skills": [
     *   "programming languages": ["JavaScript", "Python"],
     *   "databases": ["MySQL"]
     * ]
     * This function attempts to fix such cases before parsing.
     */
    function extractJsonFromText(text: string): any {
      // Find the first '{' and the last '}' to extract the JSON block
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("JSON not found in the string.");
      }

      let jsonString = text.slice(jsonStart, jsonEnd + 1);

      // Remove code block markers and trim
      jsonString = jsonString.replace(/```(json)?/g, '').trim();

      // Attempt to fix malformed "skills" array if present
      // Look for: "skills": [ ...key-value pairs... ]
      // and convert to: "skills": [ { ...key-value pairs... } ]
      jsonString = jsonString.replace(
        /("skills"\s*:\s*)\[(\s*("[^"]+"\s*:\s*\[[^\]]*\]\s*,?\s*)+)\]/g,
        (match, prefix, kvPairs) => {
          // Wrap the key-value pairs in curly braces to form a single object in the array
          return `${prefix}[{${kvPairs.replace(/,\s*$/, '')}}]`;
        }
      );

      try {
        return JSON.parse(jsonString);
      } catch (error) {
        // If parsing fails, log the error and the string for debugging
        console.error("Error parsing JSON:", error, jsonString);
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
