"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dbConnect from "@/lib/db";
import { Presentation } from "@/lib/models/Presentation";
import { Slide } from "@/lib/models/Slide";
import { 
    createPresentationInputSchema, 
    presentationIdInputSchema, 
    updatePresentationInputSchema 
} from "@/lib/schemas";
import { inngest } from "@/lib/inngest/client";
import { revalidatePath } from "next/cache";

async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

export async function createPresentationAction(formData: unknown) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const data = createPresentationInputSchema.parse(formData);
    
    await dbConnect();

    const presentation = await Presentation.create({
        userId: session.user.id,
        title: data.prompt.split('\n')[0].slice(0, 80) || "Untitled Presentation",
        prompt: data.prompt,
        slideCount: data.slideCount,
        style: data.style,
        tone: data.tone,
        layout: data.layout,
        status: 'GENERATING',
    });

    await inngest.send({
        name: 'presentation/generate',
        data: { presentationId: presentation._id.toString() },
    });

    revalidatePath("/");
    return JSON.parse(JSON.stringify(presentation));
}

export async function updatePresentationAction(formData: unknown) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const { id, ...patch } = updatePresentationInputSchema.parse(formData);
    
    await dbConnect();

    const presentation = await Presentation.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        { $set: patch },
        { new: true }
    );

    if (!presentation) throw new Error("Presentation not found");

    revalidatePath(`/presentations/${id}`);
    return JSON.parse(JSON.stringify(presentation));
}

export async function deletePresentationAction(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await dbConnect();

    const result = await Presentation.deleteOne({ _id: id, userId: session.user.id });
    if (result.deletedCount === 0) throw new Error("Presentation not found");

    await Slide.deleteMany({ presentationId: id });

    revalidatePath("/");
    return { success: true };
}

export async function regeneratePresentationAction(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await dbConnect();

    const presentation = await Presentation.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        { $set: { status: 'GENERATING' } },
        { new: true }
    );

    if (!presentation) throw new Error("Presentation not found");

    await inngest.send({
        name: 'presentation/generate',
        data: { presentationId: id },
    });

    revalidatePath(`/presentations/${id}`);
    return JSON.parse(JSON.stringify(presentation));
}
