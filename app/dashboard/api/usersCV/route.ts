"use server";

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CV from "@/model/CV";
import { randomUUID } from "crypto";

// CVRequestBody interface aligned with UCV model in model/CV.ts
interface CVRequestBody {
    id?: string;
    userId?: string;
    profileId?: string;
    templateId?: string;
    title?: string;
    description?: string;
    content?: {
        personalInfo?: {
            fullName?: string;
            email?: string;
            phone?: string;
            address?: string;
            jobTitle?: string;
            summary?: string;
        };
        education?: {
            id?: string;
            institution?: string;
            degree?: string;
            field?: string;
            startDate?: Date | string;
            endDate?: Date | string;
            gpa?: string;
        }[];
        experience?: {
            id?: string;
            company?: string;
            position?: string;
            startDate?: Date | string;
            endDate?: Date | string;
            description?: string;
            current?: boolean;
        }[];
        skills?: {
            category?: string;
            items?: string[];
        }[];
        certifications?: string[];
        hobbies?: string[];
        languages?: {
            language?: string;
            proficiency?: string;
        }[];
    };
    status?: "active" | "inactive";
    export?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastUsedAt?: Date | string;
}

const handleError = (error: unknown, message: string, status = 500) => {
    console.error(message, error);
    return NextResponse.json(
        { error: message, details: error instanceof Error ? error.message : error },
        { status }
    );
};

/**
 * GET /api/usersCV?userId=xxx
 * Returns all CVs for a user
 */
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const cvs = await CV.find({ userId }).lean();
        return NextResponse.json(cvs, { status: 200 });
    } catch (error) {
        return handleError(error, "Failed to fetch CVs");
    }
}

/**
 * POST /api/usersCV
 * Create a new CV
 */
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body: CVRequestBody = await request.json();
        const { userId, profileId, templateId, title, description, export: exportFlag, content, status } = body;

        if (!userId || !title || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const now = new Date().toISOString();

        const newCV = await CV.create({
            id: randomUUID(), // ✅ Always generate ID
            userId,
            profileId,
            templateId,
            title,
            description,
            export: exportFlag ?? false,
            content,
            status: status || "active",
            createdAt: now,
            updatedAt: now,
        });

        return NextResponse.json(newCV, { status: 201 });
    } catch (error) {
        return handleError(error, "Failed to create CV");
    }
}
/**
 * PUT /api/usersCV
 * Update an existing CV
 */
export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const body: CVRequestBody = await request.json();
        const { id, ...updateFields } = body;

        if (!id) {
            return NextResponse.json({ error: "Missing CV id" }, { status: 400 });
        }

        // Use user id to get _id from MongoDB
        const cvDoc = await CV.findOne({ id });
        if (!cvDoc) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }
        const _id = cvDoc._id;
        updateFields.updatedAt = new Date().toISOString();

        const updatedCV = await CV.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedCV) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }

        return NextResponse.json(updatedCV, { status: 200 });
    } catch (error) {
        return handleError(error, "Failed to update CV");
    }
}

/**
 * DELETE /api/usersCV?id=xxx
 * Delete a CV by id
 */
export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing CV id" }, { status: 400 });
        }
        const cvDoc = await CV.findOne({ id });
        if (!cvDoc) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }
        const _id = cvDoc._id;

        const deletedCV = await CV.findByIdAndDelete(_id);

        if (!deletedCV) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "CV deleted successfully" }, { status: 200 });
    } catch (error) {
        return handleError(error, "Failed to delete CV");
    }
}
