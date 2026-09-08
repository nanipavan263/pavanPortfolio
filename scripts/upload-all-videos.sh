#!/usr/bin/env bash
# Uploads every video in public/videos to Vercel Blob, one fresh `node`
# process per file (see upload-videos-to-blob.mjs for why). Safe to re-run —
# skips files already present in src/content/videos-blob-map.json.
set -uo pipefail
cd "$(dirname "$0")/.."

MAP_FILE="src/content/videos-blob-map.json"
[ -f "$MAP_FILE" ] || echo '{}' > "$MAP_FILE"

for f in public/videos/*.mp4; do
  name="$(basename "$f")"
  if grep -q "\"$name\"" "$MAP_FILE" 2>/dev/null; then
    echo "skip (already uploaded): $name"
    continue
  fi
  echo "=== $name ==="
  timeout 90 node --env-file=.env.local scripts/upload-videos-to-blob.mjs "$name"
  status=$?
  if [ $status -ne 0 ]; then
    echo "!!! FAILED or timed out: $name (exit $status) — will retry on next run"
  fi
done

echo "Done. See $MAP_FILE"
