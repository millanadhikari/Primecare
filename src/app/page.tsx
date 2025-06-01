import Navbar from "@/components/Navbar";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import NdisPlansSection from "@/components/home/NdisPlansSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialSection";
import Why from "@/components/home/Why";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <NdisPlansSection />
        <Why />
        <TestimonialsSection />
        <Footer />
      </main>
    </div>
  );
}
