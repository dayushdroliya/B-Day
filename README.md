# Manuu Birthday Website — Dayuu × Manuu

## Folder structure
- `index.html`
- `assets/css/style.css`
- `assets/css/animations.css`
- `assets/js/config.js`
- `assets/js/intro.js`
- `assets/js/countdown.js`
- `assets/js/experience.js`
- `assets/images/photos/`
- `assets/videos/`
- `assets/audio/`

## Add your photos
Put photos in `assets/images/photos/` and name them exactly:
`photo-01.jpg` through `photo-20.jpg`.
Gallery hides missing files automatically. If using `.jpeg`, set `photoExtension: "jpeg"` in `assets/js/config.js`.

## Add your video
Put it at `assets/videos/our-memory.mp4`.

## Add your generated song
Put the final MP3 at `assets/audio/tu-hai-toh-main-hoon.mp3`.
Press Play on the site; browsers generally block autoplay until a visitor interacts.

## Password and date
Edit `assets/js/config.js`:
- `password: "manuu"` — change to your chosen private password.
- `revealAt: "2026-11-18T00:00:00+05:30"` — midnight IST.

The password gate is a fun front-end gate, not secure authentication.

## Preview without changing the real date
Open your site URL with `?preview=1`, then enter the password. Example:
`https://USERNAME.github.io/REPOSITORY/?preview=1`
Remove `?preview=1` for the real birthday countdown.

## Publish on GitHub Pages
Upload the CONTENTS of this folder to the repository root (so `index.html` is at root), then enable Pages from `main` branch and `/ (root)`.
