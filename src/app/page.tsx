// import Navbar from "@/components/Navbar";
// import AboutSection from "@/components/home/AboutSection";
// import Footer from "@/components/home/Footer";
// import HeroSection from "@/components/home/HeroSection";
// import NdisPlansSection from "@/components/home/NdisPlansSection";
// import ServicesSection from "@/components/home/ServicesSection";
// import TestimonialsSection from "@/components/home/TestimonialSection";
// import Why from "@/components/home/Why";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <HeroSection />
//         <ServicesSection />
//         <AboutSection />
//         <NdisPlansSection />
//         <Why />
//         <TestimonialsSection />
//         <Footer />
//       </main>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/ui/mobile-nav";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: Heart,
      title: "Personal Care Services",
      description:
        "Comprehensive personal care assistance including bathing, dressing, grooming, and medication management.",
      features: [
        "24/7 Care Available",
        "Qualified Caregivers",
        "Personalized Plans",
      ],
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Social activities, community engagement, and companionship services to enhance quality of life.",
      features: [
        "Group Activities",
        "Transport Services",
        "Social Connections",
      ],
    },
    {
      icon: Shield,
      title: "Respite Care",
      description:
        "Temporary care services providing relief for primary caregivers while ensuring continuous support.",
      features: ["Flexible Scheduling", "Professional Staff", "Peace of Mind"],
    },
  ];

  const testimonials = [
    {
      name: "Margaret Wilson",
      location: "Strathfield, Sydney",
      rating: 5,
      text: "Pathway Care Solutions has been a blessing for our family. Their caregivers are professional, compassionate, and truly care about our wellbeing.",
    },
    {
      name: "Robert Chen",
      location: "Hurstville, Sydney",
      rating: 5,
      text: "The level of care and attention to detail is exceptional. I feel confident knowing my mother is in such capable hands.",
    },
    {
      name: "Sarah Thompson",
      location: "Hornsby, NSW",
      rating: 5,
      text: "Outstanding service! The team goes above and beyond to ensure comfort and dignity in all their care services.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Prime Choice Care
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
            <MobileNav currentPath="/" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Trusted Care Provider Since 2010
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Compassionate Care,
                  <span className="text-blue-600">Professional Service</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Providing exceptional personal care, community support, and
                  respite services across Australia. Your wellbeing is our
                  priority, delivered with dignity and respect.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-md px-8 py-3"
                >
                  <Link href="/contact">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-md px-8 py-3 border-blue-200 hover:bg-blue-50"
                >
                  <Link href="/services">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">
                    +61 451103939
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">NDIS Registered</span>
                </div>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-teal-100">
                <img
                  src="https://images.pexels.com/photos/7551585/pexels-photo-7551585.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Professional caregiver assisting elderly client"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-teal-100 text-teal-800">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Comprehensive Care Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a full range of care services tailored to meet your
              unique needs and preferences
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto bg-gradient-to-br from-blue-500 to-teal-500 p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "2,500+", label: "Happy Clients" },
              { number: "150+", label: "Care Professionals" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-yellow-100 text-yellow-800">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Care Journey?
            </h2>
            <p className="text-xl text-blue-100">
              Contact us today for a free consultation and discover how we can
              support you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white hover:bg-white text-blue-600 text-lg px-8"
              >
                <Link href="tel:1300728422">Call 1300 PATH CARE</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">
                  Prime Choice Care
                </span>
              </div>
              <p className="text-gray-400">
                Providing compassionate care and professional support services
                across Australia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2 text-gray-400">
                <Link
                  href="/services"
                  className="block hover:text-white transition-colors"
                >
                  Personal Care
                </Link>
                <Link
                  href="/services"
                  className="block hover:text-white transition-colors"
                >
                  Community Support
                </Link>
                <Link
                  href="/services"
                  className="block hover:text-white transition-colors"
                >
                  Respite Care
                </Link>
                <Link
                  href="/services"
                  className="block hover:text-white transition-colors"
                >
                  NDIS Services
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <Link
                  href="/about"
                  className="block hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="block hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="block hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/services"
                  className="block hover:text-white transition-colors"
                >
                  Services
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+61 451103939</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@primechoicecare.com.au</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nationwide Coverage</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Primes Choice Care. All rights reserved. | ABN: 12
              345 678 901
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
