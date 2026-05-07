import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PageLoader } from "@/components/ui/page-loader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-playfair", // kept same var name for compatibility
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter", // kept same var name for compatibility
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = "https://mentawaitatto.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Siolaakenen Muti'ti — Traditional Mentawai Hand Tapping Tattoo",
  description:
    "Sacred Mentawai hand-tapping tattoo by Aikau Sipati'ti, rooted in Sikerei shaman lineage. Traditional titi practice. Padang, West Sumatra, Indonesia.",
  keywords: [
    "Mentawai tattoo",
    "traditional tattoo Indonesia",
    "hand tapping tattoo",
    "titi tattoo",
    "Sikerei",
    "Siolaakenen Muti'ti",
    "Padang tattoo",
    "tribal tattoo Indonesia",
    "sacred tattoo",
    "Siberut island tattoo",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Siolaakenen Muti'ti — Traditional Mentawai Hand Tapping",
    description:
      "Sacred Mentawai hand-tapping tattoo by Aikau Sipati'ti. Rooted in Sikerei shaman lineage. Padang, West Sumatra.",
    url: SITE_URL,
    siteName: "Siolaakenen Muti'ti",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/hero/bg.jpeg`,
        width: 1200,
        height: 630,
        alt: "Siolaakenen Muti'ti — Traditional Mentawai Hand Tapping Tattoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siolaakenen Muti'ti — Traditional Mentawai Hand Tapping",
    description:
      "Sacred Mentawai hand-tapping tattoo. Rooted in Sikerei shaman lineage. Padang, West Sumatra.",
    images: [`${SITE_URL}/images/hero/bg.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'BxXDuTRJBNmEk7cdhJSOfT-CjFSCco-VjV_nEzJaA34',
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0C0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <LanguageProvider>
          <LenisProvider>
            <PageLoader />
            <CustomCursor />
            {children}
          </LenisProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}