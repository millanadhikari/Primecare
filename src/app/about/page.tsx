import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-xl text-gray-700">
                PrimeCare is a leading provider of disability support services, 
                committed to enhancing the quality of life for our participants.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 text-lg mb-4">
                  PrimeCare was founded in 2010 by a team of experienced disability support professionals who 
                  recognized the need for more personalized, high-quality care services.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Our journey began with a simple mission: to provide support that truly empowers individuals 
                  with disabilities to live fulfilling lives on their own terms.
                </p>
                <p className="text-gray-700 text-lg">
                  Over the years, we've grown from a small team supporting a handful of participants to a 
                  trusted provider across multiple locations, but our commitment to personalized care and 
                  genuine relationships remains at the heart of everything we do.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Team meeting" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="text-center">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-care-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 text-lg">
                  To provide exceptional disability support services that enhance independence, 
                  promote dignity, and empower individuals to achieve their goals and participate 
                  fully in their communities.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-care-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-700 text-lg">
                  To be the most trusted disability support provider, recognized for our person-centered 
                  approach, exceptional quality of care, and positive impact on the lives of the people 
                  we support and their families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At PrimeCare, we believe in a holistic, person-centered approach that respects individual choices and promotes independence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Person-Centered Planning</h3>
                </div>
                <p className="text-gray-700">
                  We take the time to understand each person's unique needs, preferences, and goals, 
                  ensuring our support is tailored specifically to them.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Skilled Support Team</h3>
                </div>
                <p className="text-gray-700">
                  Our team consists of trained professionals who receive ongoing education and 
                  development to ensure they provide the highest quality support.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Continuous Improvement</h3>
                </div>
                <p className="text-gray-700">
                  We regularly seek feedback and evaluate our services to ensure we're 
                  consistently meeting and exceeding expectations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Family Involvement</h3>
                </div>
                <p className="text-gray-700">
                  We recognize the importance of family and work collaboratively with loved ones 
                  to ensure coordinated and comprehensive support.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Community Connection</h3>
                </div>
                <p className="text-gray-700">
                  We help participants build meaningful connections within their communities, 
                  promoting inclusion and a sense of belonging.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Transparency & Accountability</h3>
                </div>
                <p className="text-gray-700">
                  We operate with integrity and openness, ensuring clear communication and 
                  responsible management of resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our team and make a difference in the lives of others.
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">View Career Opportunities</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;