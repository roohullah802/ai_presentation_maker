import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HomePageClient from "../components/home-page-client";

export default async function Page() {
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

    return <HomePageClient user={session.user} />;
}
