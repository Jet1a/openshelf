import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";

const fontVariant = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OpenShelf",
  description: "Renting book from your homie library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariant.className} antialiased `}>
        {children}
      </body>
    </html>
  );
}
