# content/ — Life in Korea guides

This folder is the source of truth for everything the site shows under **Life in Korea**.
The site itself never reads these files at runtime: `tools/build-posts.mjs` compiles them
into `posts.js`, which `index.html` loads before `script.js`. (KU-ICK is a plain static
site with no bundler, and it's often opened straight from disk, where `fetch()` of a local
`.md` would be blocked — hence the build step.)

## Adding a post

1. Drop the markdown file in `content/posts/<slug>.md` with YAML front matter:

   ```markdown
   ---
   title: "Post title"
   subtitle: "One line shown on the card and under the title"
   slug: "post-slug"
   series: "settlement-guide"
   part: null            # a number if it's an explicit Part N, otherwise null
   tags:
     - TagOne
     - TagTwo
   related_resources:
     - title: "Official site name"
       url: "https://example.go.kr/"
   ---

   Body text in markdown.
   ```

2. Add the matching entry to `content/index.json`:

   ```json
   {
     "order": 13,
     "slug": "post-slug",
     "series": "settlement-guide",
     "category": "Immigration",
     "part": null,
     "title": "Post title",
     "subtitle": "…",
     "tags": ["TagOne", "TagTwo"],
     "relatedResources": [{ "title": "…", "url": "…" }],
     "file": "posts/post-slug.md"
   }
   ```

   `order` controls the order guides appear in the grid, and `category` must be one of the
   categories in the site's **Life in Korea** nav dropdown: `Immigration`, `Mobile`,
   `Insurance`, `Banking`, `Transportation`, `Campus Life`. Anything else silently falls
   back to `Campus Life` and won't have its own filter chip.

3. Rebuild:

   ```
   node tools/build-posts.mjs
   ```

4. Commit `content/`, `posts.js`, and nothing else — the rest of the site picks the post up
   automatically: the card, the category filter, pagination, search, reading time, the
   series list, and the "Related guides" links (computed from shared tags, so nothing has to
   be cross-linked by hand).

## What the renderer supports

Post bodies go through a small markdown renderer in `script.js` (`renderMarkdown`) that
covers exactly what these posts use: `##`/`###` headings, `-` bullet lists, `**bold**`,
`*italic*`, and `[text](https://url)` links. Anything else is escaped and shown as plain
text, so stick to those constructs — or extend `renderMarkdown` first.
