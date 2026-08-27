import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __pool?: Pool;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __db?: any;
};

function getPool(): Pool {
  if (!globalForDb.__pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required");
    globalForDb.__pool = new Pool({ connectionString: url });
  }
  return globalForDb.__pool;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: any = new Proxy({} as any, {
  get(_, prop) {
    if (!globalForDb.__db) {
      globalForDb.__db = drizzle(getPool());
    }
    return (globalForDb.__db as Record<string, unknown>)[prop as string];
  },
});
