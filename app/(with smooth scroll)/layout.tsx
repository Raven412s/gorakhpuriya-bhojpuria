import { ReactLenis } from "lenis/react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "../globals.css";
import { Lexend, Nunito, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans-2",
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans-3",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "गोरखपुरिया भोजपुरिया - भोजपुरी भाषा के सम्मान",
  description: "सभ्य समाज में भोजपुरी भाषा के सम्मान देवे के अभियान",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${lexend.variable} ${nunito.variable}`}
      >
        <ReactLenis root>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ReactLenis>
      </body>
    </html>
  );
}
