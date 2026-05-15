import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

const client = await clientPromise;
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    trustedOrigins: ["https://ai-presentation-maker-lilac.vercel.app", "http://localhost:3000"],
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