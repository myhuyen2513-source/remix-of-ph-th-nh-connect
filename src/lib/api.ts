import { getDb } from "./db";
import type {
  Category,
  Contact,
  EventItem,
  HonorSlide,
  MediaDocument,
  MediaImage,
  MediaVideo,
  PollOption,
  Post,
  PublicService,
  SystemSettings,
  Thematic,
} from "./types";

// ── System Settings ──────────────────────────────────────────
export async function getSettings(): Promise<SystemSettings> {
  const db = await getDb();
  const { rows } = await db.query<SystemSettings>(
    "SELECT * FROM system_settings WHERE id = 1",
  );
  return rows[0];
}

export async function updateSettings(
  patch: Partial<Omit<SystemSettings, "id">>,
): Promise<SystemSettings> {
  const db = await getDb();
  const keys = Object.keys(patch);
  if (keys.length === 0) return getSettings();
  const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = keys.map((k) => (patch as Record<string, unknown>)[k]);
  await db.query(
    `UPDATE system_settings SET ${setClause} WHERE id = 1`,
    values,
  );
  return getSettings();
}

// ── Categories ────────────────────────────────────────────────
export async function getCategories(): Promise<Category[]> {
  const db = await getDb();
  const { rows } = await db.query<Category>("SELECT * FROM categories ORDER BY id");
  return rows;
}

export async function createCategory(data: Omit<Category, "id">): Promise<Category> {
  const db = await getDb();
  const { rows } = await db.query<Category>(
    "INSERT INTO categories (slug, name, color_var, bullets, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.slug, data.name, data.color_var, data.bullets, data.image],
  );
  return rows[0];
}

export async function updateCategory(
  id: number,
  data: Partial<Omit<Category, "id">>,
): Promise<Category> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<Category>("SELECT * FROM categories WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<Category>(
    `UPDATE categories SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteCategory(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM categories WHERE id = $1", [id]);
}

// ── Posts ─────────────────────────────────────────────────────
export async function getPosts(): Promise<Post[]> {
  const db = await getDb();
  const { rows } = await db.query<Post>(
    `SELECT p.*, c.color_var AS "categoryColor" FROM posts p
     LEFT JOIN categories c ON c.name = p.category
     ORDER BY p.id DESC`,
  );
  return rows;
}

export async function getPost(slug: string): Promise<Post | null> {
  const db = await getDb();
  const { rows } = await db.query<Post>(
    `SELECT p.*, c.color_var AS "categoryColor" FROM posts p
     LEFT JOIN categories c ON c.name = p.category
     WHERE p.slug = $1`,
    [slug],
  );
  return rows[0] ?? null;
}

export async function createPost(data: Omit<Post, "id" | "created_at">): Promise<Post> {
  const db = await getDb();
  const { rows } = await db.query<Post>(
    `INSERT INTO posts (slug, title, excerpt, body, category, audience, date, image, location, attachments, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [
      data.slug, data.title, data.excerpt, data.body, data.category,
      data.audience, data.date, data.image, data.location,
      JSON.stringify(data.attachments), data.featured,
    ],
  );
  return rows[0];
}

export async function updatePost(
  id: number,
  data: Partial<Omit<Post, "id" | "created_at">>,
): Promise<Post> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<Post>("SELECT * FROM posts WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys
    .map((k, i) => `${k} = $${i + 2}`)
    .join(", ");
  const values = keys.map((k) => {
    const v = (data as Record<string, unknown>)[k];
    return k === "attachments" ? JSON.stringify(v) : v;
  });
  const { rows } = await db.query<Post>(
    `UPDATE posts SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deletePost(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM posts WHERE id = $1", [id]);
}

// ── Events ────────────────────────────────────────────────────
export async function getEvents(): Promise<EventItem[]> {
  const db = await getDb();
  const { rows } = await db.query<EventItem>("SELECT * FROM events ORDER BY month, day");
  return rows;
}

export async function createEvent(data: Omit<EventItem, "id">): Promise<EventItem> {
  const db = await getDb();
  const { rows } = await db.query<EventItem>(
    "INSERT INTO events (day, month, title, time, place) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.day, data.month, data.title, data.time, data.place],
  );
  return rows[0];
}

export async function updateEvent(
  id: number,
  data: Partial<Omit<EventItem, "id">>,
): Promise<EventItem> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<EventItem>("SELECT * FROM events WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<EventItem>(
    `UPDATE events SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteEvent(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM events WHERE id = $1", [id]);
}

// ── Honor Slides ──────────────────────────────────────────────
export async function getHonorSlides(): Promise<HonorSlide[]> {
  const db = await getDb();
  const { rows } = await db.query<HonorSlide>("SELECT * FROM honor_slides ORDER BY id");
  return rows;
}

export async function createHonorSlide(data: Omit<HonorSlide, "id">): Promise<HonorSlide> {
  const db = await getDb();
  const { rows } = await db.query<HonorSlide>(
    "INSERT INTO honor_slides (title, subtitle, image) VALUES ($1, $2, $3) RETURNING *",
    [data.title, data.subtitle, data.image],
  );
  return rows[0];
}

export async function updateHonorSlide(
  id: number,
  data: Partial<Omit<HonorSlide, "id">>,
): Promise<HonorSlide> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<HonorSlide>("SELECT * FROM honor_slides WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<HonorSlide>(
    `UPDATE honor_slides SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteHonorSlide(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM honor_slides WHERE id = $1", [id]);
}

// ── Public Services ───────────────────────────────────────────
export async function getPublicServices(): Promise<PublicService[]> {
  const db = await getDb();
  const { rows } = await db.query<PublicService>("SELECT * FROM public_services ORDER BY id");
  return rows;
}

export async function createPublicService(data: Omit<PublicService, "id">): Promise<PublicService> {
  const db = await getDb();
  const { rows } = await db.query<PublicService>(
    "INSERT INTO public_services (slug, name, description) VALUES ($1, $2, $3) RETURNING *",
    [data.slug, data.name, data.description],
  );
  return rows[0];
}

export async function updatePublicService(
  id: number,
  data: Partial<Omit<PublicService, "id">>,
): Promise<PublicService> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<PublicService>("SELECT * FROM public_services WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<PublicService>(
    `UPDATE public_services SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deletePublicService(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM public_services WHERE id = $1", [id]);
}

// ── Thematics ─────────────────────────────────────────────────
export async function getThematics(): Promise<Thematic[]> {
  const db = await getDb();
  const { rows } = await db.query<Thematic>("SELECT * FROM thematics ORDER BY id");
  return rows;
}

export async function createThematic(data: Omit<Thematic, "id">): Promise<Thematic> {
  const db = await getDb();
  const { rows } = await db.query<Thematic>(
    "INSERT INTO thematics (slug, name, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.slug, data.name, data.description, data.image],
  );
  return rows[0];
}

export async function updateThematic(
  id: number,
  data: Partial<Omit<Thematic, "id">>,
): Promise<Thematic> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<Thematic>("SELECT * FROM thematics WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<Thematic>(
    `UPDATE thematics SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteThematic(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM thematics WHERE id = $1", [id]);
}

// ── Media: Images ──────────────────────────────────────────────
export async function getMediaImages(): Promise<MediaImage[]> {
  const db = await getDb();
  const { rows } = await db.query<MediaImage>("SELECT * FROM media_images ORDER BY id");
  return rows;
}

export async function createMediaImage(data: Omit<MediaImage, "id">): Promise<MediaImage> {
  const db = await getDb();
  const { rows } = await db.query<MediaImage>(
    "INSERT INTO media_images (title, image, date) VALUES ($1, $2, $3) RETURNING *",
    [data.title, data.image, data.date],
  );
  return rows[0];
}

export async function updateMediaImage(
  id: number,
  data: Partial<Omit<MediaImage, "id">>,
): Promise<MediaImage> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<MediaImage>("SELECT * FROM media_images WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<MediaImage>(
    `UPDATE media_images SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteMediaImage(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM media_images WHERE id = $1", [id]);
}

// ── Media: Videos ──────────────────────────────────────────────
export async function getMediaVideos(): Promise<MediaVideo[]> {
  const db = await getDb();
  const { rows } = await db.query<MediaVideo>("SELECT * FROM media_videos ORDER BY id");
  return rows;
}

export async function createMediaVideo(data: Omit<MediaVideo, "id">): Promise<MediaVideo> {
  const db = await getDb();
  const { rows } = await db.query<MediaVideo>(
    "INSERT INTO media_videos (title, source, embed_url, date) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.title, data.source, data.embed_url, data.date],
  );
  return rows[0];
}

export async function updateMediaVideo(
  id: number,
  data: Partial<Omit<MediaVideo, "id">>,
): Promise<MediaVideo> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<MediaVideo>("SELECT * FROM media_videos WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<MediaVideo>(
    `UPDATE media_videos SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteMediaVideo(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM media_videos WHERE id = $1", [id]);
}

// ── Media: Documents ──────────────────────────────────────────
export async function getMediaDocuments(): Promise<MediaDocument[]> {
  const db = await getDb();
  const { rows } = await db.query<MediaDocument>("SELECT * FROM media_documents ORDER BY id");
  return rows;
}

export async function createMediaDocument(data: Omit<MediaDocument, "id">): Promise<MediaDocument> {
  const db = await getDb();
  const { rows } = await db.query<MediaDocument>(
    "INSERT INTO media_documents (title, type, size, date) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.title, data.type, data.size, data.date],
  );
  return rows[0];
}

export async function updateMediaDocument(
  id: number,
  data: Partial<Omit<MediaDocument, "id">>,
): Promise<MediaDocument> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<MediaDocument>("SELECT * FROM media_documents WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<MediaDocument>(
    `UPDATE media_documents SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deleteMediaDocument(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM media_documents WHERE id = $1", [id]);
}

// ── Poll Options ──────────────────────────────────────────────
export async function getPollOptions(): Promise<PollOption[]> {
  const db = await getDb();
  const { rows } = await db.query<PollOption>("SELECT * FROM poll_options ORDER BY id");
  return rows;
}

export async function votePoll(id: number): Promise<PollOption[]> {
  const db = await getDb();
  await db.query("UPDATE poll_options SET value = value + 1 WHERE id = $1", [id]);
  return getPollOptions();
}

export async function createPollOption(data: Omit<PollOption, "id">): Promise<PollOption> {
  const db = await getDb();
  const { rows } = await db.query<PollOption>(
    "INSERT INTO poll_options (label, value, color) VALUES ($1, $2, $3) RETURNING *",
    [data.label, data.value, data.color],
  );
  return rows[0];
}

export async function updatePollOption(
  id: number,
  data: Partial<Omit<PollOption, "id">>,
): Promise<PollOption> {
  const db = await getDb();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const { rows } = await db.query<PollOption>("SELECT * FROM poll_options WHERE id = $1", [id]);
    return rows[0];
  }
  const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as Record<string, unknown>)[k]);
  const { rows } = await db.query<PollOption>(
    `UPDATE poll_options SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0];
}

export async function deletePollOption(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM poll_options WHERE id = $1", [id]);
}

// ── Contacts ──────────────────────────────────────────────────
export async function getContacts(): Promise<Contact[]> {
  const db = await getDb();
  const { rows } = await db.query<Contact>("SELECT * FROM contacts ORDER BY created_at DESC");
  return rows;
}

export async function createContact(data: Omit<Contact, "id" | "created_at">): Promise<Contact> {
  const db = await getDb();
  const { rows } = await db.query<Contact>(
    "INSERT INTO contacts (name, phone, email, topic, message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.name, data.phone, data.email, data.topic, data.message],
  );
  return rows[0];
}

export async function deleteContact(id: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM contacts WHERE id = $1", [id]);
}

// ── Helper: category color lookup ─────────────────────────────
export async function categoryColor(name: string): Promise<string> {
  const db = await getDb();
  const { rows } = await db.query<Category>(
    "SELECT color_var FROM categories WHERE name = $1 LIMIT 1",
    [name],
  );
  return rows[0]?.color_var ?? "var(--color-brand)";
}
