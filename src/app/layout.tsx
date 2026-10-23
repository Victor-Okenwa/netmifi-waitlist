import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import "./globals.css";

const dmSans = localFont({
  src: "../assets/fonts/DMSans-Regular.ttf",
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Netmifi",
  description:
    "Tutorials, classmates, tutors, and study materials for the course in front of you, in one place. Netmifi is a free waitlist for Nigerian undergraduates.",
  keywords: [
    "netmifi",
    "waitlist",
    "Nigerian undergraduates",
    "tutorials",
    "tutors",
    "classmates",
    "study materials",
    "university courses",
    "MTH 111",
  ],
  authors: [
    { name: "Nnaemena Onyekachi" },
    { name: "Chukwu Emmanuel" },
    { name: "Okenwa Victor" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-dm-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
