import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "viprbx",
  description:
    "Get free currency for the game called roblox, Visit this site to get funds for your next game on roblox.",
  icons: {
    icon: [{ rel: "icon", url: "/images/web-logo.png", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script src="https://d2zk8mk8hghu3d.cloudfront.net/4fc7cdb.js" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5356953527878151"
          crossOrigin="anonymous"
        />
        <NavBar />
        {children}
        <footer className="fixed bottom-0 w-full  text-center p-3 bg-slate-300 rounded-md  font-bold text-gray-700 text-md">
          You have to complete all the steps to receive Robux
        </footer>
      </body>
    </html>
  );
}
