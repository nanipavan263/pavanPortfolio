import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import AuroraBackground from "@/components/layout/AuroraBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#072e27",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pavankalyan.vercel.app"),
  title: {
    default: "Pavan Kalyan — Video Editor & Motion Graphics Designer",
    template: "%s | Pavan Kalyan",
  },
  description:
    "Award-winning portfolio of Pavan Kalyan, a Creative Video Editor and Motion Graphics Designer specializing in commercial ads, After Effects VFX, DaVinci color grading, and AI workflows.",
  keywords: [
    "Pavan Kalyan",
    "Video Editor",
    "Motion Graphics Designer",
    "After Effects",
    "Premiere Pro",
    "DaVinci Resolve",
    "Color Grading",
    "Commercial Ads",
    "Hyderabad Video Editor",
  ],
  authors: [{ name: "Pavan Kalyan" }],
  creator: "Pavan Kalyan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pavankalyan.vercel.app",
    title: "Pavan Kalyan — Video Editor & Motion Graphics Designer",
    description:
      "Crafting high-impact commercial ads, immersive motion graphics, and digital storytelling for global brands.",
    siteName: "Pavan Kalyan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Kalyan — Video Editor & Motion Graphics Designer",
    description: "Creative Video Editor and Motion Graphics Designer based in Hyderabad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative bg-[#072e27] text-[#fffdec] antialiased selection:bg-[#e1e440]/30 selection:text-[#072e27] min-h-screen">
        {/* JSON-LD Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pavan Kalyan",
              jobTitle: "Video Editor & Motion Graphics Designer",
              worksFor: {
                "@type": "Organization",
                name: "The Vivid View",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "India",
              },
              email: "nanipavan263@gmail.com",
              telephone: "+916281423835",
              url: "https://pavankalyan.vercel.app",
              sameAs: ["https://instagram.com/pavannanifx"],
            }),
          }}
        />
        <AuroraBackground />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
