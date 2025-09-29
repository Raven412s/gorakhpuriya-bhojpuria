import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <Image
        src={"/Logo.png"}
        alt="Logo for Gorakhpuriya Bhojpuria"
        fill
        className="object-cover scale-100"
      />
    </div>
  );
};

export default Logo;
