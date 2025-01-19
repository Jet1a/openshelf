import getCurrentUser from "@/app/action/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/header/Navbar";
import ConditionalAddModal from "@/app/components/modal/ConditionalAddModal";
import LoginModal from "@/app/components/modal/LoginModal";
import RegisterModal from "@/app/components/modal/RegisterModal";
import ToasterProvider from "@/app/provider/ToasterProvider";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentUser = await getCurrentUser();

  return (
    <section>
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
    </section>
  );
};

export default layout;
