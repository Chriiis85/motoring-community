import type { Metadata } from "next";
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
