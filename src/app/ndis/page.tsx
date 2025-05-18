import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const NDIS = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">NDIS Information</h1>
              <p className="text-xl text-gray-700">
                Understanding the National Disability Insurance Scheme and how we can help you navigate it.
              </p>
            </div>
          </div>
        </section>

        {/* What is NDIS */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">What is the NDIS?</h2>
                <p className="text-gray-700 text-lg mb-4">
                  The National Disability Insurance Scheme (NDIS) is an Australian Government initiative that provides
                  support to eligible people with intellectual, physical, sensory, cognitive and psychosocial disability.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  The NDIS gives participants more choice and control over how, when and where their supports are provided.
                  It also provides information and connections to services in their communities.
                </p>
                <p className="text-gray-700 text-lg">
                  As an approved NDIS provider, PrimeCare helps participants make the most of their NDIS funding with
                  high-quality, personalized support services.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt="Person reviewing documents" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>

          <div className="container-custom mt-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="px-0 py-6 mx-auto  max-w-[700px]  ">
            <h2 className="text-[1.6rem] md:text-3xl font-bold">
              NDIS Community{" "}
              <span className="text-blue-600">Support & Participation</span>
            </h2>
            <div className="mt-4 text-gray-700 text-lg">
              <p>
                Build meaningful connections and participate in activities
                within your local community with guidance from our dedicated and
                caring NDIS community support workers. With an emphasis on
                fostering NDIS community engagement, you’ll discover new
                opportunities to connect, grow, and flourish in an inclusive and
                supportive setting.
              </p>
              <br className=""></br>
            </div>
            </div>

              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="people.jpg"
                  alt="Person reviewing documents" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How We Can Help */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How We Can Help</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                As a registered NDIS provider, PrimeCare offers a range of services to help you maximize your NDIS plan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Plan Understanding</h3>
                </div>
                <p className="text-gray-700">
                  We'll help you understand your NDIS plan, the funding categories, and how to best utilize your budget.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Service Matching</h3>
                </div>
                <p className="text-gray-700">
                  We'll match our services to the appropriate funding categories in your plan, ensuring you receive the right supports.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Goal Achievement</h3>
                </div>
                <p className="text-gray-700">
                  Our services are designed to help you achieve your NDIS goals and increase your independence and community participation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Plan Reviews</h3>
                </div>
                <p className="text-gray-700">
                  We can provide guidance and support during plan reviews, helping you demonstrate progress and advocate for appropriate funding.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Transparent Billing</h3>
                </div>
                <p className="text-gray-700">
                  Clear, transparent billing that aligns with NDIS price guides and makes it easy to track your funding usage.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-care-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Coordination</h3>
                </div>
                <p className="text-gray-700">
                  We work collaboratively with your support coordinator, other providers, and family members to ensure coordinated care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NDIS Funding Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">NDIS Funding Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our services align with the following NDIS funding categories:
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Core Supports</h3>
                <p className="text-gray-700 mb-4">
                  Support with everyday activities, current needs, and enabling you to participate in the community.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <div>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Assistance with Daily Life</p>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Transport</p>
                  </div>
                  <div>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Consumables</p>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Assistance with Social & Community Participation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Capacity Building Supports</h3>
                <p className="text-gray-700 mb-4">
                  Building your independence and skills to help reach your long-term goals.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <div>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Daily Living Skills</p>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Home Living</p>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Health & Wellbeing</p>
                  </div>
                  <div>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Social & Community Participation</p>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Relationships</p>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Life Choices</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Capital Supports</h3>
                <p className="text-gray-700 mb-4">
                  Higher-cost items such as assistive technology, home modifications, and specialized disability accommodation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <div>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Assistive Technology</p>
                  </div>
                  <div>
                    <p className="flex items-center"><Check className="h-4 w-4 text-care-blue mr-2" /> Home Modifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Your NDIS Plan?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our team can help you navigate the NDIS and make the most of your funding. Contact us today for a free consultation.
            </p>
            <Button asChild className="bg-white text-blue-500 hover:bg-blue-50">
              <Link href="/contact">Contact Us About NDIS</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NDIS;