import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import CookieBanner from "@/components/ui/CookieBanner";
import OfflineBanner from "@/components/ui/OfflineBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motoring Community - The Home of F1 Fans",
  description:
    "Welcome to Motoring Community! Find all data, news, standings and information about Formula One Championship seasons past and present.",
  keywords: ["Formula 1", "F1", "motorsport", "racing", "standings", "drivers", "teams", "calendar"],
  openGraph: {
    title: "Motoring Community",
    description: "The home of all the race fans, where we can meet together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="dns-prefetch" href="https://api.jolpi.ca" />
        <link rel="dns-prefetch" href="https://newsapi.org" />
      </head>
      <body className="antialiased bg-white dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <OfflineBanner />
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
