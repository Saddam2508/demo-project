"use client";

import { useState, useEffect, ReactNode } from "react";
import { Header } from "@/views/public/header";
import { Footer } from "@/views/public/footer";
import { BottomNav } from "@/views/public/bottomNav";
import { ArrowUp } from "lucide-react"; // scroll up icon

const HEADER_HEIGHT = 58;
const BOTTOM_NAV_HEIGHT = 56;

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
        style={{ height: HEADER_HEIGHT }}
      >
        <Header />
      </header>

      {/* sidebar */}
      <aside className="w-64 bg-amber-200 h-screen fixed top-0 left-0">
        Sidebar
      </aside>
      {/* right sidebar */}
      <aside className="w-64 bg-amber-200 h-screen fixed top-0 right-0">
        Sidebar
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 w-full overflow-x-hidden"
        style={{
          paddingRight: 270,
          paddingLeft: 270,
          paddingTop: HEADER_HEIGHT,
          paddingBottom: !isDesktop ? BOTTOM_NAV_HEIGHT + 16 : 24,
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-gray-50 border-t"
        style={{
          paddingBottom: !isDesktop ? BOTTOM_NAV_HEIGHT + 12 : 12,
        }}
      >
        <Footer />
      </footer>

      {/* Bottom Navigation (mobile only) */}
      {!isDesktop && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{ height: BOTTOM_NAV_HEIGHT }}
        ></div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
