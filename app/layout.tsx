import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `IPL ${new Date().getFullYear()} Playoff Qualification Scenarios`,
  description: `Find out how your favourite team can qualify for the IPL ${new Date().getFullYear()} playoffs`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="ipl-qualification-chances.manojvivek.dev"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
