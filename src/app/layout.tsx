import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Kalam, Space_Grotesk } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://satyampatil.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Satyam Patil | AI & Systems Engineer",
  description:
    "Satyam Patil, Research Engineer at Samsung Research. IIT Mandi CS. I build multi-agent AI systems and secure Android internals. NASA CANSAT & ISRO finalist.",
  keywords: [
    "Satyam Patil",
    "AI Engineer",
    "Research Engineer",
    "Samsung Research",
    "IIT Mandi",
    "Multi-agent systems",
    "LangGraph",
    "Android Security",
    "SELinux",
  ],
  authors: [{ name: "Satyam Patil" }],
  openGraph: {
    title: "Satyam Patil | AI & Systems Engineer",
    description:
      "Research Engineer at Samsung Research. I build multi-agent AI systems and secure Android internals.",
    url: siteUrl,
    siteName: "Satyam Patil",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Patil | AI & Systems Engineer",
    description:
      "Research Engineer at Samsung Research. I build multi-agent AI systems and secure Android internals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
