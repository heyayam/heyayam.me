
An Astro-powered personal portfolio and blog.

## Before you publish

1. Copy your photo to `public/images/ayam.jpg`.
2. Update the GitHub, Twitter, and email links in `src/pages/index.astro`.
3. Install Node.js 20+ and run:

   ```bash
   npm install
   npm run dev
   ```

   Visit the local URL printed in your terminal. Build the production site with `npm run build`; the publishable files will be in `dist/`.

## Option A — GitHub Pages

This is free, but it serves a static site. Create a repository named `heyayam.github.io`, add this project to it, then enable **Settings → Pages → GitHub Actions**. Add the workflow below as `.github/workflows/deploy.yml`:

```yaml
name: Deploy site
on:
  push: { branches: [main] }
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
      - uses: actions/deploy-pages@v4
```

In your domain DNS provider, add GitHub Pages’ custom-domain records shown in **Settings → Pages**, then add `heyayam.me` as the custom domain there. GitHub will issue HTTPS after DNS verifies.

## Option B — your VPS (recommended when you already have one)

Build locally or on the VPS: `npm ci && npm run build`. Copy the contents of `dist/` to `/var/www/heyayam.me/`. With Nginx installed, create `/etc/nginx/sites-available/heyayam.me`:

```nginx
server {
  listen 80;
  server_name heyayam.me www.heyayam.me;
  root /var/www/heyayam.me;
  index index.html;
  location / { try_files $uri $uri/ /404.html; }
}
```

Enable it with `sudo ln -s /etc/nginx/sites-available/heyayam.me /etc/nginx/sites-enabled/`, verify with `sudo nginx -t`, and reload with `sudo systemctl reload nginx`. Point DNS `A` records for `@` and `www` to your VPS public IPv4 address. Finally enable TLS: `sudo certbot --nginx -d heyayam.me -d www.heyayam.me`.

For updates, you can keep the source in GitHub and either pull/build on the VPS or use a GitHub Action with SSH deployment.
>>>>>>> 07533d7 (Blog content)
