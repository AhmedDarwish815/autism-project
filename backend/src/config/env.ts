import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("4000"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
    JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
    ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),
    MAIL_HOST: z.string().min(1, "MAIL_HOST is required"),
    MAIL_PORT: z.string().min(1, "MAIL_PORT is required"),
    MAIL_USER: z.string().min(1, "MAIL_USER is required"),
    MAIL_PASS: z.string().min(1, "MAIL_PASS is required"),
    GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
    AI_API_URL: z.string().default("http://127.0.0.1:5000/predict"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    parsed.error.issues.forEach((i) => {
        console.error(`   - ${i.path.join(".")}: ${i.message}`);
    });
    process.exit(1);
}

export const env = parsed.data;