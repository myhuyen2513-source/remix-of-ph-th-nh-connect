import { getDb } from "./db";
import type { User, UserRole } from "./types";

const PBKDF2_ITERATIONS = 100000;
const SALT = "ttcudvc-phuthanh-fixed-salt";

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(SALT),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return `pbkdf2:${PBKDF2_ITERATIONS}:sha256:${Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("")}`;
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (storedHash.startsWith("PLAIN:")) {
    return password === storedHash.slice(6);
  }
  const computed = await hashPassword(password);
  return computed === storedHash;
}

function makeToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const SESSION_KEY = "ttcudvc_session";

export type AuthResult =
  | { ok: true; user: User; token: string }
  | { ok: false; error: string };

export async function login(username: string, password: string): Promise<AuthResult> {
  const db = await getDb();
  const { rows } = await db.query<User & { password_hash: string }>(
    "SELECT * FROM users WHERE username = $1",
    [username],
  );
  if (rows.length === 0) return { ok: false, error: "Tên đăng nhập không tồn tại" };
  const user = rows[0];
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return { ok: false, error: "Mật khẩu không đúng" };

  const token = makeToken();
  const safeUser: User = {
    id: user.id,
    username: user.username,
    role: user.role as UserRole,
    full_name: user.full_name,
    created_at: user.created_at,
  };
  const session = { user: safeUser, token };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: safeUser, token };
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession(): { user: User; token: string } | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}

export function getCurrentRole(): UserRole | null {
  return getSession()?.user.role ?? null;
}

export function hasRole(...roles: UserRole[]): boolean {
  const r = getCurrentRole();
  return r !== null && roles.includes(r);
}

export async function changePassword(
  userId: number,
  oldPassword: string,
  newPassword: string,
): Promise<{ ok: boolean; error?: string }> {
  const db = await getDb();
  const { rows } = await db.query<{ password_hash: string }>(
    "SELECT password_hash FROM users WHERE id = $1",
    [userId],
  );
  if (rows.length === 0) return { ok: false, error: "Người dùng không tồn tại" };
  const valid = await verifyPassword(oldPassword, rows[0].password_hash);
  if (!valid) return { ok: false, error: "Mật khẩu cũ không đúng" };
  const newHash = await hashPassword(newPassword);
  await db.query("UPDATE users SET password_hash = $1 WHERE id = $2", [newHash, userId]);
  return { ok: true };
}

export async function createUser(
  username: string,
  password: string,
  role: UserRole,
  fullName: string,
): Promise<{ ok: boolean; error?: string; user?: User }> {
  const db = await getDb();
  const { rows: existing } = await db.query("SELECT id FROM users WHERE username = $1", [username]);
  if (existing.length > 0) return { ok: false, error: "Tên đăng nhập đã tồn tại" };
  const hash = await hashPassword(password);
  const { rows } = await db.query<User>(
    "INSERT INTO users (username, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING id, username, role, full_name, created_at",
    [username, hash, role, fullName],
  );
  return { ok: true, user: rows[0] };
}

export async function updateUserRole(userId: number, role: UserRole): Promise<void> {
  const db = await getDb();
  await db.query("UPDATE users SET role = $1 WHERE id = $2", [role, userId]);
}

export async function deleteUser(userId: number): Promise<void> {
  const db = await getDb();
  await db.query("DELETE FROM users WHERE id = $1", [userId]);
}

export async function resetPassword(userId: number, newPassword: string): Promise<void> {
  const db = await getDb();
  const hash = await hashPassword(newPassword);
  await db.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hash, userId]);
}

export async function getUsers(): Promise<User[]> {
  const db = await getDb();
  const { rows } = await db.query<User>(
    "SELECT id, username, role, full_name, created_at FROM users ORDER BY id",
  );
  return rows;
}

// Permission matrix: which roles can access which tabs
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [
    "settings", "posts", "categories", "events", "honor",
    "services", "thematics", "mediaImages", "mediaVideos",
    "mediaDocs", "polls", "contacts", "users",
  ],
  EDITOR: [
    "posts", "categories", "events", "honor",
    "services", "thematics", "mediaImages", "mediaVideos",
    "mediaDocs", "polls",
  ],
  VIEWER: [],
};

export function canAccess(tab: string): boolean {
  const role = getCurrentRole();
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(tab) ?? false;
}
