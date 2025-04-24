import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyleProvider from "@/context/StyleProvider";
import SessionProvider from "@/context/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmoothieFusion",
  description:
    "SmoothieFusion is a recipe app that helps you find and share smoothie recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <StyleProvider>{children}</StyleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
