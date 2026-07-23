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
  themeColor: "#070d0c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pavankalyan.vercel.app"),
  title: {
    default: "Pavan Kalyan — Video Editor & Graphic Designer",
    template: "%s | Pavan Kalyan",
  },
  description:
    "Portfolio of Pavan Kalyan, a Creative Video Editor and Graphic Designer specializing in commercial ads, brand identity design, DaVinci color grading, and AI-powered creative workflows.",
  keywords: [
    "Pavan Kalyan",
    "Video Editor",
    "Graphic Designer",
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
    "DaVinci Resolve",
    "Color Grading",
    "Commercial Ads",
    "Hyderabad Video Editor",
    "Hyderabad Graphic Designer",
  ],
  authors: [{ name: "Pavan Kalyan" }],
  creator: "Pavan Kalyan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pavankalyan.vercel.app",
    title: "Pavan Kalyan — Video Editor & Graphic Designer",
    description:
      "Crafting high-impact commercial videos, compelling brand visuals, and digital storytelling for global brands.",
    siteName: "Pavan Kalyan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Kalyan — Video Editor & Graphic Designer",
    description: "Creative Video Editor and Graphic Designer based in Hyderabad.",
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
      <body className="relative bg-[#070d0c] text-[#fffdec] antialiased selection:bg-[#e1e440]/30 selection:text-[#070d0c] min-h-screen">
        {/* JSON-LD Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pavan Kalyan",
              jobTitle: "Video Editor & Graphic Designer",
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
