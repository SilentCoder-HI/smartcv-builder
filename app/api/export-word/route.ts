import { type NextRequest, NextResponse } from "next/server"
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from "docx"

function buildWordDoc(cvData: any, template: string) {
  const { personalInfo, experience, education, skills } = cvData

  // Personal Info Section
  const personalInfoSection = [
    new Paragraph({
      text: personalInfo.fullName || "",
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: `${personalInfo.email || ""} | ${personalInfo.phone || ""} | ${personalInfo.location || ""}`,
      spacing: { after: 200 },
    }),
    personalInfo.jobTitle
      ? new Paragraph({
          text: personalInfo.jobTitle,
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        })
      : null,
    personalInfo.summary
      ? new Paragraph({
          text: personalInfo.summary,
          spacing: { after: 300 },
        })
      : null,
  ].filter(Boolean)

  // Experience Section
  const experienceSection = [
    new Paragraph({
      text: "Experience",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    ...experience.map((exp: any) => [
      new Paragraph({
        text: `${exp.position || ""} at ${exp.company || ""}`,
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text: `${exp.startDate || ""} - ${exp.endDate || (exp.current ? "Present" : "")}`,
        // i: true,
        spacing: { after: 100 },
      }),
      ...(exp.description
        ? exp.description
            .split("\n")
            .map(
              (line: string) =>
                new Paragraph({
                  text: line.replace(/^[-•*]\s?/, ""),
                  bullet: { level: 0 },
                  spacing: { after: 50 },
                }),
            )
        : []),
    ]).flat(),
  ]

  // Education Section
  const educationSection =
    education && education.length
      ? [
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          ...education.map((edu: any) => [
            new Paragraph({
              text: `${edu.degree || ""} at ${edu.institution || ""}`,
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `${edu.startDate || ""} - ${edu.endDate || ""}`,
              // italics: true,
              spacing: { after: 100 },
            }),
            edu.description
              ? new Paragraph({
                  text: edu.description,
                  spacing: { after: 100 },
                })
              : null,
          ]).flat().filter(Boolean),
        ].flat()
      : []

  // Skills Section
  const skillsSection =
    skills && skills.length
      ? [
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: skills.map(
              (skill: string, idx: number) =>
                new TextRun({
                  text: skill + (idx < skills.length - 1 ? ", " : ""),
                  bold: false,
                }),
            ),
            spacing: { after: 200 },
          }),
        ]
      : []

  // Compose all sections
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...personalInfoSection,
          ...experienceSection,
          ...educationSection,
          ...skillsSection,
        ],
      },
    ],
  })

  return doc
}

export async function POST(request: NextRequest) {
  try {
    const { cvData, template } = await request.json()

    const doc = buildWordDoc(cvData, template)
    const buffer = await Packer.toBuffer(doc)

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="resume.docx"`,
      },
    })
  } catch (error) {
    console.error("Error exporting Word:", error)
    return NextResponse.json({ error: "Failed to export Word document" }, { status: 500 })
  }
}
