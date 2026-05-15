import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dbConnect from "@/lib/db";
import { Presentation } from "@/lib/models/Presentation";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    const presentations = await Presentation.find({ userId: session.user.id }).sort({ updatedAt: -1 });

    return NextResponse.json(presentations);
}
