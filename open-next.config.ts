import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2, Images, KV, queues, or paid bindings. Data/ISR caches are disabled.
export default defineCloudflareConfig();
