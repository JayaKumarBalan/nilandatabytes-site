# Nilan DataBytes — Website

Static marketing website for **Nilan DataBytes**, offering database administration, development, migration, and engineering support. The design is inspired by modern database-service sites (e.g. MyDBOps) with a clean, professional layout and glass-style header.

---

## Overview

- **Live site:** [https://nilandatabytes.com](https://nilandatabytes.com)
- **Type:** Single-page static site (HTML, CSS, JavaScript)
- **No build step** — open `index.html` in a browser or serve the folder with any static server.

---

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Markup   | HTML5             |
| Styles   | CSS3 (custom, no framework) |
| Scripts  | Vanilla JavaScript |
| Fonts    | Google Fonts (Plus Jakarta Sans) |

---

## Project Structure

```
nilandatabytes-site/
├── index.html    # Single file: all HTML, CSS, and JS
├── README.md     # This file
└── assets/       # Optional: images, etc. (if added later)
```

All content, styles, and behavior are in **one file** (`index.html`) for easy editing and deployment.

---

## Sections

1. **Header** — Floating glass-style nav with logo, Services, Resources, About Us, Success Stories, Contact Us, and “Get in Touch” CTA.
2. **Hero** — Headline, short description, feature pills (24/7 Support, Reliable, Scalable, Secure), CTAs, and database-themed graphics.
3. **Trusted** — “Trusted by Industry Leaders” intro.
4. **Stats** — Metrics (e.g. years, clients, migrations).
5. **About** — Company description.
6. **How We Work** — Methodology (Discovery & Planning, Execution & Support).
7. **Services** — Service cards (e.g. Expert Database Management, Performance Audit, Consulting, Remote DBA).
8. **Technologies** — Tech stack badges (SQL Server, PostgreSQL, MySQL, etc.).
9. **Why Choose Us** — Value propositions.
10. **Case Studies** — Featured project cards.
11. **FAQ** — Common questions.
12. **Contact** — Contact info and form (name, email, phone, database type, message).
13. **Footer** — Links (Services, Resources, Company) and copyright.

---

## Run Locally

### Option 1: Open file

- Double-click `index.html`, or  
- Drag it into a browser window.

### Option 2: Local server (recommended)

**Node (npx):**

```bash
cd nilandatabytes-site
npx serve -l 3000
```

Then open: **http://localhost:3000**

**Python:**

```bash
cd nilandatabytes-site
python -m http.server 3000
```

Then open: **http://localhost:3000**

### Option 3: Same Wi‑Fi (others on your network)

```bash
npx serve -l tcp://0.0.0.0:3000
# or
python -m http.server 3000 --bind 0.0.0.0
```

Use your machine’s LAN IP (e.g. `http://192.168.x.x:3000`) from other devices.

---

## Deploy to Cloudflare Pages

### With GitHub (recommended)

1. Push this folder to a GitHub repo.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo.
4. **Build settings:**
   - **Framework preset:** None  
   - **Build command:** *(leave empty)*  
   - **Build output directory:** `/`
5. Deploy, then add **Custom domain** (e.g. `nilandatabytes.com`).

Pushes to the default branch will trigger new deployments.

### Direct upload (no Git)

1. **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Zip the project folder (with `index.html` at the root).
3. Upload the zip and deploy.
4. Add your custom domain under the project’s **Custom domains**.

---

## Customization

- **Content:** Edit text and links directly in `index.html`.
- **Contact form:** Replace the form `action` or hook it to a service (e.g. Formspree, Netlify Forms) or your backend.
- **Colors:** Change CSS variables at the top of the `<style>` block (e.g. `--accent`, `--text`).
- **Logo:** Replace the inline SVG in the header or point the logo to an image file.

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge).
- The glass header uses `backdrop-filter`; older browsers will show a solid background instead of blur.

---

## License

© Nilan DataBytes. All rights reserved.
