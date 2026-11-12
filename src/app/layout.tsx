import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wafw-portal.vercel.app"),
  title: {
    default: "World Academy for the Future of Women",
    template: "%s | World Academy for the Future of Women",
  },
  description:
    "Developing university women for global leadership through purpose, action, and service.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-brand-ink">
        {children}
      </body>
    </html>
  );
}
