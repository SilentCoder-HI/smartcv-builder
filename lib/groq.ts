// lib/groq.ts
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function recommendCvTemplate({
  jobTitle,
  experience,
  skills,
}: {
  jobTitle: string;
  experience: string[];
  skills: string[];
}) {
  const prompt = `
You are a professional CV advisor and AI-powered career counselor.

Analyze the following professional profile and suggest the **most suitable CV template style** from the list below. Consider the candidate’s job title, level of experience, and relevant skills.

---
**Candidate Profile**
- Job Title: ${jobTitle}
- Experience: ${experience.length} positions
- Skills: ${skills.join(", ")}

**Available CV Templates**
1. **Modern**: Bold headers, sidebar layout, colorful highlights — ideal for creative roles, tech, startups, design, and marketing.
2. **Minimal**: Clean lines, black & white, focused on readability — perfect for recent graduates, all-rounders, and hybrid professionals.
3. **Classic**: Timeless serif fonts, left-aligned structure — best for corporate, finance, law, or academic professionals.

---
**Instructions for AI:**
- Pick the best template based on the candidate’s professional needs.
- Reply in this **valid JSON format only**:

{
  "recommendedTemplate": "modern" | "minimal" | "classic",
  "reason": "Your brief explanation here..."
}
`;

  const { text } = await generateText({
    model: groq("grok-2-1212"),
    prompt,
    system:
      "You are a professional CV expert helping users choose the right resume template. Always respond only in clean JSON format.",
  });

  try {
    return JSON.parse(text);
  } catch {
    return {
      recommendedTemplate: "modern",
      reason:
        "Defaulted to 'modern' as it's visually engaging and works well for a variety of roles, especially in tech or design fields.",
    };
  }
}
