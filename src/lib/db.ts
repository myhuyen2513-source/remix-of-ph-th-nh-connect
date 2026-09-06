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

    const { rows } = await db.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM system_settings WHERE id = 1",
    );
    if (rows[0].count === "0") {
      await db.exec(SEED_SQL);
    }

    dbInstance = db;
    return db;
  })();

  return initPromise;
}
