import fs from "node:fs";
import path from "node:path";
import {
  createClient,
  type Client,
  type InArgs,
  type InValue,
} from "@libsql/client";

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )`,
  `CREATE TABLE IF NOT EXISTS newsletter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )`,
];

let client: Client | undefined;
let ready: Promise<void> | null = null;

function databaseUrl() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not set");
  }
  if (process.env.VERCEL && url.startsWith("file:")) {
    throw new Error(
      "Refusing file SQLite on Vercel. Set TURSO_DATABASE_URL to a libsql:// URL."
    );
  }
  if (url.startsWith("libsql://") && !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_AUTH_TOKEN is not set");
  }
  return url;
}

function resolveUrl(url: string) {
  if (!url.startsWith("file:") || url.startsWith("file://")) {
    return url;
  }

  const filePath = path.resolve(process.cwd(), url.slice("file:".length));
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  return `file:${filePath.replace(/\\/g, "/")}`;
}

function getClient() {
  if (!client) {
    const url = resolveUrl(databaseUrl());
    client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export function ensureSchema() {
  if (!ready) {
    ready = (async () => {
      const db = getClient();
      for (const sql of STATEMENTS) {
        await db.execute(sql);
      }
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

export async function query(sql: string, args: InArgs = [] as InValue[]) {
  await ensureSchema();
  return getClient().execute({ sql, args });
}

export function isUniqueConstraintError(error: unknown) {
  const err = error as { code?: string; message?: string };
  const code = err.code;
  return (
    code === "SQLITE_CONSTRAINT" ||
    code === "SQLITE_CONSTRAINT_UNIQUE" ||
    (typeof err.message === "string" &&
      err.message.includes("UNIQUE constraint failed"))
  );
}
