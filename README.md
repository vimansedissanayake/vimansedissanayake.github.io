# vimansedissanayake.github.io

Personal site of Vimanse Dissanayake: writing, films and career. Built with [Astro](https://astro.build), deployed as static files.

## Run it

Requires Node 22.12 or newer and pnpm.

```bash
pnpm install
pnpm dev       # http://localhost:4321, drafts visible
pnpm build     # type-check and build to dist/
pnpm preview   # serve the built site
```

## Add a post

1. Copy `src/content/writing/example-post.md` to a new file. The file name becomes the URL: `cutting-search-latency.md` is published at `/writing/cutting-search-latency`.
2. Fill in the front matter:

   ```yaml
   ---
   title: How we cut search latency 4x across a billion faces
   description: One or two sentences. This is the text LinkedIn shows under the title.
   date: 2026-11-15
   tags: [search, infrastructure]
   draft: false
   ---
   ```

3. Write the post in Markdown below the front matter. Images go in `public/images/` and are referenced as `/images/name.jpg`.
4. Run `pnpm dev` to preview, then build and deploy.

Each post automatically gets a 1200×630 preview image at `/og/<slug>.png`, used when the link is shared on LinkedIn, X or Slack. Posts with `draft: true` show only in `pnpm dev`.

## Films

Films come from the YouTube channel automatically. Every build reads the channel's public feed, so a new upload appears after the next build and deploy.

- Shorts are skipped; only full-length videos are shown.
- The newest film leads the Films page, and the two newest are featured on the homepage.
- A title like `Misty Mounts - Cinematic FPV Sri Lanka` is split into the title and a caption line at the last ` - `.
- To keep a video off the site, add its ID (the part after `v=` in the URL) to `HIDDEN` in `src/data/films.ts`.
- YouTube's feed only lists the 15 most recent uploads. If it can't be reached during a build, the saved `FALLBACK` list in the same file is used instead.

## Deploy (GitHub Pages)

The site is live at https://vimansedissanayake.github.io. Deploys are automatic via `.github/workflows/deploy.yml`:

- **Every push to `main`** builds and publishes the site, usually within two minutes.
- **Once a day** it rebuilds on its own, so new YouTube uploads appear without a commit.
- **Manually:** Actions → Deploy to GitHub Pages → Run workflow.

Publishing a post is just:

```bash
git add src/content/writing/your-post.md
git commit -m "Post: your title"
git push
```

### Custom domain

1. In the repo, Settings → Pages → Custom domain, enter the domain and follow the DNS instructions.
2. Set `SITE` in `astro.config.mjs` to the new domain, so canonical URLs, the sitemap and preview images use it.

## Sharing on LinkedIn

- Share the post URL in a LinkedIn post with two or three lines of your own framing; the preview card is generated for you.
- After changing a post's title or description, refresh LinkedIn's cache with the [Post Inspector](https://www.linkedin.com/post-inspector/).

## Structure

```
src/
  content/writing/   posts (Markdown)
  data/films.ts      YouTube feed, hidden videos, offline fallback
  data/career.ts     roles, certifications, homepage proof points
  consts.ts          name, tagline, links
  pages/             routes, RSS feed, preview images
  components/        Header, Footer, PostList, FilmCard, Timeline, Logo
  styles/global.css  colours, type, grain
```
