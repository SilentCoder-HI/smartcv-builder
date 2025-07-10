import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cvData, template } = await request.json()

    // Generate a unique ID for the shared resume
    const shareId = Math.random().toString(36).substring(2, 15)

    // In a real implementation, you would save this to a database
    // For now, we'll just return a mock share URL

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shared/${shareId}`

    return NextResponse.json({ shareUrl })
  } catch (error) {
    console.error("Error creating share link:", error)
    return NextResponse.json({ error: "Failed to create share link" }, { status: 500 })
  }
}
