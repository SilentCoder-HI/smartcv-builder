// /app/api/export/route.ts
import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import htmlDocx from "html-docx-js"; // For .docx export
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
  const { html, type } = await req.json();

  if (!html || !type) {
    return new Response("Missing html or type", { status: 400 });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 1600 });

  await page.setContent(html, { waitUntil: "networkidle0" });

  if (type === "pdf") {
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } else if (type === "docx") {
    await browser.close(); // Close browser first

      const docxBuffer = Buffer.from(htmlDocx.asBlob(html));

    return new Response(docxBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=resume.docx",
      },
    });
  } else {
    await browser.close();
    return new Response("Unsupported export type", { status: 400 });
  }
}
