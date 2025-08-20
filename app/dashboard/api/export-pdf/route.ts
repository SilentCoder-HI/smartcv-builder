import type { NextRequest } from "next/server";

export const runtime = "nodejs"; // ensures Node runtime for Buffer

export async function POST(req: NextRequest) {
  try {
    // 1. Parse JSON body
    const { html } = await req.json();

    if (!html) {
      return new Response(
        JSON.stringify({ error: "Missing HTML content" }),
        { status: 400 }
      );
    }

    // 2. Send request to PDFShift API
    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        "X-API-Key":"sk_93203dca97fe7567e8ed13898c1d57bc5a31dfaf",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: html,     // OR "https://example.com"
        sandbox: true,    // false in production
        format: "A4",     // A4, Letter, Legal
      }),
    });

    // 3. Handle errors from PDFShift
    if (!response.ok) {
      const err = await response.text();
      return new Response(
        JSON.stringify({ error: err }),
        { status: response.status }
      );
    }

    // 4. Convert result to Buffer
    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    // 5. Return PDF response
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="document.pdf"',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
