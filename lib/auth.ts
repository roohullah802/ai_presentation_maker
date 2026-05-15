import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

const client = await clientPromise;
const db = client.db();

if (!db || typeof db.collection !== 'function') {
    console.error(" Better Auth: Invalid Database instance detected. 'db.collection' is not a function.", { dbType: typeof db });
}

export const auth = betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    trustedOrigins: [
        "http://localhost:3000",
        "https://ai-presentation-maker-lilac.vercel.app"
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
});