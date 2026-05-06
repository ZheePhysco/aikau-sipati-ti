"use client";

import { useState, useEffect } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { useLanguage } from "@/components/providers/language-provider";
import { TattooVisual } from "@/components/ui/tattoo-visual";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        className={`fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-700 ${
          isScrolled
            ? "border-b border-accent/10 bg-background/88 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

          {/* Brand Mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center transition-opacity duration-500 hover:opacity-75"
            aria-label="Scroll to top"
          >
            <BrandMark size="sm" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="nav-underline text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side — language toggle + CTA */}
          <div className="hidden items-center gap-6 md:flex">

            {/* Language Toggle — pill with slow sweep */}
            <div
              className="flex items-center overflow-hidden border border-accent/25"
              style={{ height: 28 }}
            >
              {(["en", "id"] as const).map((lang, i) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`relative px-3 text-[10px] tracking-[0.18em] uppercase transition-all duration-500 ${
                    language === lang
                      ? "bg-accent text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ height: 28, lineHeight: "28px" }}
                >
                  {lang.toUpperCase()}
                  {i === 0 && (
                    <span
                      className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-accent/25"
                      aria-hidden
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Book Session CTA — slow gold sweep */}
            <button
              onClick={() => scrollToSection("#book")}
              className="btn-gold-sweep px-5 py-2 text-[11px] tracking-[0.2em] uppercase"
            >
              <span>{t.nav.bookSession}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-[5px] p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-6 bg-foreground transition-all duration-400 ${
                isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-all duration-400 ${
                isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "var(--background)" }}
      >
        {/* Mentawai motif watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <TattooVisual
            variant="titiDotwork"
            className="w-[70vw] max-w-xs text-accent"
            opacity={0.04}
          />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center gap-7">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-serif text-4xl italic text-foreground transition-colors hover:text-accent"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07 + 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07 + 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}

          {/* Divider ornament */}
          <div
            className="w-40 h-px bg-accent/20"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: "opacity 0.4s ease 0.45s",
            }}
          />

          {/* Language Toggle */}
          <div
            className="flex items-center border border-accent/30 overflow-hidden"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: "opacity 0.4s ease 0.5s",
            }}
          >
            {(["en", "id"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-5 py-2 text-sm tracking-[0.18em] uppercase transition-all duration-500 ${
                  language === lang
                    ? "bg-accent text-background"
                    : "text-muted-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Book Session CTA */}
          <button
            onClick={() => scrollToSection("#book")}
            className="btn-gold-sweep px-8 py-3 text-sm tracking-[0.2em] uppercase"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: "opacity 0.4s ease 0.55s",
            }}
          >
            <span>{t.nav.bookSession}</span>
          </button>
        </div>
      </div>
    </>
  );
}
