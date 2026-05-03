"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { GALLERY_DATA } from "@/lib/gallery-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export function Projects() {
  const { language, t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_DATA[0] | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll animations
    const cards = gsap.utils.toArray('.project-card');
    
    if (cards.length > 0) {
        gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            }
        }
        );
    }

    // Section heading reveal
    gsap.fromTo('.project-heading',
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });


  // Handle modal animation
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current.querySelector('.modal-backdrop'), 
        { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(modalRef.current.querySelector('.modal-container'),
        { scale: 0.96, y: 20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "expo.out" }, "-=0.2")
      .fromTo(modalRef.current.querySelector('.modal-left'),
        { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(modalRef.current.querySelector('.modal-right'),
        { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.5")
      .fromTo(modalRef.current.querySelectorAll('.info-line'),
        { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, "-=0.4");
        
      setMainImage(selectedItem.image);
    }
  }, [selectedItem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedItem]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        navigateProject("next");
      } else if (e.key === "ArrowLeft") {
        navigateProject("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const navigateProject = (direction: "next" | "prev") => {
    if (!selectedItem) return;
    const currentIndex = GALLERY_DATA.findIndex((item) => item.id === selectedItem.id);
    let newIndex = direction === "next" ? (currentIndex + 1) % GALLERY_DATA.length : (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    
    // Animate transition
    if (modalRef.current) {
      gsap.to(modalRef.current.querySelectorAll('.modal-content-area'), {
        x: direction === "next" ? -30 : 30,
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          setSelectedItem(GALLERY_DATA[newIndex]);
          gsap.fromTo(modalRef.current!.querySelectorAll('.modal-content-area'),
            { x: direction === "next" ? 30 : -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, delay: 0.1 }
          );
        }
      });
    } else {
      setSelectedItem(GALLERY_DATA[newIndex]);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      const tl = gsap.timeline({ onComplete: () => setSelectedItem(null) });
      tl.to(modalRef.current.querySelectorAll('.info-line, .modal-left, .modal-right'), { opacity: 0, duration: 0.2 })
        .to(modalRef.current.querySelector('.modal-container'), { scale: 0.96, opacity: 0, duration: 0.3 }, "-=0.1")
        .to(modalRef.current.querySelector('.modal-backdrop'), { opacity: 0, duration: 0.3 }, "-=0.2");
    } else {
      setSelectedItem(null);
    }
  };

  const handleCardHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    const card = e.currentTarget;
    const img = card.querySelector('.card-image');
    if (enter) {
      gsap.to(card, { scale: 1.04, duration: 0.5, ease: "power2.out" });
      gsap.to(img, { scale: 1.08, duration: 1, ease: "power2.out" });
    } else {
      gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" });
    }
  };

  return (
    <>
      <section ref={sectionRef} id="project" className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {t?.nav?.work || "Selected Works"}
              </p>
              <h2 className="project-heading font-serif text-4xl italic text-foreground md:text-5xl" style={{ clipPath: 'inset(100% 0 0 0)' }}>
                {language === "en" ? "Our Masterpieces" : "Karya Terbaik Kami"}
              </h2>
            </div>
          </div>

          {/* Masonry Grid */}
          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
                className="project-card group relative block w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/50 p-2 text-left transition-colors hover:bg-surface"
                style={{ breakInside: 'avoid' }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <div className="card-image relative w-full h-full">
                    <SmartImage
                      src={item.image}
                      alt={language === "en" ? item.title : item.titleId}
                      fill
                      fallbackPattern={item.fallbackPattern}
                    />
                    <div className="absolute inset-0 bg-background/50 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6">
                    <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-accent">
                        {language === "en" ? item.category : item.categoryId}
                      </p>
                      <h3 className="font-serif text-2xl italic text-foreground">
                        {language === "en" ? item.title : item.titleId}
                      </h3>
                    </div>
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-accent flex items-center justify-center text-accent opacity-0 transition-all duration-500 group-hover:opacity-100 rotate-90 group-hover:rotate-0">
                      +
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
             <button onClick={() => {
                const element = document.querySelector('#book');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
             }} className="rounded-full border border-accent px-8 py-3 text-sm tracking-wide text-accent transition-colors hover:bg-accent hover:text-background">
                Consult With Us
             </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="modal-backdrop absolute inset-0 bg-background/95 backdrop-blur-md" onClick={closeModal} />
          
          <div className="modal-container relative w-full h-full flex flex-col md:flex-row overflow-hidden max-w-[1920px] mx-auto bg-background border border-border/20 md:m-4 md:h-[calc(100vh-2rem)] md:rounded-lg">
            
            <button onClick={closeModal} className="absolute top-6 right-6 z-50 flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm font-medium tracking-widest uppercase text-foreground/70 backdrop-blur border border-border/20 transition-colors hover:text-accent hover:border-accent/50">
              <span className="text-xl leading-none">✕</span> Kembali
            </button>
            
            <div className="absolute top-1/2 left-4 md:left-8 z-50 -translate-y-1/2 hidden md:block">
               <button onClick={(e) => { e.stopPropagation(); navigateProject("prev"); }} className="w-12 h-12 flex items-center justify-center rounded-full border border-border/50 text-foreground/50 hover:text-foreground hover:border-foreground transition-all">←</button>
            </div>
            <div className="absolute top-1/2 right-4 md:right-8 z-50 -translate-y-1/2 hidden md:block">
               <button onClick={(e) => { e.stopPropagation(); navigateProject("next"); }} className="w-12 h-12 flex items-center justify-center rounded-full border border-border/50 text-foreground/50 hover:text-foreground hover:border-foreground transition-all">→</button>
            </div>

            {/* Left 60% */}
            <div className="modal-left w-full md:w-[60%] h-[50vh] md:h-full relative modal-content-area group">
               <div className="absolute inset-0 p-4 md:p-12 pb-0 md:pb-32">
                 <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full relative" onMouseMove={(e) => {
                       const bounds = e.currentTarget.getBoundingClientRect();
                       const x = (e.clientX - bounds.left) / bounds.width - 0.5;
                       const y = (e.clientY - bounds.top) / bounds.height - 0.5;
                       gsap.to(e.currentTarget.firstChild, {
                          x: x * 30, y: y * 30, scale: 1.05, duration: 1, ease: "power2.out"
                       });
                    }} onMouseLeave={(e) => {
                       gsap.to(e.currentTarget.firstChild, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.out" });
                    }}>
                       <div className="w-full h-full relative">
                         <SmartImage
                           src={mainImage}
                           alt="Main Project Image"
                           fill
                           fallbackPattern={selectedItem.fallbackPattern}
                         />
                       </div>
                    </div>
                 </div>
               </div>
               
               {/* Thumbnails */}
               {selectedItem.detailImages && selectedItem.detailImages.length > 0 && (
                 <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-12 z-20 overflow-x-auto">
                    <button onClick={() => setMainImage(selectedItem.image)} className={`relative w-20 h-20 shrink-0 border-2 ${mainImage === selectedItem.image ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}>
                      <SmartImage src={selectedItem.image} alt="Thumb" fill fallbackPattern={selectedItem.fallbackPattern} />
                    </button>
                    {selectedItem.detailImages.map((img, i) => (
                      <button key={i} onClick={() => setMainImage(img)} className={`relative w-20 h-20 shrink-0 border-2 ${mainImage === img ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}>
                        <SmartImage src={img} alt={`Thumb ${i+1}`} fill fallbackPattern={selectedItem.fallbackPattern} />
                      </button>
                    ))}
                 </div>
               )}
            </div>

            {/* Right 40% */}
            <div className="modal-right w-full md:w-[40%] h-[50vh] md:h-full bg-surface/50 p-8 md:p-16 overflow-y-auto modal-content-area flex flex-col justify-center border-l border-border/20">
               <div className="max-w-md mx-auto w-full">
                  <p className="info-line mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {language === "en" ? selectedItem.category : selectedItem.categoryId}
                  </p>
                  <h2 className="info-line mb-10 font-serif text-4xl md:text-5xl italic text-foreground">
                    {language === "en" ? selectedItem.title : selectedItem.titleId}
                  </h2>
                  
                  <div className="info-line mb-10 border-y border-border/30 py-6 space-y-4">
                     <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-sm text-muted-foreground">Meaning</span>
                        <span className="text-sm text-foreground">{language === "en" ? selectedItem.meaning : selectedItem.meaningId}</span>
                     </div>
                     <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-sm text-muted-foreground">Process</span>
                        <span className="text-sm text-foreground">Traditional Hand Tapping</span>
                     </div>
                     <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="text-sm text-foreground">{selectedItem.duration}</span>
                     </div>
                     <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-sm text-muted-foreground">Placement</span>
                        <span className="text-sm text-foreground">{language === "en" ? selectedItem.placement : selectedItem.placementId}</span>
                     </div>
                  </div>
                  
                  <div className="info-line mb-12">
                     <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                        Story Behind This Piece
                     </p>
                     <p className="font-serif text-lg italic leading-relaxed text-foreground/90">
                        "{language === "en" ? selectedItem.story : selectedItem.storyId}"
                     </p>
                  </div>
                  
                  <button className="info-line group flex items-center gap-4 border-b border-accent pb-2 text-sm uppercase tracking-widest text-accent transition-all hover:pr-4">
                     Book a Similar Session <span className="transition-transform group-hover:translate-x-2">→</span>
                  </button>
               </div>
            </div>
            
            <div className="flex justify-between p-4 md:hidden absolute top-0 left-0 right-0 z-50">
               <button onClick={(e) => { e.stopPropagation(); navigateProject("prev"); }} className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur border border-border/50 text-foreground">←</button>
               <button onClick={(e) => { e.stopPropagation(); navigateProject("next"); }} className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur border border-border/50 text-foreground">→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
