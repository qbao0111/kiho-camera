import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const DEFAULT_KEY_SEED = "kiho-camera-integration-secret-key-2026-master";

// Derive a 32-byte encryption key from environment or fallback
function getEncryptionKey(): Buffer {
  const masterSecret = process.env.INTEGRATION_ENCRYPTION_KEY || DEFAULT_KEY_SEED;
  return crypto.createHash("sha256").update(masterSecret).digest();
}

export interface EncryptedData {
  iv: string;
  ciphertext: string;
  tag: string;
}

/**
 * Encrypt a plain-text webhook secret using AES-256-GCM
 */
export function encryptSecret(plainText: string): string {
  if (!plainText) return "";

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();

  const payload: EncryptedData = {
    iv: iv.toString("hex"),
    ciphertext: encrypted,
    tag: tag.toString("hex"),
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

/**
 * Decrypt an AES-256-GCM encrypted payload
 */
export function decryptSecret(encryptedBase64: string): string {
  if (!encryptedBase64) return "";

  try {
    const rawJson = Buffer.from(encryptedBase64, "base64").toString("utf8");
    const payload: EncryptedData = JSON.parse(rawJson);

    const key = getEncryptionKey();
    const iv = Buffer.from(payload.iv, "hex");
    const tag = Buffer.from(payload.tag, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    decipher.setAuthTag(tag);

    let decrypted = decipher.update(payload.ciphertext, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err) {
    console.error("[Encryption] Failed to decrypt secret:", err);
    return "";
  }
}

/**
 * Generate a cryptographically secure 32-byte random webhook secret
 */
export function generateSecureWebhookSecret(): string {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `kiho_sec_${randomBytes}`;
}
