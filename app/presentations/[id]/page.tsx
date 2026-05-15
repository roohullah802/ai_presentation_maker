import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PresentationDetailClient from "../../../components/presentation-detail-client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    let session = null;
    try {
        session = await auth.api.getSession({
            headers: await headers(),
        });
    } catch (e) {
        console.error("Auth session fetch failed:", e);
    }

    if (!session) {
        redirect("/login");
    }

    const id = (await params).id;

    return <PresentationDetailClient id={id} />;
}
