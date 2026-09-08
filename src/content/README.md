# How to edit this website (no coding needed)

Everything on the website that you'd ever want to change — text, brand names, stats,
skills, work history, videos, testimonials — lives in the small `.json` files in this
folder (`src/content`). You do **not** need to touch any other file in this project.

**The rule: edit the text inside the quotes, save the file, and the website updates.**
Don't delete commas, quotes `"..."`, or curly braces `{ }` — just change the words
between the quotes. If you're ever unsure, make a copy of the file first so you can
undo a mistake by pasting it back.

> Note: `.json` files can't contain comments the way this guide can, so keep this
> README open in a tab next to the file you're editing.

## Which file does what

| File | Controls |
|---|---|
| `portfolio.json` | Your name, job titles, short bio, mission statement, languages, email/phone/instagram/location |
| `site.json` | Small repeated bits of text: the "available for freelance" badge, hero paragraph, the 3 words in the footer's scrolling marquee, footer copyright line |
| `navigation.json` | The links in the top menu bar (label + which section it jumps to) |
| `clients.json` | The brand-name tiles in the "Brands that trusted the edit" section. Add `"featured": true` to make one stand out in yellow/bigger. |
| `stats.json` | The 4 big numbers (years experience, clients served, etc). `value` is the number, `suffix` is what's after it (e.g. `"+"`), `icon` must stay one of: Clock, Users, Sparkles, Briefcase |
| `experience.json` | Your work history timeline (one object per job) |
| `education.json` | Your education timeline |
| `skills.json` | The 4 skill category cards and the bars inside each. `level` is 0-100 |
| `services.json` | The "What I deliver" service cards |
| `testimonials.json` | The client quotes section |
| `videos.json` | The Showreel section — see "Adding a video" below |
| `resume.json` | The text on the "Looking for a detailed resume?" card |
| `cinematicPin.json` | The full-screen scrolling image + headline in the "Behind the frame" section |

## Adding or removing a brand (Clients section)

Open `clients.json`. Each brand is one line like:

```json
{ "name": "Soma", "featured": true }
```

- To add a brand: copy one of these lines, paste it in the list, change the name.
- To remove a brand: delete its whole line (including the `{ }` and the comma after it).
- `"featured": true` makes the tile bigger and highlighted — leave it off for a normal tile.

## Adding a video (Showreel section)

Videos are hosted on **Cloudinary** (not in this project's files) — a free
service built for hosting and streaming media.

1. Go to [cloudinary.com](https://cloudinary.com) and log in (ask for the login
   if you don't have it).
2. Open the **Media Library** → click **Upload** → pick your video file.
3. Once uploaded, click the file and copy its URL (starts with
   `https://res.cloudinary.com/g30mdazt/video/upload/...`).
4. Open `videos.json` and add a new line using that URL:

```json
{ "src": "https://<paste-the-copied-url-here>", "client": "Brand Name", "orientation": "landscape" }
```

- `orientation` must be `"landscape"` (wide video) or `"portrait"` (tall/reel video) —
  this decides which row it shows up in and what shape the thumbnail is.
- To remove a video, delete its line the same way as brands above (the file can stay
  on Cloudinary unused, or be deleted from the Media Library too).

## Editing your work experience

Open `experience.json`. Each job is one block with:
- `company`, `subtitle`, `location`, `duration` — the header info
- `role` — shown as a pill/badge
- `description` — one summary sentence
- `bullets` — the list of responsibilities
- `achievements` — short highlight chips
- `isCurrent: true` on your current job shows a "LIVE" badge — only one job should have this set to `true`

## A word of caution

If you save a file and the website breaks or goes blank, you likely deleted a `"`, `{`,
`}`, `[`, `]`, or `,` somewhere. Undo your last change (or restore from a backup copy)
and try again more carefully. When in doubt, change one small thing at a time.
