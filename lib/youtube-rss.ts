// lib/youtube-rss.ts
export type YtRssItem = {
  id: string;              // video id
  url: string;             // https://www.youtube.com/watch?v=...
  title: string;
  published: string;       // ISO date
  thumbnail: string;       // from media:thumbnail
};

export async function fetchChannelRSS(channelId: string): Promise<YtRssItem[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(url, { next: { revalidate: 60 } }); // cache 60s
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);

  const xml = await res.text();

  // Very small XML parsing without extra deps (works for YT feed structure)
  const entries = xml.split("<entry>").slice(1).map((chunk) => "<entry>" + chunk);
  const get = (source: string, tag: string) => {
    const m = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    return m?.[1]?.trim() ?? "";
  };
  const getAttr = (source: string, tag: string, attr: string) => {
    const m = source.match(new RegExp(`<${tag}[^>]*${attr}="([^"]+)"[^>]*/?>`));
    return m?.[1] ?? "";
  };

  return entries.map((entry) => {
    const videoId =
      get(entry, "yt:videoId") || get(entry, "yt:videoid") || ""; // safety
    const title = get(entry, "title");
    const published = get(entry, "published");
    // media:thumbnail url attr (hqdefault is typical)
    const thumb = getAttr(entry, "media:thumbnail", "url")
      || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "");
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    return { id: videoId, url, title, published, thumbnail: thumb };
  }).filter(i => i.id); // drop broken rows
}
