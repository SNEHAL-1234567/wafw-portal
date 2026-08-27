import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wafw.example.org"),
  title: {
    default: "World Academy for the Future of Women",
    template: "%s | World Academy for the Future of Women",
  },
  description:
    "WAFW promotes and accelerates the advancement of women in leadership worldwide through an eight-module program delivered by trained volunteer facilitators.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-ink">
        {children}
      </body>
    </html>
  );
}
