import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cvData, jobDescription, companyName, hiringManager } = await request.json()

    const coverLetterPrompt = `Generate a professional cover letter based on the following information:

APPLICANT INFORMATION:
Name: ${cvData.personalInfo.fullName}
Current Role: ${cvData.personalInfo.jobTitle}
Summary: ${cvData.personalInfo.summary}
Key Skills: ${cvData.skills.join(", ")}
Recent Experience: ${cvData.experience[0] ? `${cvData.experience[0].position} at ${cvData.experience[0].company}` : "Not specified"}

JOB DETAILS:
Company: ${companyName || "the company"}
Hiring Manager: ${hiringManager || "Hiring Manager"}
Job Description: ${jobDescription}

Create a compelling cover letter that:
1. Opens with a strong hook that shows enthusiasm for the specific role
2. Highlights 2-3 key achievements that directly relate to job requirements
3. Demonstrates knowledge of the company and role
4. Shows personality while maintaining professionalism
5. Includes a strong call-to-action closing
6. Is approximately 3-4 paragraphs long

Format as JSON with:
- coverLetter: The complete cover letter text
- keyPoints: Array of main selling points highlighted
- tone: Description of the tone used (professional, enthusiastic, etc.)
- customizationTips: Suggestions for further personalization`

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: coverLetterPrompt,
      system:
        "You are an expert career coach specializing in compelling cover letters that get interviews. Write engaging, personalized content that stands out while remaining professional.",
    })

    let coverLetterResult
    try {
      coverLetterResult = JSON.parse(text)
    } catch (parseError) {
      // Fallback cover letter
      coverLetterResult = {
        coverLetter: `Dear ${hiringManager || "Hiring Manager"},

I am writing to express my strong interest in the ${cvData.personalInfo.jobTitle} position at ${companyName || "your company"}. With my background in ${cvData.skills.slice(0, 3).join(", ")}, I am excited about the opportunity to contribute to your team.

In my current role, I have successfully ${cvData.experience[0]?.description || "delivered results and exceeded expectations"}. My experience with ${cvData.skills.slice(0, 2).join(" and ")} directly aligns with your requirements, and I am confident I can bring immediate value to your organization.

I am particularly drawn to this opportunity because of ${companyName || "your company"}'s reputation for innovation and excellence. I would welcome the chance to discuss how my skills and enthusiasm can contribute to your team's continued success.

Thank you for your consideration. I look forward to hearing from you soon.

Sincerely,
${cvData.personalInfo.fullName}`,
        keyPoints: ["Relevant experience", "Skill alignment", "Company knowledge", "Enthusiasm"],
        tone: "Professional and enthusiastic",
        customizationTips: [
          "Research specific company projects or values to mention",
          "Add quantifiable achievements from your experience",
          "Customize the opening hook for each application",
        ],
      }
    }

    return NextResponse.json(coverLetterResult)
  } catch (error) {
    console.error("Error generating cover letter:", error)
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 })
  }
}
