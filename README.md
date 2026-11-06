# Forever Our Drew

A memorial website for Andrew William "Drew" Mercer (2006–2026), hosted on GitHub Pages.

It's plain HTML, CSS, and JavaScript with no build step. You update it by editing
**`assets/js/content.js`** and adding image files.

## Folder layout

```
index.html               the page
assets/css/style.css     UNC colors and layout
assets/js/content.js     <- EDIT THIS: video settings and gallery list
assets/js/site.js        page behavior (no need to edit)
assets/img/cards/        prayer cards, programs, service cards
assets/img/photos/       photos of Drew
video/                   only for a compressed video file under 100 MB
```

## Adding prayer cards, programs, or photos

1. Copy the image into `assets/img/cards/` or `assets/img/photos/`. Use a simple
   filename like `prayer-card-front.jpg`.
2. Add a line to `window.GALLERY` in `assets/js/content.js`:
   ```js
   { src: "assets/img/cards/prayer-card-front.jpg", caption: "Prayer card (front)" },
   ```
3. Commit and push. The site updates in about a minute.

## The slideshow video (about 200 MB)

GitHub won't accept any single file over **100 MB**, so you can't commit the
original video to the repo. Pick one of these options:

**Option A: YouTube, Unlisted (recommended).** This plays smoothly on every phone
and adjusts quality to the connection.
1. Upload the video to YouTube and set visibility to **Unlisted**, so only people
   with the link can find it.
2. Copy the ID from the link (`https://youtu.be/AbC123xyz` gives `AbC123xyz`).
3. In `content.js`, set `youtubeId: "AbC123xyz"`.

**Option B: Vimeo.** Same steps, but set `vimeoId`.

**Option C: Host the file on GitHub itself.** Compress the video under 100 MB.
1. `brew install ffmpeg`
2. Compress it:
   ```bash
   ffmpeg -i original.mp4 -c:v libx264 -crf 26 -preset slow -vf "scale=-2:1080" -c:a aac -b:a 128k -movflags +faststart video/drew-slideshow.mp4
   ```
   If the result is still over 95 MB, raise `-crf` to 28 or change `1080` to `720`.
3. In `content.js`, set `src: "video/drew-slideshow.mp4"`.

**Full-quality download (optional, works with any option).** Create a GitHub
Release, attach the original 200 MB file (releases allow up to 2 GB per file),
and paste the file's link into `downloadUrl`:
```bash
gh release create slideshow --title "Memorial slideshow" "/path/to/original.mp4"
```

## Previewing locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Publishing on GitHub Pages

1. Create the repo and push:
   ```bash
   gh repo create drew-memorial --public --source=. --push
   ```
2. Turn on Pages: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
3. The site will be live at `https://<your-username>.github.io/drew-memorial/`.
