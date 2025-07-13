// import React from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/home/Footer";
// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";
// import Link from "next/link";

// const About = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
//           <div className="container-custom">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
//               <p className="text-xl text-gray-700">
//                 PrimeCare is a leading provider of disability support services,
//                 committed to enhancing the quality of life for our participants.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Our Story */}
//         <section className="section-padding">
//           <div className="container-custom">
//             <div className="grid md:grid-cols-2 gap-10 items-center">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6">Our Story</h2>
//                 <p className="text-gray-700 text-lg mb-4">
//                   PrimeCare was founded in 2010 by a team of experienced disability support professionals who
//                   recognized the need for more personalized, high-quality care services.
//                 </p>
//                 <p className="text-gray-700 text-lg mb-4">
//                   Our journey began with a simple mission: to provide support that truly empowers individuals
//                   with disabilities to live fulfilling lives on their own terms.
//                 </p>
//                 <p className="text-gray-700 text-lg">
//                   Over the years, we&asos;ve grown from a small team supporting a handful of participants to a
//                   trusted provider across multiple locations, but our commitment to personalized care and
//                   genuine relationships remains at the heart of everything we do.
//                 </p>
//               </div>
//               <div className="bg-gray-100 rounded-lg overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
//                   alt="Team meeting"
//                   className="w-full h-auto object-cover aspect-[4/3]"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Mission & Vision */}
//         <section className="section-padding bg-gray-50">
//           <div className="container-custom">
//             <div className="grid md:grid-cols-2 gap-16">
//               <div className="text-center">
//                 <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-care-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
//                 <p className="text-gray-700 text-lg">
//                   To provide exceptional disability support services that enhance independence,
//                   promote dignity, and empower individuals to achieve their goals and participate
//                   fully in their communities.
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-care-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
//                 <p className="text-gray-700 text-lg">
//                   To be the most trusted disability support provider, recognized for our person-centered
//                   approach, exceptional quality of care, and positive impact on the lives of the people
//                   we support and their families.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Our Approach */}
//         <section className="section-padding">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
//               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                 At PrimeCare, we believe in a holistic, person-centered approach that respects individual choices and promotes independence.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
//                 <div className="flex items-start mb-4">
//                   <div className="bg-blue-50 p-2 rounded-full mr-4">
//                     <Check className="h-5 w-5 text-care-blue" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Person-Centered Planning</h3>
//                 </div>
//                 <p className="text-gray-700">
//                   We take the time to understand each person&asos;s unique needs, preferences, and goals,
//                   ensuring our support is tailored specifically to them.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
//                 <div className="flex items-start mb-4">
//                   <div className="bg-blue-50 p-2 rounded-full mr-4">
//                     <Check className="h-5 w-5 text-care-blue" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Skilled Support Team</h3>
//                 </div>
//                 <p className="text-gray-700">
//                   Our team consists of trained professionals who receive ongoing education and
//                   development to ensure they provide the highest quality support.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
//                 <div className="flex items-start mb-4">
//                   <div className="bg-blue-50 p-2 rounded-full mr-4">
//                     <Check className="h-5 w-5 text-care-blue" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Continuous Improvement</h3>
//                 </div>
//                 <p className="text-gray-700">
//                   We regularly seek feedback and evaluate our services to ensure we&asos;re
//                   consistently meeting and exceeding expectations.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
//                 <div className="flex items-start mb-4">
//                   <div className="bg-blue-50 p-2 rounded-full mr-4">
//                     <Check className="h-5 w-5 text-care-blue" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Family Involvement</h3>
//                 </div>
//                 <p className="text-gray-700">
//                   We recognize the importance of family and work collaboratively with loved ones
//                   to ensure coordinated and comprehensive support.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
//                 <div className="flex items-start mb-4">
//                   <div className="bg-blue-50 p-2 rounded-full mr-4">
//                     <Check className="h-5 w-5 text-care-blue" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Community Connection</h3>
//                 </div>
//                 <p className="text-gray-700">
//                   We help participants build meaningful connections within their communities,
//                   promoting inclusion and a sense of belonging.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
//                 <div className="flex items-start mb-4">
//                   <div className="bg-blue-50 p-2 rounded-full mr-4">
//                     <Check className="h-5 w-5 text-care-blue" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Transparency & Accountability</h3>
//                 </div>
//                 <p className="text-gray-700">
//                   We operate with integrity and openness, ensuring clear communication and
//                   responsible management of resources.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="bg-blue-600 text-white py-16">
//           <div className="container-custom text-center">
//             <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               We&asos;re always looking for passionate individuals to join our team and make a difference in the lives of others.
//             </p>
//             <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
//               <Link href="/contact">View Career Opportunities</Link>
//             </Button>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default About;

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
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/ui/mobile-nav";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every interaction with empathy, understanding, and genuine care for our clients' wellbeing.",
    },
    {
      icon: Users,
      title: "Respect",
      description:
        "We honor each person's dignity, choices, and individual needs while providing personalized care.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of professionalism, transparency, and ethical conduct.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We continuously strive to exceed expectations and deliver outstanding care services.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "CEO & Founder",
      qualification: "PhD in Health Sciences",
      image:
        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "With over 20 years in healthcare management, Sarah founded Prime Choice Care to revolutionize personal care services.",
    },
    {
      name: "James Rodriguez",
      role: "Clinical Director",
      qualification: "RN, Master's in Nursing",
      image:
        "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "James oversees our clinical standards and ensures all care services meet the highest professional requirements.",
    },
    {
      name: "Emma Thompson",
      role: "Community Engagement Manager",
      qualification: "Bachelor of Social Work",
      image:
        "https://images.pexels.com/photos/7551656/pexels-photo-7551656.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Emma leads our community programs and develops innovative approaches to social care and support services.",
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
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
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
            <MobileNav currentPath="/about" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-blue-100 text-blue-800">About Us</Badge>
            <h1
              className={`text-4xl md:text-6xl font-bold text-gray-900 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Our Story of{" "}
              <span className="text-blue-600">Compassionate Care</span>
            </h1>
            <p
              className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Founded in 2010, Prime Choice Care has been dedicated to
              providing exceptional personal care, community support, and
              respite services across Australia. Our journey began with a simple
              mission: to enhance the quality of life for individuals while
              supporting their families and caregivers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-teal-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To provide compassionate, professional care services that
                  empower individuals to live with dignity, independence, and
                  joy while supporting their families and communities. We
                  believe everyone deserves access to quality care that respects
                  their unique needs and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-50 to-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <div className="bg-teal-600 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To be Australia's leading provider of innovative care
                  solutions, setting the standard for excellence in personal
                  care, community support, and respite services. We envision a
                  future where quality care is accessible to all, delivered with
                  compassion and professionalism.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-teal-100 text-teal-800">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Drives Us Every Day
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide every decision we make and every service we
              provide
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg text-center"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto bg-gradient-to-br from-blue-500 to-teal-500 p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800">Leadership Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings decades of healthcare
              expertise and passion for care
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {member.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-blue-600 font-semibold">{member.role}</p>
                    <p className="text-sm text-gray-600">
                      {member.qualification}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose Prime Choice Care?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're more than just a care provider - we're your trusted partner
              in wellbeing
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "NDIS Registered Provider",
                desc: "Fully accredited and compliant with all standards",
              },
              {
                icon: Clock,
                title: "15+ Years Experience",
                desc: "Proven track record of excellent care delivery",
              },
              {
                icon: Users,
                title: "150+ Qualified Staff",
                desc: "Experienced, trained, and compassionate caregivers",
              },
              {
                icon: Shield,
                title: "Comprehensive Insurance",
                desc: "Full coverage for peace of mind",
              },
              {
                icon: CheckCircle,
                title: "Quality Assurance",
                desc: "Regular audits and continuous improvement",
              },
              {
                icon: Heart,
                title: "Personalized Care",
                desc: "Tailored services to meet individual needs",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Experience the Pathway Difference?
            </h2>
            <p className="text-md text-gray-600">
              Contact us today to learn more about our services and how we can
              support you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-md px-8"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-MD px-8 border-blue-200 hover:bg-blue-50"
              >
                <Link href="tel:1300728422">Call +61 451103939</Link>
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
              &copy; 2025 Prime Choice Care. All rights reserved. | ABN: 12 345
              678 901
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
