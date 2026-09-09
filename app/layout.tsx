import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { SITE_URL } from "@/lib/site-config";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-geist",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Busayo Ale - Full-Stack Developer",
  description:
    "I engineer high-performance web applications with precision and scale in mind. Specializing in modern JavaScript ecosystems and robust backend architectures.",
  keywords: [
    "Full-Stack Developer",
    "Busayo",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Applications",
  ],
  icons: {
    icon: "/logo-white-bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-on-background min-h-screen font-body-md text-body-md overflow-x-hidden"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}