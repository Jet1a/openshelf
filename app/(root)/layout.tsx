import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/header/Navbar";
import RegisterModal from "../components/modal/RegisterModal";
import ToasterProvider from "../provider/ToasterProvider";
import LoginModal from "../components/modal/LoginModal";
import getCurrentUser from "../action/getCurrentUser";
import AddModal from "../components/modal/AddModal";
import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenShelf",
  description: "Renting book from your homie library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="flex flex-col min-h-screen">
          {/* Content Area */}
          <main className="flex-grow">
            <ClientOnly>
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              <AddModal />
              <Navbar currentUser={currentUser} />
            </ClientOnly>
            {children}
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
