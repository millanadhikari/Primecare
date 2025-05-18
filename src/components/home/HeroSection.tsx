import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80')] bg-cover bg-center opacity-10"></div>

      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Making a <span className="gradient-text">difference</span> in every
            life we touch
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Quality disability support services tailored to individual needs.
            We&apos;re committed to enhancing lives through personalized care and
            dedicated support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-blue-500 hover:bg-blue/90 text-white px-8 py-6 rounded-md"
            >
              <Link href="/contact" >Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue/10 px-8 py-6 rounded-md"
            >
              <Link href="/services" className="flex items-center">
                Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
