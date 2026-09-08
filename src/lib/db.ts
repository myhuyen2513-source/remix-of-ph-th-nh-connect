import { PGlite } from "@electric-sql/pglite";
import { SCHEMA_SQL, SEED_SQL } from "./schema";

let dbInstance: PGlite | null = null;
let initPromise: Promise<PGlite> | null = null;

export async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = new PGlite("idb://ttcudvc-phuthanh");
    await db.exec(SCHEMA_SQL);

    const { rows: settingRows } = await db.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM system_settings WHERE id = 1",
    );
    if (settingRows[0].count === "0") {
      await db.exec(SEED_SQL);
    }

    // Always ensure admin user exists (handles databases seeded before users table was added)
    const { rows: userRows } = await db.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM users WHERE username = 'admin'",
    );
    if (userRows[0].count === "0") {
      await db.query(
        "INSERT INTO users (username, password_hash, role, full_name) VALUES ('admin', 'PLAIN:admin123', 'ADMIN', 'Quản trị viên') ON CONFLICT (username) DO NOTHING",
      );
    }

    dbInstance = db;
    return db;
  })();

  return initPromise;
}
