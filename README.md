# julianstein.net

Next.js (App Router) + MDX. No CMS — content lives in the repo.

```sh
npm install
npm run dev
```

## Content

- **Projects** — `content/projects/<slug>.mdx`. Frontmatter holds title, year, images,
  Vimeo/Bandcamp ids, exhibitions; the body is the description. The filename is the URL.
  Images go in `public/images/projects/<slug>/` (keep the long edge ≤ 2400px).
- **About** — `content/about/artist.mdx`.
- **Ordering** — `websiteNav` in `lib/site.ts` is the sidebar list. A project file that isn't in it
  is unlisted: its page still works by URL but nothing links to it and it's hidden from search.

