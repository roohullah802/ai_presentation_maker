import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dbConnect from "@/lib/db";
import { Presentation } from "@/lib/models/Presentation";
import { Slide } from "@/lib/models/Slide";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = (await params).id;

    await dbConnect();
    const presentation = await Presentation.findOne({ _id: id, userId: session.user.id });

    if (!presentation) {
        return new NextResponse("Not Found", { status: 404 });
    }

    const slides = await Slide.find({ presentationId: id }).sort({ order: 1 });

    return NextResponse.json({
        ...presentation.toObject(),
        slides,
    });
}
