import { drizzle as drizzleNodePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeonHttp } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";

const globalForDb = globalThis as typeof globalThis & {
  __pool?: Pool;
   
  __db?: any;
};

/** Neon connection strings look like postgresql://…@ep-xxx-pooler.region.aws.neon.tech/… */
function isNeonUrl(url: string): boolean {
  return url.includes("neon.tech");
}

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");

  if (isNeonUrl(url)) {
    // Neon serverless over HTTPS: no TCP pool to manage, ideal for
    // serverless/Vercel deployments. Drizzle runs queries via fetch.
    const sql = neon(url);
    return drizzleNeonHttp(sql);
  }

  // Local/plain Postgres (e.g. Docker on 127.0.0.1) over TCP.
  if (!globalForDb.__pool) {
    globalForDb.__pool = new Pool({ connectionString: url });
  }
  return drizzleNodePg(globalForDb.__pool);
}

// Lazily-initialized proxy so importing this module never throws at build
// time even when DATABASE_URL is absent (only actual queries touch the DB).
 
export const db: any = new Proxy({} as any, {
  get(_, prop) {
    if (!globalForDb.__db) {
      globalForDb.__db = createDb();
    }
    return (globalForDb.__db as Record<string, unknown>)[prop as string];
  },
});
