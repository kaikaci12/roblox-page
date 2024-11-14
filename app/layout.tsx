// RootLayout.tsx
import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import "./globals.css";
import Head from "next/head";
import AdSense from "./components/AdSense";

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
        <Head>
          <AdSense pId="5356953527878151" />
          <meta
            name="google-adsense-account"
            content="ca-pub-5356953527878151"
          />
        </Head>

        <NavBar />
        {children}
      </body>
    </html>
  );
}
