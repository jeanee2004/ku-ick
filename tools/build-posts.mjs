/**
 * build-posts.mjs — turns content/ into posts.js
 *
 * KU-ICK is a plain static site with no bundler, and it's often opened from
 * file:// where fetch() of a local .md would be blocked. So the researched
 * posts get baked into a single JS data file that index.html loads before
 * script.js.
 *
 * Source of truth:
 *   content/index.json   — one entry per post (order, slug, category, tags, …)
 *   content/posts/*.md   — the post itself: YAML front matter + markdown body
 *
 * Run after adding or editing a post:  node tools/build-posts.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Front matter here is a small, known subset of YAML (scalars, a string list,
   and a list of {title,url} objects) — enough that a dependency-free parser is
   simpler than pulling one in. */
function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw.trim() };

  const data = {};
  let listKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;

    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      const pair = item[1].match(/^(\w+):\s*(.*)$/);
      if (pair) data[listKey].push({ [pair[1]]: unquote(pair[2]) });
      else data[listKey].push(unquote(item[1]));
      continue;
    }

    const cont = line.match(/^\s{4,}(\w+):\s*(.*)$/);
    if (cont && listKey && data[listKey].length) {
      Object.assign(data[listKey][data[listKey].length - 1], { [cont[1]]: unquote(cont[2]) });
      continue;
    }

    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    if (kv[2] === '') { listKey = kv[1]; data[listKey] = []; }
    else { listKey = null; data[kv[1]] = scalar(kv[2]); }
  }
  return { data, body: raw.slice(match[0].length).trim() };
}

function unquote(v) { return v.trim().replace(/^["'](.*)["']$/, '$1'); }
function scalar(v) {
  const s = unquote(v);
  if (s === 'null' || s === '~') return null;
  if (/^-?\d+$/.test(s)) return Number(s);
  return s;
}

/* Rough but stable: ~200 wpm, rounded up, so cards can show "5 min read". */
function readingMinutes(body) {
  const words = body.replace(/[#*_>`-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const index = JSON.parse(readFileSync(join(root, 'content/index.json'), 'utf8'));

const posts = index
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map(entry => {
    const raw = readFileSync(join(root, 'content', entry.file), 'utf8');
    const { data, body } = parseFrontMatter(raw);
    if (!body) throw new Error(`${entry.file}: empty body`);
    return {
      slug: entry.slug || data.slug,
      order: entry.order ?? 0,
      title: entry.title || data.title,
      subtitle: entry.subtitle || data.subtitle || '',
      category: entry.category || 'Campus Life',
      series: entry.series ?? data.series ?? null,
      part: entry.part ?? data.part ?? null,
      tags: entry.tags || data.tags || [],
      relatedResources: entry.relatedResources || data.related_resources || [],
      readingMinutes: readingMinutes(body),
      body,
    };
  });

const seen = new Set();
for (const p of posts) {
  if (!p.slug) throw new Error('post is missing a slug');
  if (seen.has(p.slug)) throw new Error(`duplicate slug: ${p.slug}`);
  seen.add(p.slug);
}

const out = `/* GENERATED FILE — do not edit by hand.
   Source: content/index.json + content/posts/*.md
   Regenerate with: node tools/build-posts.mjs */
window.KUICK_POSTS = ${JSON.stringify(posts, null, 2)};
`;

writeFileSync(join(root, 'posts.js'), out);
console.log(`posts.js — ${posts.length} posts, ${(out.length / 1024).toFixed(1)} KB`);
