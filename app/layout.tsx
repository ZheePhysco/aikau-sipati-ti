import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PageLoader } from "@/components/ui/page-loader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siolaakenen Muti'ti — Traditional Mentawai Hand Tapping",
  description:
    "Come, get tattooed. Traditional Mentawai hand-tapping tattoo by Edo. Padang, West Sumatra.",
  keywords: [
    "Mentawai tattoo",
    "traditional tattoo",
    "hand tapping",
    "titi tattoo",
    "Padang tattoo",
    "Indonesian tribal tattoo",
  ],
  openGraph: {
    title: "Siolaakenen Muti'ti — Traditional Mentawai Hand Tapping",
    description: "Come, get tattooed. Traditional Mentawai hand-tapping tattoo by Edo. Padang, West Sumatra.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080705",
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
      className={`${playfair.variable} ${inter.variable} bg-background`}
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
