import type { APIRoute, GetStaticPaths } from 'astro';
import { SITE_HEADLINE } from '../../consts';
import { renderOgImage } from '../../lib/og';
import { formatDate, getPosts } from '../../lib/posts';

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  const host = new URL(import.meta.env.SITE).host;

  return [
    {
      params: { slug: 'default' },
      props: { title: SITE_HEADLINE, eyebrow: 'AI systems · Films', footer: host },
    },
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: {
        title: post.data.title,
        eyebrow: `Writing · ${formatDate(post.data.date, 'short')}`,
        footer: host,
      },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as Parameters<typeof renderOgImage>[0]);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
};
