// app/(pages)/interviews/page.tsx

import YoutubeVideoModal from "@/components/custom/cards/YoutubeVideoModal";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import type { ChannelVideo } from "@/lib/youtube-api";

export default async function InterviewsPage() {
  let videos: ChannelVideo[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load videos");
    videos = await res.json();
  } catch (err) {
    console.error("YouTube fetch error:", err);
  }



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
