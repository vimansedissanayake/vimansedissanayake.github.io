---
title: Post template
description: A one or two sentence summary. This is what LinkedIn shows under the title when you share the link.
date: 2026-11-02
tags: [engineering]
draft: true
---

This file is a template and never appears on the live site because `draft` is `true`. It does show up while you run `pnpm dev`, so you can preview formatting.

To publish a new post, copy this file, rename it (the file name becomes the URL, so `cutting-search-latency.md` lives at `/writing/cutting-search-latency`), fill in the front matter, and set `draft: false`.

## A section heading

Normal paragraphs, **bold**, *italic*, and [links](https://example.com) all work. Keep paragraphs short; most readers arrive from a phone.

> Pull quotes render like this. Use them sparingly, for the one line you'd want quoted on LinkedIn.

### Lists

- Lead with the result.
- Explain the constraint that made it hard.
- Show what you'd do differently.

### Code

```python
results = index.search(query_vector, k=10)
```

### Images

Put images in `public/images/` and reference them as `![Alt text](/images/your-image.jpg)`.
