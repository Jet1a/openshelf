import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import Navbar from "../components/header/Navbar";
import RegisterModal from "../components/modal/RegisterModal";
import ToasterProvider from "../provider/ToasterProvider";
import LoginModal from "../components/modal/LoginModal";
import getCurrentUser from "../action/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import ConditionalAddModal from "../components/modal/ConditionalAddModal";

const fontVariant = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body className={`${fontVariant.className} antialiased `}>
        <div className="flex flex-col min-h-screen">
          {/* Content Area */}
          <main className="flex-grow">
            <ClientOnly>
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              <ConditionalAddModal />
              <Navbar currentUser={currentUser} />
            </ClientOnly>
            {children}
          </main>
            <Footer />
        </div>
      </body>
    </html>
  );
}
