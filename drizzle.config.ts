import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load the same env files Next.js uses (dotenv alone only reads .env).
loadEnv({ path: [".env.local", ".env.development.local", ".env"], quiet: true });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
