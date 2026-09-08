import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "You Core — find your personality, but make it fun",
  description:
    "Answer a few oddly specific questions and discover the personality hiding underneath. No sign-up, no boring quiz energy.",
  openGraph: {
    title: "You Core",
    description: "Find out what your friends probably already knew.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F3ED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-cream text-brown antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
