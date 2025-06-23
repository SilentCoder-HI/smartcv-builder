import { CVData, JobAnalysisResults } from "@/types/cv-types"

export async function AJobDescription(jobText: string, cvData: CVData): Promise<JobAnalysisResults> {
  console.log(cvData)
  const response = await fetch("/api/analyze-job-description", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobDescription: jobText, cvData }),
  })
  
  

  // if (!response.ok) {
  //   const errorText = await response.text()
  //   console.error("API Error:", errorTex+t)
  //   throw new Error("Failed to analyze job description.")
  // }

  const data = await response.json()
  // alert("Got response: " + JSON.stringify(data)); // Debug
  // console.log("Parsed API response:", data)
  return data
}
