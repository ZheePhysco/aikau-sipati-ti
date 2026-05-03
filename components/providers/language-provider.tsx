"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface Translations {
  nav: {
    work: string;
    gallery: string;
    process: string;
    artist: string;
    about: string;
    book: string;
    bookSession: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    subtext1: string;
    subtext2: string;
    cta1: string;
    cta2: string;
  };
  philosophy: {
    label: string;
    quote: string;
    text1: string;
    text2: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
  };
  gallery: {
    label: string;
    heading: string;
    viewStory: string;
    backToWork: string;
    nextProject: string;
    meaning: string;
    processLabel: string;
    duration: string;
    placement: string;
    storyBehind: string;
    bookSimilar: string;
  };
  process: {
    label: string;
    heading: string;
    description: string;
    cta: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  artist: {
    label: string;
    heading: string;
    quote: string;
    bio1: string;
    bio2: string;
    heritage: string;
    heritageValue: string;
    experience: string;
    experienceValue: string;
    technique: string;
    techniqueValue: string;
    speciality: string;
    specialityValue: string;
  };
  aftercare: {
    label: string;
    heading: string;
    description: string;
    item1: string;
    item1Content: string;
    item2: string;
    item2Content: string;
    item3: string;
    item3Content: string;
    item4: string;
    item4Content: string;
    item5: string;
    item5Content: string;
  };
  booking: {
    label: string;
    heading: string;
    description: string;
    whatsapp: string;
    instagram: string;
    email: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  footer: {
    tagline: string;
    location: string;
    navigation: string;
    contact: string;
    followUs: string;
    copyright: string;
    backToTop: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      work: "Project",
      gallery: "Gallery",
      process: "Process",
      artist: "Artist",
      about: "About",
      book: "Book",
      bookSession: "Book Session",
    },
    hero: {
      eyebrow: "Traditional Mentawai Hand Tapping · Padang, West Sumatra",
      line1: "A story",
      line2: "carved into",
      line3: "your skin.",
      subtext1: "Ancient symbols. Personal stories.",
      subtext2: "Marked by tradition, guided by respect.",
      cta1: "Explore the Process",
      cta2: "Book a Session",
    },
    philosophy: {
      label: "Our Philosophy",
      quote:
        "Every mark is a prayer. Every line, a memory passed from ancestors into skin.",
      text1:
        "In the Mentawai tradition, tattoos are not decoration—they are identity. Each symbol carries the weight of generations, marking rites of passage, spiritual protection, and connection to the natural world.",
      text2:
        "At Siolaakenen Muti'ti, we honor this sacred practice through the ancient art of hand-tapping, creating marks that speak to your personal journey while respecting the traditions from which they come.",
      stat1: "Centuries",
      stat1Label: "Of living titi tradition in the Mentawai Islands",
      stat2: "100%",
      stat2Label: "Hand Tapped — no machine, no shortcut",
      stat3: "Siberut",
      stat3Label: "UNESCO Biosphere Reserve & home of traditional titi",
    },
    gallery: {
      label: "The Work",
      heading: "Each mark, a unique story.",
      viewStory: "View Story +",
      backToWork: "← Back to Work",
      nextProject: "Next Project →",
      meaning: "Meaning",
      processLabel: "Process",
      duration: "Duration",
      placement: "Placement",
      storyBehind: "Story Behind This Piece",
      bookSimilar: "Book a Similar Session →",
    },
    process: {
      label: "The Process",
      heading: "Rooted in tradition.",
      description:
        "Our process honors the sacred rituals of Mentawai tattooing while adapting to modern safety standards. Each session is a journey.",
      cta: "Learn the Process",
      step1Title: "Consultation",
      step1Desc:
        "We begin with a deep conversation about your story, your lineage, and the meaning you want to carry.",
      step2Title: "Design & Ritual",
      step2Desc:
        "Symbols are drawn by hand using ancestral patterns. A small opening ritual honors the ancestors and guides the session.",
      step3Title: "Hand Tapping",
      step3Desc:
        "Using traditional tools and organic ink, the artist taps each mark with precision and calm. The rhythm is meditative. The result is permanent.",
      step4Title: "Aftercare & Meaning",
      step4Desc:
        "You leave with a healing guide and the full meaning of your motif documented—so you carry the story forward.",
    },
    artist: {
      label: "The Artist",
      heading: "The hand behind the marks.",
      quote:
        "Every tap is a conversation between the ancestors and the skin. I am just the hand.",
      bio1:
        "Aikau Sipati'ti is a traditional Mentawai tattoo artist who has dedicated his life to preserving and sharing the sacred art of his ancestors. Born into a lineage of Sikerei (shamans), he learned the ancient patterns and their meanings from elders in the Siberut jungle.",
      bio2:
        "After years of studying both traditional techniques and modern safety practices, Aikau Sipati'ti founded Siolaakenen Muti'ti to create a bridge between ancient wisdom and contemporary seekers. His work has been featured in cultural exhibitions across Indonesia and beyond.",
      heritage: "Heritage",
      heritageValue: "Mentawai Sikerei Lineage",
      experience: "Experience",
      experienceValue: "15+ Years Traditional Practice",
      technique: "Technique",
      techniqueValue: "Hand-Tapping (Titi)",
      speciality: "Speciality",
      specialityValue: "Protection & Spiritual Symbols",
    },
    aftercare: {
      label: "Aftercare",
      heading: "Your skin deserves the best care.",
      description:
        "Proper aftercare ensures your traditional tattoo heals beautifully and lasts a lifetime. Follow these guidelines carefully.",
      item1: "First 48 Hours",
      item1Content:
        "Keep the tattoo covered with the provided natural bandage. Avoid water contact and do not touch the area. Rest and stay hydrated.",
      item2: "Week 1–2: Healing Phase",
      item2Content:
        "Gently wash with lukewarm water and natural soap twice daily. Pat dry with a clean cloth. Apply the provided coconut oil blend sparingly. Do not scratch or pick at any scabbing.",
      item3: "Things to Avoid",
      item3Content:
        "No swimming, saunas, or prolonged sun exposure for 3 weeks. Avoid tight clothing over the tattoo. No alcohol-based products on the area.",
      item4: "Coconut Oil Care",
      item4Content:
        "Traditional Mentawai aftercare uses pure coconut oil. Apply a thin layer 2-3 times daily after the first 48 hours. This keeps the skin moisturized and supports natural healing.",
      item5: "Touch-ups & Long Term",
      item5Content:
        "Hand-tapped tattoos may need minor touch-ups after full healing (6-8 weeks). Keep the tattoo moisturized and protected from prolonged sun exposure for lasting vibrancy.",
    },
    booking: {
      label: "Begin Your Story",
      heading: "Ready to carry your mark?",
      description:
        "Every journey begins with a conversation. Reach out through your preferred channel and let us discuss your story.",
      whatsapp: "WhatsApp Us",
      instagram: "Instagram DM",
      email: "Send Email",
      badge1: "100% Hand Tapped",
      badge2: "Traditional Mentawai Methods",
      badge3: "Safe & Hygienic",
    },
    footer: {
      tagline: "Ancient marks. Living skin. Sacred forever.",
      location: "Traditional Mentawai Tattoo · Padang, West Sumatra",
      navigation: "Navigation",
      contact: "Contact",
      followUs: "Follow Us",
      copyright: "© 2024 Siolaakenen Muti'ti. All rights reserved.",
      backToTop: "Back to Top ↑",
    },
  },
  id: {
    nav: {
      work: "Project",
      gallery: "Galeri",
      process: "Proses",
      artist: "Seniman",
      about: "Tentang",
      book: "Pesan",
      bookSession: "Pesan Sesi",
    },
    hero: {
      eyebrow: "Tato Tradisional Mentawai Hand Tapping · Padang, Sumatera Barat",
      line1: "Sebuah cerita",
      line2: "terukir di",
      line3: "kulitmu.",
      subtext1: "Simbol kuno. Cerita pribadi.",
      subtext2: "Ditandai oleh tradisi, dipandu dengan hormat.",
      cta1: "Jelajahi Proses",
      cta2: "Pesan Sesi",
    },
    philosophy: {
      label: "Filosofi Kami",
      quote:
        "Setiap tanda adalah doa. Setiap garis, memori yang diturunkan dari leluhur ke kulit.",
      text1:
        "Dalam tradisi Mentawai, tato bukan dekorasi—mereka adalah identitas. Setiap simbol membawa bobot generasi, menandai ritual peralihan, perlindungan spiritual, dan koneksi dengan alam.",
      text2:
        "Di Siolaakenen Muti'ti, kami menghormati praktik sakral ini melalui seni kuno hand-tapping, menciptakan tanda yang berbicara tentang perjalanan pribadi Anda sambil menghormati tradisi asalnya.",
      stat1: "Berabad",
      stat1Label: "Tradisi titi yang masih hidup di Kepulauan Mentawai",
      stat2: "100%",
      stat2Label: "Hand Tapping — tanpa mesin, tanpa jalan pintas",
      stat3: "Siberut",
      stat3Label: "Cagar Biosfer UNESCO & rumah tradisi titi",
    },
    gallery: {
      label: "Karya",
      heading: "Setiap tanda, cerita yang unik.",
      viewStory: "Lihat Cerita +",
      backToWork: "← Kembali ke Karya",
      nextProject: "Proyek Selanjutnya →",
      meaning: "Makna",
      processLabel: "Proses",
      duration: "Durasi",
      placement: "Penempatan",
      storyBehind: "Cerita di Balik Karya Ini",
      bookSimilar: "Pesan Sesi Serupa →",
    },
    process: {
      label: "Proses",
      heading: "Berakar pada tradisi.",
      description:
        "Proses kami menghormati ritual sakral tato Mentawai sambil mengadaptasi standar keamanan modern. Setiap sesi adalah sebuah perjalanan.",
      cta: "Pelajari Proses",
      step1Title: "Konsultasi",
      step1Desc:
        "Kami memulai dengan percakapan mendalam tentang cerita Anda, garis keturunan, dan makna yang ingin Anda bawa.",
      step2Title: "Desain & Ritual",
      step2Desc:
        "Simbol digambar dengan tangan menggunakan pola leluhur. Ritual pembuka kecil menghormati leluhur dan membimbing sesi.",
      step3Title: "Hand Tapping",
      step3Desc:
        "Menggunakan alat tradisional dan tinta organik, seniman mengetuk setiap tanda dengan presisi dan ketenangan. Iramanya meditatif. Hasilnya permanen.",
      step4Title: "Perawatan & Makna",
      step4Desc:
        "Anda pergi dengan panduan penyembuhan dan makna lengkap motif Anda terdokumentasi—sehingga Anda membawa cerita ke depan.",
    },
    artist: {
      label: "Seniman",
      heading: "Tangan di balik tanda.",
      quote:
        "Setiap ketukan adalah percakapan antara leluhur dan kulit. Saya hanyalah tangannya.",
      bio1:
        "Aikau Sipati'ti adalah seniman tato tradisional Mentawai yang mendedikasikan hidupnya untuk melestarikan dan berbagi seni sakral leluhurnya. Lahir dalam garis keturunan Sikerei (dukun), ia belajar pola kuno dan maknanya dari tetua di hutan Siberut.",
      bio2:
        "Setelah bertahun-tahun mempelajari teknik tradisional dan praktik keamanan modern, Aikau Sipati'ti mendirikan Siolaakenen Muti'ti untuk menjembatani kebijaksanaan kuno dan pencari kontemporer. Karyanya telah ditampilkan di pameran budaya di seluruh Indonesia dan sekitarnya.",
      heritage: "Warisan",
      heritageValue: "Garis Keturunan Sikerei Mentawai",
      experience: "Pengalaman",
      experienceValue: "15+ Tahun Praktik Tradisional",
      technique: "Teknik",
      techniqueValue: "Hand-Tapping (Titi)",
      speciality: "Spesialisasi",
      specialityValue: "Simbol Perlindungan & Spiritual",
    },
    aftercare: {
      label: "Perawatan",
      heading: "Kulit Anda layak mendapat perawatan terbaik.",
      description:
        "Perawatan yang tepat memastikan tato tradisional Anda sembuh dengan indah dan tahan seumur hidup. Ikuti panduan ini dengan seksama.",
      item1: "48 Jam Pertama",
      item1Content:
        "Jaga tato tetap tertutup dengan perban alami yang disediakan. Hindari kontak air dan jangan sentuh area tersebut. Istirahat dan tetap terhidrasi.",
      item2: "Minggu 1–2: Fase Penyembuhan",
      item2Content:
        "Cuci lembut dengan air hangat dan sabun alami dua kali sehari. Keringkan dengan kain bersih. Oleskan campuran minyak kelapa yang disediakan secukupnya. Jangan garuk atau cabut kerak.",
      item3: "Hal yang Harus Dihindari",
      item3Content:
        "Tidak berenang, sauna, atau paparan sinar matahari berkepanjangan selama 3 minggu. Hindari pakaian ketat di atas tato. Tidak ada produk berbasis alkohol di area tersebut.",
      item4: "Perawatan Minyak Kelapa",
      item4Content:
        "Perawatan tradisional Mentawai menggunakan minyak kelapa murni. Oleskan lapisan tipis 2-3 kali sehari setelah 48 jam pertama. Ini menjaga kulit lembab dan mendukung penyembuhan alami.",
      item5: "Touch-up & Jangka Panjang",
      item5Content:
        "Tato hand-tapped mungkin memerlukan touch-up minor setelah sembuh penuh (6-8 minggu). Jaga tato tetap lembab dan terlindung dari paparan sinar matahari berkepanjangan untuk keawetan.",
    },
    booking: {
      label: "Mulai Ceritamu",
      heading: "Siap membawa tandamu?",
      description:
        "Setiap perjalanan dimulai dengan percakapan. Hubungi melalui channel pilihanmu dan mari diskusikan ceritamu.",
      whatsapp: "WhatsApp Kami",
      instagram: "DM Instagram",
      email: "Kirim Email",
      badge1: "100% Hand Tapped",
      badge2: "Metode Tradisional Mentawai",
      badge3: "Aman & Higienis",
    },
    footer: {
      tagline: "Tanda purba. Kulit yang hidup. Suci selamanya.",
      location: "Tato Tradisional Mentawai · Padang, Sumatera Barat",
      navigation: "Navigasi",
      contact: "Kontak",
      followUs: "Ikuti Kami",
      copyright: "© 2024 Siolaakenen Muti'ti. Hak cipta dilindungi.",
      backToTop: "Kembali ke Atas ↑",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
