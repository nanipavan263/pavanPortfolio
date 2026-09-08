// One-off migration: uploads video(s) in public/videos to Vercel Blob and
// records the resulting public URLs in src/content/videos-blob-map.json.
//
// Uploading many large files back-to-back in one long-lived Node process was
// unreliable (uploads would silently stall after a few files, likely a
// connection-pool issue) — this runs one file per process invocation instead
// via scripts/upload-all-videos.sh, which is far more reliable.
//
// Single file:  node --env-file=.env.local scripts/upload-videos-to-blob.mjs <filename.mp4>
// All files:    bash scripts/upload-all-videos.sh
import { put } from "@vercel/blob";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const videosDir = path.join(process.cwd(), "public", "videos");
const outFile = path.join(process.cwd(), "src", "content", "videos-blob-map.json");

const log = (msg) => process.stderr.write(msg + "\n");

async function loadMap() {
  if (!existsSync(outFile)) return {};
  return JSON.parse(await readFile(outFile, "utf8"));
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node scripts/upload-videos-to-blob.mjs <filename.mp4>");
    process.exit(1);
  }

  const map = await loadMap();
  const filePath = path.join(videosDir, file);
  const buffer = await readFile(filePath);
  log(`Uploading ${file} (${(buffer.length / 1024 / 1024).toFixed(1)} MB)...`);
  const start = Date.now();
  const blob = await put(`videos/${file}`, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    multipart: true,
    onUploadProgress: (p) => {
      if (p.percentage % 25 === 0) log(`  ${p.percentage}%`);
    },
  });
  map[file] = blob.url;
  log(`  done in ${((Date.now() - start) / 1000).toFixed(1)}s -> ${blob.url}`);

  await writeFile(outFile, JSON.stringify(map, null, 2) + "\n");
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
