"use client";

import { BrandMark } from "@/components/ui/brand-mark";
import { useLanguage } from "@/components/providers/language-provider";

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#work", label: t.nav.work },
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
    <footer className="border-t border-accent/20 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <BrandMark size="md" />
          <p className="mt-6 font-serif text-lg italic text-muted-foreground">
            {t.footer.tagline}
          </p>
          <p className="mt-2 text-sm tracking-wide text-muted">
            {t.footer.location}
          </p>
        </div>

        {/* Links grid */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Navigation */}
          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t.footer.followUs}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
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
          <p className="text-xs text-muted">{t.footer.copyright}</p>
          <button
            onClick={scrollToTop}
            className="text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            {t.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
