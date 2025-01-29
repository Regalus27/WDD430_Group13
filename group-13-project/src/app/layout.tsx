import type { Metadata } from "next";
import { Onest, Indie_Flower } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/navbar";
import { Footer } from "./ui/footer";

const OnestSans = Onest({
  variable: "--font-Onest-sans",
  subsets: ["latin"],
});

const IndieFlower = Indie_Flower({
  subsets: ['latin'],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Handcraft Haven",
  description: "Group 13 Project for WDD430",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={OnestSans.className + " " + IndieFlower.className}>
        <div className="container mx-auto max-w-[1200px] px-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
