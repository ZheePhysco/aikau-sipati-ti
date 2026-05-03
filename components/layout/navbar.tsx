"use client";

import { useState, useEffect } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { useLanguage } from "@/components/providers/language-provider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#project", label: t.nav.work },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#process", label: t.nav.process },
    { href: "#artist", label: t.nav.artist },
    { href: "#about", label: t.nav.about },
    { href: "#book", label: t.nav.book },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-300 ${
          isScrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Brand Mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-opacity hover:opacity-80"
          >
            <BrandMark size="sm" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="animated-underline text-sm font-light tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Language Toggle */}
            <div className="flex items-center border border-accent/30">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs tracking-wide transition-colors ${
                  language === "en"
                    ? "bg-accent text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("id")}
                className={`px-3 py-1 text-xs tracking-wide transition-colors ${
                  language === "id"
                    ? "bg-accent text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ID
              </button>
            </div>

            {/* Book Session CTA */}
            <button
              onClick={() => scrollToSection("#book")}
              className="border border-accent px-4 py-2 text-sm font-light tracking-wide text-accent transition-colors hover:bg-accent hover:text-background"
            >
              {t.nav.bookSession}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-6 bg-foreground transition-all ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-opacity ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-all ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-serif text-4xl italic text-foreground transition-colors hover:text-accent"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.4s ease ${index * 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}

          {/* Language Toggle */}
          <div
            className="mt-8 flex items-center border border-accent/30"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: "opacity 0.4s ease 0.5s",
            }}
          >
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 text-sm tracking-wide transition-colors ${
                language === "en"
                  ? "bg-accent text-background"
                  : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("id")}
              className={`px-4 py-2 text-sm tracking-wide transition-colors ${
                language === "id"
                  ? "bg-accent text-background"
                  : "text-muted-foreground"
              }`}
            >
              ID
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
