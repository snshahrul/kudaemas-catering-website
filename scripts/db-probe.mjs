// One-off diagnostic: which DATABASE_URL targets are reachable, and do they have our tables?
import { readFileSync } from "node:fs";
import pg from "pg";

function parseEnvFile(path) {
  try {
    const out = {};
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      out[m[1]] = v;
    }
    return out;
  } catch {
    return null;
  }
}

const candidates = [];
for (const f of [".env.development.local", ".env.local"]) {
  const env = parseEnvFile(f);
  if (!env) continue;
  for (const key of Object.keys(env)) {
    if (/DATABASE_URL$/.test(key) && env[key].startsWith("postgres")) {
      candidates.push({ file: f, key, url: env[key] });
    }
  }
}

function describe(url) {
  try {
    const u = new URL(url);
    return `${u.hostname}:${u.port || 5432}${u.pathname}`;
  } catch {
    return "unparseable";
  }
}

const seen = new Set();
for (const c of candidates) {
  const id = c.url;
  if (seen.has(id)) {
    console.log(`[skip] ${c.file} ${c.key} -> ${describe(c.url)} (same as previous)`);
    continue;
  }
  seen.add(id);
  const needsSsl = !/localhost|127\.0\.0\.1/.test(c.url);
  const client = new pg.Client({
    connectionString: c.url,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 8000,
  });
  try {
    await client.connect();
    const tables = await client.query(
      `select table_name from information_schema.tables
       where table_schema = 'public' and table_name in ('menu_items','testimonials','bookings')
       order by table_name`,
    );
    let counts = "";
    if (tables.rows.length) {
      for (const t of tables.rows) {
        const n = await client.query(`select count(*)::int as n from "${t.table_name}"`);
        counts += ` ${t.table_name}=${n.rows[0].n}`;
      }
    }
    console.log(`[OK]   ${c.file} ${c.key} -> ${describe(c.url)} | tables:${tables.rows.map((r) => r.table_name).join(",") || "none"}${counts}`);
  } catch (e) {
    console.log(`[FAIL] ${c.file} ${c.key} -> ${describe(c.url)} | ${e.message.split("\n")[0]}`);
  } finally {
    try { await client.end(); } catch {}
  }
}
