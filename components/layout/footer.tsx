"use client";

import { BrandMark } from "@/components/ui/brand-mark";
import { useLanguage } from "@/components/providers/language-provider";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { MentawaiPattern } from "@/components/ui/tattoo-visual";

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { href: "#project", label: t.nav.work },
    { href: "#process", label: t.nav.process },
    { href: "#artist", label: t.nav.artist },
    { href: "#book", label: t.nav.book },
  ];

  const contactLinks = [
    { label: "WhatsApp", href: "https://wa.me/6282170395790" },
    { label: "Instagram", href: "https://www.instagram.com/aikau_siberut_tattotradisional?igsh=emhpeHhxdXN2eXBw" },
    { label: "Email", href: "mailto:Tattoomentawaiaikau@gmail.com" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/aikau_siberut_tattotradisional?igsh=emhpeHhxdXN2eXBw" },
    { label: "YouTube", href: "https://youtube.com/@edosaleleubaja?si=0HCpFhoWtEzadBgw" },
    { label: "TikTok", href: "https://www.tiktok.com/@apa.kaet?_r=1&_t=ZS-9622e8MqKOo" },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--background)" }}>

      {/* Ceremonial top divider — replaces plain border-t */}
      <MentawaiDivider variant="border-top" className="opacity-60" />

      {/* Mentawai texture background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <MentawaiPattern className="absolute inset-0 w-full h-full text-accent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-16 md:py-20">

        {/* Top section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <BrandMark size="md" />

          {/* Ornament divider */}
          <MentawaiDivider variant="ornament" className="mt-8 mb-4 opacity-60" />

          <p className="font-serif text-lg italic text-muted-foreground max-w-xs leading-relaxed">
            {t.footer.tagline}
          </p>
          <p className="mt-3 text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--muted)" }}>
            {t.footer.location}
          </p>
        </div>

        {/* Links grid */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Navigation */}
          <div>
            <h4 className="mb-6 section-eyebrow border-b border-border pb-3">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="nav-underline text-sm font-light text-muted-foreground transition-colors duration-400 hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 section-eyebrow border-b border-border pb-3">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-underline text-sm font-light text-muted-foreground transition-colors duration-400 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-6 section-eyebrow border-b border-border pb-3">
              {t.footer.followUs}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-underline text-sm font-light text-muted-foreground transition-colors duration-400 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[11px] tracking-wide" style={{ color: "var(--muted)" }}>
            {t.footer.copyright}
          </p>
          <button
            onClick={scrollToTop}
            className="btn-gold-sweep px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase"
          >
            <span>{t.footer.backToTop}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
