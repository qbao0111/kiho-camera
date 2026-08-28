import "server-only";

import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const developmentBuckets = new Map<string, { count: number; startedAt: number }>();

export async function checkRentalRequestRateLimit(ipAddress: string) {
  const fingerprint = crypto
    .createHash("sha256")
    .update(ipAddress)
    .digest("hex");
  const supabase = createAdminClient();

  if (supabase) {
    const { data, error } = await supabase.rpc(
      "check_rental_request_rate_limit",
      {
        p_fingerprint: fingerprint,
        p_limit: MAX_REQUESTS,
        p_window_seconds: WINDOW_MS / 1000,
      }
    );

    if (error || typeof data !== "boolean") {
      throw new Error("Rental request rate limiter is unavailable.");
    }
    return data;
  }

  if (!isLocalDataFallbackEnabled()) {
    throw new Error("Production rate limiter is not configured.");
  }

  const now = Date.now();
  const bucket = developmentBuckets.get(fingerprint);
  if (!bucket || now - bucket.startedAt >= WINDOW_MS) {
    developmentBuckets.set(fingerprint, { count: 1, startedAt: now });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= MAX_REQUESTS;
}
