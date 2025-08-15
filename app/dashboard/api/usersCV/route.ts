"use server"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CV from "@/model/CV";

// Only GET request, expects userId in query, returns CVs for that user
export async function GET(request: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    
    try {
        const cvs = await CV.find();
        return NextResponse.json(cvs, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch CVs", details: error },
            { status: 500 }
        );
    }
}
