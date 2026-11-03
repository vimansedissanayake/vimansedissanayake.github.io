export interface Film {
  /**
   * The part after `v=` in a YouTube URL: youtube.com/watch?v=dQw4w9WgXcQ -> 'dQw4w9WgXcQ'.
   * Leave empty to show a placeholder slate.
   */
  youtubeId: string;
  title: string;
  year: number;
  /** One short line: location, camera, or what the piece is about. */
  note?: string;
}

const CHANNEL_ID = 'UCXFFwy1gYczoApvMUI8VwVw';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/** Video IDs to keep off the site, e.g. client work. */
const HIDDEN: string[] = [];

/** How many of the newest films appear on the homepage. */
const FEATURED_COUNT = 2;

// Used when YouTube can't be reached at build time. Newest first.
const FALLBACK: Film[] = [
  { youtubeId: '2AkG4nidynk', title: 'Destination Hogwarts! | Idalgashinna Train Station', year: 2025, note: 'Cinematic FPV Sri Lanka' },
  { youtubeId: 'ekn91xLfWX4', title: 'Misty Mounts of Idalgashinna', year: 2025, note: 'Cinematic FPV Sri Lanka' },
  { youtubeId: '2OX85f0nqq0', title: 'Bomburu Ella Sri Lanka FPV Drone Dive', year: 2025, note: 'Cinematic FPV Sri Lanka' },
  { youtubeId: 'DJadYYWZs3E', title: 'Athugala Buddha Statue in Kurunegala', year: 2025, note: 'Cinematic FPV Sri Lanka' },
  { youtubeId: 'zNcztRFfN8E', title: '2024 Cinematic FPV Show Reel', year: 2025 },
  { youtubeId: 'pRDUCYPK8PA', title: 'Canterbury Golf Resort', year: 2025 },
  { youtubeId: '4EhsjPT88fw', title: 'Toyota Land Cruiser 70 Series FPV Chase', year: 2025 },
  { youtubeId: '4Y4eVnGju78', title: 'Phoenix Show Room FPV Virtual Tour', year: 2025 },
];

const decode = (text: string) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

/** "Misty Mounts - Cinematic FPV  Sri Lanka" -> title "Misty Mounts", note "Cinematic FPV Sri Lanka". */
function splitTitle(raw: string): Pick<Film, 'title' | 'note'> {
  const text = decode(raw).replace(/\s+/g, ' ').trim();
  const cut = text.lastIndexOf(' - ');
  return cut > 0 ? { title: text.slice(0, cut), note: text.slice(cut + 3) } : { title: text };
}

function parseFeed(xml: string): Film[] {
  return xml
    .split('<entry>')
    .slice(1)
    .filter((entry) => !entry.includes('/shorts/'))
    .flatMap((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !published) return [];
      return [{ youtubeId: id, year: new Date(published).getUTCFullYear(), ...splitTitle(title) }];
    });
}

async function fetchFilms(): Promise<Film[]> {
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`YouTube feed returned ${res.status}`);
    const films = parseFeed(await res.text());
    if (films.length === 0) throw new Error('YouTube feed had no full-length videos');
    return films;
  } catch (error) {
    console.warn(`[films] Using the saved film list: ${(error as Error).message}`);
    return FALLBACK;
  }
}

let cached: Promise<Film[]> | undefined;

/** Full-length videos from the channel, newest first. Shorts are excluded. */
export async function getFilms(): Promise<Film[]> {
  cached ??= fetchFilms();
  return (await cached).filter((film) => !HIDDEN.includes(film.youtubeId));
}

export async function getFeaturedFilms(): Promise<Film[]> {
  return (await getFilms()).slice(0, FEATURED_COUNT);
}
