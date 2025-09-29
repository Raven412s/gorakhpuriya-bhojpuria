// app/(pages)/interviews/page.tsx
import SectionWrapper from "@/components/wrappers/SectionWrapper";

const InterviewsPage = () => {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full pointer-events-auto p-10"
    >
      Interviews Page
    </SectionWrapper>
  );
};

export default InterviewsPage;
