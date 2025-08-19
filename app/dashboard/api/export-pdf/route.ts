import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LayoutFormat = "A4" | "Letter" | "Legal";

export async function POST(req: NextRequest) {
  let browser: any = null;
  try {
    const { html, layout }: { html: string; layout?: LayoutFormat } = await req.json();
    if (!html || typeof html !== "string") {
      return new Response(JSON.stringify({ error: "Invalid HTML payload" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const { default: puppeteer } = await import("puppeteer");
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");

    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      format: (layout as LayoutFormat) || "A4",
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    await page.close();
    await browser.close();
    browser = null;

    return new Response(pdf, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename=cv.pdf`,
        "cache-control": "no-store",
      },
    });
  } catch (error: any) {
    if (browser) {
      try { await browser.close(); } catch {}
    }
    return new Response(JSON.stringify({ error: error?.message || "Failed to export PDF" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}


