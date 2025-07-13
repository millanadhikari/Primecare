// import React from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/home/Footer";
// import { Button } from "@/components/ui/button";
// import { Heart, Users, Home, } from "lucide-react";
// import WhyChooseSection from "@/components/home/WhyChooseSection";
// import Link from "next/link";

// const Services = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
//           <div className="container-custom">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
//               <p className="text-xl text-gray-700">
//                 We provide comprehensive disability support services tailored to individual needs and goals,
//                 empowering participants to live their best lives.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Section - NEW */}
//         <WhyChooseSection />

//         {/* Services Detail Section */}
//         <section className="section-padding">
//           <div className="container-custom">
//             <div className="space-y-24">
//               {/* Personal Care */}
//               <div id="personal-care" className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-center">
//                 <div>
//                   <div className="mb-4 inline-block p-3 bg-blue-50 rounded-full">
//                     <Heart className="h-8 w-8 text-blue-500" />
//                   </div>
//                   <h2 className="text-3xl font-bold mb-4">Personal Care</h2>
//                   <p className="text-gray-700 text-lg mb-4">
//                     Our personal care services provide assistance with daily activities while respecting privacy
//                     and dignity. We support participants with:
//                   </p>
//                   <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
//                     <li>Personal hygiene and grooming</li>
//                     <li>Dressing and undressing</li>
//                     <li>Eating and drinking assistance</li>
//                     <li>Mobility support and transfers</li>
//                     <li>Medication management</li>
//                     <li>Personal care during travel or appointments</li>
//                   </ul>
//                   <Button asChild className="bg-blue-600 hover:bg-blue-500">
//                     <Link href="/contact">Enquire About Personal Care</Link>
//                   </Button>
//                 </div>
//                 <div className="bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//                     alt="Caregiver providing personal assistance"
//                     className="w-full h-auto object-cover aspect-[4/3]"
//                   />
//                 </div>
//               </div>

//               {/* Community Participation */}
//               <div id="community-participation" className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-center">
//                 <div className="order-1 md:order-2">
//                   <div className="mb-4 inline-block p-3 bg-blue-50 rounded-full">
//                     <Users className="h-8 w-8 text-blue-500" />
//                   </div>
//                   <h2 className="text-3xl font-bold mb-4">Community Participation</h2>
//                   <p className="text-gray-700 text-lg mb-4">
//                     We help participants engage meaningfully with their communities, develop social connections,
//                     and access community resources through:
//                   </p>
//                   <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
//                     <li>Assistance with social and community participation</li>
//                     <li>Support for recreational activities and hobbies</li>
//                     <li>Transportation to community events and venues</li>
//                     <li>Development of social skills and confidence</li>
//                     <li>Access to community resources and facilities</li>
//                     <li>Support for educational and vocational activities</li>
//                   </ul>
//                   <Button asChild className="bg-blue-600 hover:bg-blue-500">
//                     <Link href="/contact">Enquire About Community Participation</Link>
//                   </Button>
//                 </div>
//                 <div className="order-2 md:order-1 bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//                     alt="People engaging in community activities"
//                     className="w-full h-auto object-cover aspect-[4/3]"
//                   />
//                 </div>
//               </div>

//               {/* Daily Tasks & Shared Living */}
//               <div id="daily-tasks" className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-center">
//                 <div>
//                   <div className="mb-4 inline-block p-3 bg-blue-50 rounded-full">
//                     <Home className="h-8 w-8 text-blue-500" />
//                   </div>
//                   <h2 className="text-3xl font-bold mb-4">Daily Tasks & Shared Living</h2>
//                   <p className="text-gray-700 text-lg mb-4">
//                     We provide support to help participants maintain a safe and comfortable home environment
//                     and develop independent living skills:
//                   </p>
//                   <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
//                     <li>Household cleaning and maintenance</li>
//                     <li>Meal planning and preparation</li>
//                     <li>Grocery shopping and errands</li>
//                     <li>Laundry and clothing care</li>
//                     <li>Bill payment and financial management assistance</li>
//                     <li>Safety and emergency planning</li>
//                   </ul>
//                   <Button asChild className="bg-blue-600 hover:bg-blue-500">
//                     <Link href="/contact">Enquire About Daily Tasks Support</Link>
//                   </Button>
//                 </div>
//                 <div className="bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//                     alt="Person cooking in a kitchen"
//                     className="w-full h-auto object-cover aspect-[4/3]"
//                   />
//                 </div>
//               </div>

//               {/* Only showing 3 services for brevity, but you would continue with the other services */}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="bg-blue-600 text-white py-16">
//           <div className="container-custom text-center">
//             <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
//             <p className="text-md text-blue-100 mb-8 max-w-2xl mx-auto">
//               Our team is ready to answer your questions about our services and how we can support you or your loved one.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
//                 <Link href="/contact">Contact Us</Link>
//               </Button>
//               <Button asChild variant="outline" className="border-white text-white bg-blue-600">
//                 <a href="tel:+61 451103939">Call +61 451103939</a>
//               </Button>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Services;

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
  Clock,
  Home,
  Car,
  Activity,
  Stethoscope,
  Phone,
  CheckCircle,
  ArrowRight,
  Calendar,
  BookOpen,
  Building,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/ui/mobile-nav";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mainServices = [
    {
      icon: Heart,
      title: "Personal Care Services",
      description:
        "Comprehensive assistance with daily living activities, medication management, and personal hygiene support.",
      image:
        "https://images.pexels.com/photos/7551585/pexels-photo-7551585.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Assistance with bathing and personal hygiene",
        "Dressing and grooming support",
        "Medication reminders and management",
        "Mobility and transfer assistance",
        "Continence management",
        "Meal preparation and feeding assistance",
      ],
      pricing: "From $45/hour",
    },
    {
      icon: Users,
      title: "Community Support Services",
      description:
        "Social engagement, community participation, and support to maintain independence and quality of life.",
      image:
        "https://images.pexels.com/photos/7551656/pexels-photo-7551656.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Social and recreational activities",
        "Community access and participation",
        "Shopping and errands assistance",
        "Companionship and emotional support",
        "Life skills development",
        "Group activities and outings",
      ],
      pricing: "From $42/hour",
    },
    {
      icon: Shield,
      title: "Respite Care Services",
      description:
        "Temporary care services providing relief for primary caregivers while maintaining high-quality support.",
      image:
        "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Planned and emergency respite",
        "In-home respite care",
        "Day respite programs",
        "Overnight and weekend support",
        "Specialized dementia care",
        "Holiday and vacation coverage",
      ],
      pricing: "From $48/hour",
    },
  ];

  const additionalServices = [
    {
      icon: Home,
      title: "Domestic Assistance",
      description: "Help with household tasks, cleaning, and home maintenance",
      features: [
        "Light housekeeping",
        "Laundry services",
        "Garden maintenance",
        "Home organization",
      ],
    },
    {
      icon: Car,
      title: "Transport Services",
      description:
        "Safe and reliable transportation to appointments and activities",
      features: [
        "Medical appointments",
        "Shopping trips",
        "Social outings",
        "Community events",
      ],
    },
    {
      icon: Activity,
      title: "Allied Health Support",
      description:
        "Coordination with healthcare professionals and therapy services",
      features: [
        "Physiotherapy support",
        "Occupational therapy",
        "Speech therapy",
        "Dietitian services",
      ],
    },
    {
      icon: Stethoscope,
      title: "Nursing Services",
      description: "Professional nursing care and clinical support services",
      features: [
        "Medication administration",
        "Wound care",
        "Health monitoring",
        "Clinical assessments",
      ],
    },
    {
      icon: Calendar,
      title: "Daily Tasks & Shared Living",
      description:
        "Support with daily routines and shared accommodation services",
      features: [
        "Daily routine assistance",
        "Shared living support",
        "Household task coordination",
        "Community integration",
      ],
    },
    {
      icon: Building,
      title: "Supported Independent Living",
      description:
        "Comprehensive support to help you live independently in your own home",
      features: [
        "24/7 on-call support",
        "Independent living skills",
        "Home modification advice",
        "Crisis intervention",
      ],
    },
    {
      icon: BookOpen,
      title: "Capacity Building",
      description:
        "Skill development and training to enhance independence and capabilities",
      features: [
        "Life skills training",
        "Employment support",
        "Education assistance",
        "Personal development",
      ],
    },
    {
      icon: Clock,
      title: "Flexible Support",
      description: "Adaptable care services that adjust to your changing needs",
      features: [
        "Flexible scheduling",
        "Emergency support",
        "Respite coordination",
        "Care plan adjustments",
      ],
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
                PrimeChoice Care
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
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
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
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
            <MobileNav currentPath="/services" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-blue-100 text-blue-800">Our Services</Badge>
            <h1
              className={`text-4xl md:text-6xl font-bold text-gray-900 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Comprehensive{" "}
              <span className="text-blue-600">Care Solutions</span>
            </h1>
            <p
              className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              We provide a complete range of care services designed to support
              independence, dignity, and quality of life. Our NDIS-registered
              services are delivered by qualified professionals who genuinely
              care about your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-3 rounded-xl">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {service.pricing}
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href="/contact">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-teal-100 text-teal-800">
              Additional Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Supporting Your Complete Wellbeing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond our core services, we offer specialized support to meet all
              aspects of your care needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
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
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
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

      {/* Service Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800">Our Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How We Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make it easy to begin your care journey with our simple,
              personalized approach
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description:
                  "Free assessment to understand your needs and preferences",
                icon: Phone,
              },
              {
                step: "02",
                title: "Care Planning",
                description:
                  "Develop a personalized care plan tailored to your requirements",
                icon: Users,
              },
              {
                step: "03",
                title: "Service Matching",
                description:
                  "Match you with qualified caregivers who fit your preferences",
                icon: Heart,
              },
              {
                step: "04",
                title: "Care Delivery",
                description:
                  "Begin receiving professional, compassionate care services",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-2xl w-fit mx-auto">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white border-4 border-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NDIS Information */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 text-white">
            <Badge className="bg-white/20 text-white border-white/30">
              NDIS Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              NDIS Registered Provider
            </h2>
            <p className="text-md text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We are a fully registered NDIS provider, offering comprehensive
              support coordination and care services. Our team works with you to
              maximize your NDIS funding and achieve your goals through
              personalized care plans.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Self-Managed",
                  desc: "We work directly with you to manage your services",
                },
                {
                  title: "Plan-Managed",
                  desc: "We coordinate with your plan manager for seamless service delivery",
                },
                {
                  title: "NDIA-Managed",
                  desc: "We handle all NDIA requirements and compliance for you",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-blue-100">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-md px-8"
              >
                <Link href="/contact">Discuss Your NDIS Plan</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600 text-md px-8"
              >
                <Link href="tel:1300728422">Call +61 451103939</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600">
              Contact us today for a free consultation and discover how our
              services can support you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
              >
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 border-blue-200 hover:bg-blue-50"
              >
                <Link href="tel:1300728422">Call Now</Link>
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
                <span className="text-xl font-bold">Prime Choice Care</span>
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
                  <Phone className="h-4 w-4" />
                  <span>info@primechoicecare.com.au</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Nationwide Coverage</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Prime Choice Care. All rights reserved. | ABN: 12 345
              678 901
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
