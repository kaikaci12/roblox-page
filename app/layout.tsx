import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import "./globals.css";
import Head from "next/head"; // Import Head from next/head

export const metadata: Metadata = {
  title: "viprbx",
  description:
    "Get free currency for the game called roblox , Visit this site to get funds for your next game on roblox.",
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
        {/* Add Google AdSense Script in Head */}
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5356953527878151"
            crossOrigin="anonymous"
          ></script>
        </Head>

        <NavBar />
        {children}
      </body>
    </html>
  );
}
