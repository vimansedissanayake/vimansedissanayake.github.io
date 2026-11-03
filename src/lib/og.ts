import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { LOCATION } from '../consts';

const require = createRequire(import.meta.url);

// Satori reads TTF/OTF/WOFF (not WOFF2), so these come from the static @fontsource packages.
const fontFile = (pkg: string, file: string) => readFile(require.resolve(`${pkg}/files/${file}`));

const fonts = Promise.all([
  fontFile('@fontsource/inter', 'inter-latin-400-normal.woff'),
  fontFile('@fontsource/inter', 'inter-latin-500-normal.woff'),
  fontFile('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
]).then(([regular, medium, mono]) => [
  { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: medium, weight: 500 as const, style: 'normal' as const },
  { name: 'Mono', data: mono, weight: 400 as const, style: 'normal' as const },
]);

// Resolved from the project root because this module is bundled to a different path at build time.
const wordmark = readFile(path.join(process.cwd(), 'public/wordmark.png')).then(
  (png) => `data:image/png;base64,${png.toString('base64')}`,
);

type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

interface OgOptions {
  title: string;
  eyebrow: string;
  footer: string;
}

/** Renders a 1200x630 PNG in the site's letterboxed, dark style. */
export async function renderOgImage({ title, eyebrow, footer }: OgOptions): Promise<Buffer> {
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 78;

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#000',
      fontFamily: 'Inter',
    },
    [
      h('div', { height: 44, background: '#000' }),
      h(
        'div',
        {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          backgroundColor: '#07070a',
          backgroundImage: 'radial-gradient(circle at 50% -20%, #1c1c22 0%, #07070a 65%)',
          borderTop: '1px solid #1d1d22',
          borderBottom: '1px solid #1d1d22',
        },
        [
          h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
            h('img', { width: 470, height: 17 }, undefined, { src: await wordmark, width: 470, height: 17 }),
            h(
              'div',
              { fontFamily: 'Mono', fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#e7b46a' },
              eyebrow,
            ),
          ]),
          h(
            'div',
            {
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 500,
              letterSpacing: -2,
              lineHeight: 1.08,
              color: '#ecebe6',
              maxWidth: 1000,
            },
            title,
          ),
          h(
            'div',
            {
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'Mono',
              fontSize: 20,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#8d8c88',
            },
            [h('div', {}, LOCATION), h('div', {}, footer)],
          ),
        ],
      ),
      h('div', { height: 44, background: '#000' }),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts: await fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
