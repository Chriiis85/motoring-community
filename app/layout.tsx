import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans, Titillium_Web } from "next/font/google";
import "./globals.css";


const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const titilliumWeb = Titillium_Web({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-titillium",
  display: "swap",
});

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
      <body
        className={`${bebasNeue.variable} ${openSans.variable} ${titilliumWeb.variable} antialiased`}
      >
        
          {children}
        
      </body>
    </html>
  );
}
