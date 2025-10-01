// app/(pages)/interviews/page.tsx
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import YoutubeVideoModal from "@/components/custom/cards/YoutubeVideoModal";
import { fetchChannelVideos } from "@/lib/youtube-api";
import PageHeader from "@/components/sections/shared/PageHeader";

const CHANNEL_ID = "UCMkA4cP8P2UoXAapQDK-GTw";
const API_KEY = process.env.YOUTUBE_API_KEY!; // put in .env.local

export default async function InterviewsPage() {
  const videos = await fetchChannelVideos(CHANNEL_ID, API_KEY);

  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full p-10 "
    >
      <PageHeader
        title="बतकही"
        subtitle=""
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-12">
        {videos.map((video) => (
          <YoutubeVideoModal
            key={video.url}
            interview={{
              url: video.url,
              // title ko topic bana सकते हो
              topic: video.title,
              date: new Date(video.date).toLocaleDateString("en-GB"),
              // personName optional => default "बतकही"
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
