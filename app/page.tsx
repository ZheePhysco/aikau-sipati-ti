import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Projects } from "@/components/sections/projects";
import { Gallery } from "@/components/sections/gallery";
import { Process } from "@/components/sections/process";
import { Artist } from "@/components/sections/artist";
import { Aftercare } from "@/components/sections/aftercare";
import { Booking } from "@/components/sections/booking";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Philosophy />
      <Projects />
      <Gallery />
      <Process />
      <Artist />
      <Aftercare />
      <Booking />
      <Footer />
    </main>
  );
}
