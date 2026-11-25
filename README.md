# julianstein.net

Next.js (App Router) + MDX. No CMS — content lives in the repo.

```sh
pnpm install
pnpm dev
```

## Content

- **Projects** — `content/projects/<slug>.mdx`. Frontmatter holds title, year, images,
  Mux/Vimeo/Bandcamp ids, exhibitions; the body is the description. The filename is the URL.
  Images go in `public/images/projects/<slug>/` (keep the long edge ≤ 2400px) and are listed by
  path. Sizes are read from the files and video shapes from Mux, so neither is typed in:

  ```yaml
  featuredImage: "/images/projects/serra/serra-08.jpg"
  images:
    - "/images/projects/serra/serra-04.jpg"
    - src: "/images/projects/serra/serra-05.jpg"
      alt: "Optional description for screen readers"
  ```

  Without an `alt`, images are described as "<title>, image N".
- **About** — `content/about/artist.mdx`.
- **Ordering** — `websiteNav` in `lib/site.ts` is the sidebar list. A project file that isn't in it
  is unlisted: its page still works by URL but nothing links to it and it's hidden from search.

