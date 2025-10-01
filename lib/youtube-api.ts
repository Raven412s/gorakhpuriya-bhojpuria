// lib/youtube-api.ts

// Types from YouTube Data API v3 (simplified, only what we need)
interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

interface YouTubeSnippet {
  title: string;
  publishedAt: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
  };
}

interface YouTubeVideoId {
  kind: string;
  videoId?: string;
}

interface YouTubeItem {
  id: YouTubeVideoId;
  snippet: YouTubeSnippet;
}

interface YouTubeResponse {
  nextPageToken?: string;
  items: YouTubeItem[];
}

export interface ChannelVideo {
  url: string;
  thumbnail: string;
  title: string;
  date: string;
}

// Fetch all videos from a channel
export async function fetchChannelVideos(
  channelId: string,
  apiKey: string
): Promise<ChannelVideo[]> {
  const videos: ChannelVideo[] = [];
  let pageToken = "";

  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.search = new URLSearchParams({
      key: apiKey,
      channelId,
      part: "snippet",
      order: "date",
      maxResults: "50",
      pageToken,
    }).toString();

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`YouTube API failed: ${res.status}`);

    const data: YouTubeResponse = await res.json();

    data.items
      .filter((item) => item.id.kind === "youtube#video" && !!item.id.videoId)
      .forEach((item) => {
        const thumb =
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          "";
        videos.push({
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          thumbnail: thumb,
          title: item.snippet.title,
          date: item.snippet.publishedAt,
        });
      });

    pageToken = data.nextPageToken ?? "";
  } while (pageToken);

  return videos;
}
