
# heyayam.me

An Astro-powered personal portfolio and blog.

## Before you publish

1. Copy your photo to `public/images/ayam.jpg`.
2. Update the GitHub, Twitter, and email links in `src/pages/index.astro`.
3. Install Node.js 20+ and run these as **two separate commands**:

   ```bash
   npm install
   npm run dev
   ```

   Visit the local URL printed in your terminal. Build the production site with `npm run build`; the publishable files will be in `dist/`.

## Publish with GitHub Pages

This repository is already configured for GitHub Pages. The deployment workflow lives at `.github/workflows/deploy-pages.yml`, so do **not** create or paste another workflow.

After pushing to the `main` branch:

1. Open your GitHub repository → **Settings** → **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to complete successfully. Every later push to `main` publishes a new version automatically.
4. Back in **Settings** → **Pages**, enter `heyayam.me` under **Custom domain** and save it.
5. At your domain's DNS provider, add the exact records GitHub shows for the custom domain. Once GitHub verifies them, enable **Enforce HTTPS**.

The repository may remain named `heyayam.me`; it does not need to be named `heyayam.github.io` because the custom domain is configured separately.

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
