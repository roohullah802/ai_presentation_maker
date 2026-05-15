import LoginForm from "@/components/login-form";
import { Presentation } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({
    searchParams
}: {
    searchParams: Promise<{ redirect?: string }>
}) {
    const { redirect: redirectTo } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="glass rounded-3xl p-8 space-y-6">
                    <div className="flex flex-col items-center gap-3">
                        <Link href="/" className="no-underline">
                            <div className="size-14 rounded-2xl bg-primary flex items-center justify-center">
                                <Presentation className="size-8 text-primary-foreground" />
                            </div>
                        </Link>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">
                                Welcome to <span className="text-primary">PPT.ai</span>
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                Sign in to create beautiful presentations
                            </p>
                        </div>
                    </div>

                    <LoginForm redirectTo={redirectTo} />
                </div>
            </div>
        </div>
    );
}
