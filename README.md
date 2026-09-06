# blechschinda.de

Static website for the brass band **Blechschinda**, hosted on **Cloudflare Pages**
directly from this Git repository. There is no build step and no Worker — Pages
serves the repository root as-is.

## Deployment

Cloudflare Pages project settings:

| Setting                | Value     |
| ---------------------- | --------- |
| Framework preset       | *None*    |
| Build command          | *(empty)* |
| Build output directory | `/`       |
| Root directory         | `/`       |

Every push to `main` publishes automatically; pushes to other branches create
preview deployments.

## Layout

```
├── index.html                     # Home: Über uns, Musikanten, Kontakt
├── auftritte/index.html           # Gig schedule
├── galerie/index.html             # Photo gallery
├── impressum/index.html
├── datenschutzerklarung/index.html
├── 404.html                       # Served by Pages for unknown paths
├── robots.txt, sitemap.xml
├── _headers                       # Security + cache-control headers
├── _redirects                     # Legacy WordPress URLs
├── assets/                        # Theme/plugin CSS + JS, webfonts
│   ├── css/                       # Per-page Elementor CSS
│   ├── elementor/                 # Elementor frontend + eicons
│   ├── fonts/                     # Self-hosted Roboto / Roboto Slab
│   ├── js/                        # jQuery
│   └── oceanwp/                   # OceanWP theme + Font Awesome
└── media/                         # Photos (WebP), favicons (PNG)
```

Pages are plain HTML exported from the original WordPress site.

## Previewing locally

Internal links and asset references are root-absolute (`/assets/…`, `/media/…`),
so the site must be served over HTTP from the repository root. Opening
`index.html` via `file://` — or serving from a parent directory — will load the
HTML without any CSS:

```sh
python3 -m http.server 8000    # then open http://localhost:8000/
```

## Editing content

Edit the HTML directly and push. The most common change is the gig list in
`auftritte/index.html`.

When adding photos, convert them to WebP first and keep them under ~500 KB:

```sh
cwebp -q 82 -m 6 -resize 2048 0 input.jpg -o media/2026/01/name.webp
```

Then reference them with explicit `width`/`height` attributes so the browser can
reserve layout space before the image loads.

## Notes

* The old Contact Form 7 form had no backend after the WordPress export and was
  replaced by a direct mail contact in the Kontakt section.
* Roboto and Roboto Slab are self-hosted under `assets/fonts/`. Do not swap them
  back to the Google Fonts CDN — that would send visitor IPs to Google, which
  German courts have repeatedly held to require consent.
* All photos are WebP. The original JPG/PNG uploads are only in Git history.
* `sitemap.xml` lists all five pages; update `<lastmod>` when content changes
  materially. The copyright year in the footer is hardcoded in each page.
