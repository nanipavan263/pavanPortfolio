import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const mapFile = path.join(process.cwd(), "src", "content", "videos-cloudinary-map.json");
const videosFile = path.join(process.cwd(), "src", "content", "videos.json");

const map = JSON.parse(await readFile(mapFile, "utf8"));
const videos = JSON.parse(await readFile(videosFile, "utf8"));

let missing = [];
const updated = videos.map((v) => {
  const filename = v.src.split("/").pop();
  const url = map[filename];
  if (!url) {
    missing.push(filename);
    return v;
  }
  return { ...v, src: url };
});

if (missing.length) {
  console.error("Missing Cloudinary URLs for:", missing);
  process.exit(1);
}

await writeFile(videosFile, JSON.stringify(updated, null, 2) + "\n");
console.log(`Updated ${updated.length} entries in ${videosFile}`);
