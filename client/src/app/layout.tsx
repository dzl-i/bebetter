import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeBetter",
  description: "Be Better with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-8 bg-main text-black flex w-full justify-center min-h-screen">
          <div className="fixed z-10">
            <Navbar />
          </div>
          <div className="mt-24 z-0">{children}</div>
        </main>
      </body>
    </html>
  );
}
