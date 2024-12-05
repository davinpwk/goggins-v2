import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sansitaSwashed = localFont({
  src: "./fonts/SansitaSwashed.ttf",
  variable: "--font-sansita-swashed",
  weight: "600 700",
});
const robotoMono = localFont({
  src: "./fonts/RobotoMono.ttf",
  variable: "--font-roboto-mono",
  weight: "400 500",
});

export const metadata: Metadata = {
  title: "Davin Goggins v2",
  description: "motivation generator built on next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansitaSwashed.variable} ${robotoMono.className} bg-gradient flex min-h-screen flex-col items-center justify-center antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
