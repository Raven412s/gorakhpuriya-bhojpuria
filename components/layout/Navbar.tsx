"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Logo from "./Logo";

const BASE_NAV = [
  { href: "/", label: "गृह" },
  { href: "/about", label: "हमरे बारे में" },
  { href: "/bhojpuri-bhasa", label: "भोजपुरी भाषा" },
  { href: "/mentors", label: "हमरे अभिभावक" },
  { href: "/events", label: "बैइठकी जुटान" },
  { href: "/interviews", label: "बतकही" },
  // shop will be added dynamically when needed by the maintenance server.
  { href: "/media-partners", label: "मीडिया साथी" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showShop = (process.env.NEXT_PUBLIC_SHOW_SHOP ?? "").toLowerCase() === "true";
  const navItems = useMemo(() => {
    const items = [...BASE_NAV];
    if (showShop) {
      // insert shop before media-partners (index 6)
      items.splice(6, 0, { href: "/shop", label: "दुकान" });
    }
    return items;
  }, [showShop]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* h-16 हटाएँ, padding दें ताकि height content के हिसाब से हो */}
        <div className="flex justify-between items-center py-2 md:py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 overflow-visible">
            {/* Logo wrapper: responsive size */}
            <div className="h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-20 lg:w-20 overflow-visible">
              {/* अगर Logo SVG है */}
              <Logo className="h-full w-full" />
              {/* अगर Logo <Image> है तो:
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              */}
            </div>
            <span className="font-bold text-xl md:text-2xl text-red-700 leading-none">
              गोरखपुरिया भोजपुरिया
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-colors hover:text-red-600 ${pathname === item.href ? "text-red-600" : "text-gray-700"
                  }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation (ज्यों का त्यों) */}
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open Menu"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85%] sm:w-[380px]">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="h-10 w-10">
                      <Logo className="h-full w-full" />
                    </div>
                    <span className="text-lg font-bold text-red-700">
                      गोरखपुरिया भोजपुरिया
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Nav Links */}
                <nav className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                rounded-lg px-4 py-3 text-base font-medium transition
                ${active
                            ? "bg-red-50 text-red-700"
                            : "text-gray-700 hover:bg-gray-100"}
              `}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer / CTA (optional but good UX) */}
                <div className="mt-auto pt-6 text-center text-sm text-gray-500">
                  © {new Date().getFullYear()} गोरखपुरिया भोजपुरिया
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
