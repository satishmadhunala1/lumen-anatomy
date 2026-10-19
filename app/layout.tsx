import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 675,
  alt: "Lumen — interactive 3D human anatomy explorer",
};

/**
 * Absolute URLs for og:image and friends. Resolved per host so a preview
 * deployment does not advertise another origin's assets:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override, wins everywhere
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production domain
 *   3. the original Cloudflare/OpenAI host
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://anatomy-atelier.openai.site");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lumen — Interactive anatomy studio",
  description:
    "Original interactive anatomy experience: 15 specimens, animated pathways, quizzes, flashcards, developmental timelines, and myth-busting — built for curious learners.",
  applicationName: "Lumen",
  keywords: ["anatomy", "3D anatomy", "human body", "medical education", "interactive learning", "organs", "quiz", "flashcards", "pathway", "lumen"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    siteName: "Lumen",
    title: "Lumen — See inside the body",
    description: "Interactive 3D anatomy with quizzes, flashcards, and systems exploration.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen — See inside the body",
    description: "Interactive 3D anatomy with quizzes, flashcards, and systems exploration.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#e8f1f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        {children}
      </body>
    </html>
  );
}
