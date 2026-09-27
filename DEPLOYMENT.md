# Deploying heyayam.me

Two paths are covered here:

1. **[GitHub Pages + Cloudflare DNS](#option-a--github-pages--cloudflare-dns)** ← recommended
2. **[Your own VPS](#option-b--your-own-vps)**

**Why GitHub Pages is the right default here:** this is a fully static site. It
builds to plain HTML/CSS/JS with no server, no database and no runtime. GitHub
Pages gives you free hosting, free HTTPS, a global CDN and a deploy that runs
automatically on every `git push`. A VPS would add server maintenance, TLS
renewal and deploy scripts for zero functional gain — only worth it if you want
to run other services on the same box.

The repo already contains everything needed for Option A:
`.github/workflows/deploy.yml` and `public/CNAME`.

---

## Option A — GitHub Pages + Cloudflare DNS

### 0. Prerequisites

- The repository must be **public** (GitHub Pages on a private repo requires a
  paid plan). Code on a public repo is fine — nothing secret lives in it.
- Your domain `heyayam.me` should be on Cloudflare (free plan is fine).

### 1. Push the repo to GitHub

The project root is **not** a git repository yet, so pick the case that matches
your situation.

**Case A — the remote repo is empty (most likely):**

```bash
cd /Users/khush/Documents/heyayam
git init
git add .
git commit -m "Initial commit: Astro portfolio site"
git branch -M main

git remote add origin https://github.com/heyayam/heyayam.me.git
git push -u origin main
```

**Case B — the remote repo already has commits** (a README, a licence, an old
site). Do **not** `git init` and commit on top — that creates a second root
commit and divergent history. Clone it first and copy the files in:

```bash
cd ~/Documents
git clone https://github.com/heyayam/heyayam.me.git heyayam-remote
# copy everything except node_modules, dist and .astro into the clone
rsync -av --exclude node_modules --exclude dist --exclude .astro \
  /Users/khush/Documents/heyayam/ heyayam-remote/
cd heyayam-remote
npm install
git add .
git commit -m "Add Astro portfolio site"
git push
```

> **TODO for you:** the placeholder username `heyayam` is used throughout
> (`src/config.ts`, `src/constants.ts`, `README.md`, `package.json`,
> `DEPLOYMENT.md`). Search and replace it with your real GitHub username if it
> differs.

> `.gitignore` already excludes `node_modules/`, `dist/` and `.astro/`, so you
> will only ever commit source.

### 2. Turn on GitHub Pages with Actions as the source

1. Repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**.
   (Do **not** choose "Deploy from a branch" — the workflow in this repo expects
   to publish the artifact itself.)
3. Go to the **Actions** tab. You should see *Deploy to GitHub Pages* running
   from your push. Wait for both the `build` and `deploy` jobs to go green.
4. Your site is now live at `https://heyayam.github.io/heyayam.me/`. Check that
   it loads before touching DNS.

### 3. Set the custom domain in GitHub

Still in **Settings** → **Pages**, under **Custom domain**, enter:

```
heyayam.me
```

and click **Save**.

> ⚠️ **Important and easy to get wrong:** because this repo deploys via a
> *custom GitHub Actions workflow*, the `public/CNAME` file is **ignored** by
> GitHub. The custom domain must be set here in the Settings UI. The file is
> kept only so the repo still works if you ever switch to branch-based
> deployment.

### 4. Point Cloudflare at GitHub Pages

In the Cloudflare dashboard: **DNS** → **Records** → **Add record**.

**Apex domain (`heyayam.me`) — four `A` records:**

| Type | Name | IPv4 address      | Proxy status |
| ---- | ---- | ----------------- | ------------ |
| A    | `@`  | `185.199.108.153` | DNS only     |
| A    | `@`  | `185.199.109.153` | DNS only     |
| A    | `@`  | `185.199.110.153` | DNS only     |
| A    | `@`  | `185.199.111.153` | DNS only     |

**IPv6 (optional but nice to have) — four `AAAA` records:**

| Type | Name | IPv6 address          | Proxy status |
| ---- | ---- | --------------------- | ------------ |
| AAAA | `@`  | `2606:50c0:8000::153` | DNS only     |
| AAAA | `@`  | `2606:50c0:8001::153` | DNS only     |
| AAAA | `@`  | `2606:50c0:8002::153` | DNS only     |
| AAAA | `@`  | `2606:50c0:8003::153` | DNS only     |

**The `www` subdomain — one `CNAME` record:**

| Type  | Name  | Target                    | Proxy status |
| ----- | ----- | ------------------------- | ------------ |
| CNAME | `www` | `heyayam.github.io`       | DNS only     |

Three things that trip people up here:

- **Set Proxy status to "DNS only" (grey cloud), not "Proxied" (orange cloud).**
  With the orange cloud, Cloudflare terminates TLS in front of GitHub, and
  GitHub can't complete its own certificate provisioning — you end up with
  redirect loops or a broken padlock. Grey cloud lets GitHub issue and renew the
  certificate itself, which is simpler and just as fast.
- **Delete any pre-existing `A`/`CNAME` records for `@` or `www`** that
  Cloudflare created during onboarding. A leftover parking record will shadow
  everything above.
- **Never add a wildcard record** (`*`). It's a domain-takeover risk.

> The `CNAME` target must be `heyayam.github.io` — **not** the
> `*.pages.github.io` name shown in your repo settings, and without the
> repository name appended.

### 5. Enforce HTTPS

Back in **Settings** → **Pages**, once the DNS has propagated (minutes to a few
hours, up to 24h worst case), tick **Enforce HTTPS**. This redirects all
`http://` traffic to `https://`.

GitHub will then automatically redirect `www.heyayam.me` ↔ `heyayam.me` to
whichever one you configured as the custom domain.

### 6. Verify

```bash
dig heyayam.me +noall +answer -t A
# should list the four 185.199.1xx.153 addresses

dig www.heyayam.me +nostats +nocomments +nocmd
# should end up at heyayam.github.io
```

Then confirm in a browser:

- `https://heyayam.me` loads with a valid padlock
- `http://heyayam.me` redirects to `https://`
- `https://www.heyayam.me` redirects to `https://heyayam.me`
- `https://heyayam.me/rss.xml`, `/robots.txt` and `/sitemap-index.xml` all load
- The theme toggle works and survives a page reload

### 7. Day-to-day deploys

Every push to `main` triggers the workflow:

```bash
git add .
git commit -m "New post: ..."
git push
```

The workflow runs `npm run check` (type check) then `npm run build`, and only
publishes if both pass. A broken build leaves the live site untouched — that's
the point of gating on the type check.

---

## Option B — Your own VPS

Only worth it if you want other services on the box. Assumes Ubuntu/Debian and a
DNS `A` record for `heyayam.me` pointing at your server's IP.

### 1. Install Node and build the site

```bash
# As a non-root user with sudo
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

sudo mkdir -p /var/www/heyayam.me
sudo chown -R "$USER":"$USER" /var/www/heyayam.me

git clone https://github.com/heyayam/heyayam.me.git /var/www/heyayam.me
cd /var/www/heyayam.me
npm ci
npm run build      # output lands in dist/
```

### 2. Serve it with nginx

`/etc/nginx/sites-available/heyayam.me`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name heyayam.me www.heyayam.me;

    root /var/www/heyayam.me/dist;
    index index.html;

    # Astro emits directory-style URLs (posts/slug/index.html), so try the
    # directory first, then the exact file, then 404.
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Hashed build assets never change — cache them hard.
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/heyayam.me /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### 3. HTTPS

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d heyayam.me -d www.heyayam.me
```

Certbot installs a renewal timer automatically. Check it with
`sudo certbot renew --dry-run`.

### 4. Deploying updates

Either pull and rebuild on the server:

```bash
cd /var/www/heyayam.me && git pull && npm ci && npm run build
```

…or build in GitHub Actions and `rsync` the `dist/` folder to the server over
SSH. Add a `deploy` job to `.github/workflows/deploy.yml` using
`rsync -az --delete dist/ user@server:/var/www/heyayam.me/dist/`, with an SSH key
stored in repo secrets. Rebuilding on the server is simpler; rsync avoids
installing Node on the server at all.

Alternatively, put **Caddy** in front instead of nginx — it gets you automatic
HTTPS in two lines of config:

```
heyayam.me, www.heyayam.me {
    root * /var/www/heyayam.me/dist
    try_files {path} {path}/ {path}/index.html
    file_server
}
```

---

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Site loads at `*.github.io` but custom domain 404s | Custom domain not saved in Settings → Pages (the `CNAME` file is ignored for Actions deploys). |
| "Domain is already taken" when saving the custom domain | The domain is still attached to another repo. Remove it there first, under that repo's Settings → Pages. |
| Redirect loop, or "too many redirects" | Cloudflare proxy is on. Set both records to **DNS only** (grey cloud). |
| Padlock missing / certificate pending after 24h | `A` records are wrong, or a leftover Cloudflare parking record is shadowing them. Run the `dig` checks above. |
| "Enforce HTTPS" is greyed out | GitHub hasn't finished provisioning the certificate yet. It can take up to 24 hours after DNS resolves. |
| Pages build fails at `npm ci` | `package-lock.json` isn't committed. Run `npm install` locally and commit the lockfile. |
| Action fails at `npm run check` | A type error slipped in. Run `npm run check` locally — it reports the same diagnostics. |
| Styles missing on the deployed site | The `_astro/` directory is being stripped. `public/.nojekyll` prevents this; make sure it's present in `public/`. |
