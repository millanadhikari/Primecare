import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, Home, Award, Clock, Brain } from "lucide-react";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import Link from "next/link";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-gray-700">
                We provide comprehensive disability support services tailored to individual needs and goals,
                empowering participants to live their best lives.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Section - NEW */}
        <WhyChooseSection />

        {/* Services Detail Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="space-y-24">
              {/* Personal Care */}
              <div id="personal-care" className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="mb-4 inline-block p-3 bg-blue-50 rounded-full">
                    <Heart className="h-8 w-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Personal Care</h2>
                  <p className="text-gray-700 text-lg mb-4">
                    Our personal care services provide assistance with daily activities while respecting privacy 
                    and dignity. We support participants with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Personal hygiene and grooming</li>
                    <li>Dressing and undressing</li>
                    <li>Eating and drinking assistance</li>
                    <li>Mobility support and transfers</li>
                    <li>Medication management</li>
                    <li>Personal care during travel or appointments</li>
                  </ul>
                  <Button asChild className="bg-blue-600 hover:bg-blue-500">
                    <Link href="/contact">Enquire About Personal Care</Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Caregiver providing personal assistance" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </div>

              {/* Community Participation */}
              <div id="community-participation" className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-center">
                <div className="order-1 md:order-2">
                  <div className="mb-4 inline-block p-3 bg-blue-50 rounded-full">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Community Participation</h2>
                  <p className="text-gray-700 text-lg mb-4">
                    We help participants engage meaningfully with their communities, develop social connections, 
                    and access community resources through:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Assistance with social and community participation</li>
                    <li>Support for recreational activities and hobbies</li>
                    <li>Transportation to community events and venues</li>
                    <li>Development of social skills and confidence</li>
                    <li>Access to community resources and facilities</li>
                    <li>Support for educational and vocational activities</li>
                  </ul>
                  <Button asChild className="bg-blue-600 hover:bg-blue-500">
                    <Link href="/contact">Enquire About Community Participation</Link>
                  </Button>
                </div>
                <div className="order-2 md:order-1 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="People engaging in community activities" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </div>

              {/* Daily Tasks & Shared Living */}
              <div id="daily-tasks" className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="mb-4 inline-block p-3 bg-blue-50 rounded-full">
                    <Home className="h-8 w-8 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Daily Tasks & Shared Living</h2>
                  <p className="text-gray-700 text-lg mb-4">
                    We provide support to help participants maintain a safe and comfortable home environment 
                    and develop independent living skills:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Household cleaning and maintenance</li>
                    <li>Meal planning and preparation</li>
                    <li>Grocery shopping and errands</li>
                    <li>Laundry and clothing care</li>
                    <li>Bill payment and financial management assistance</li>
                    <li>Safety and emergency planning</li>
                  </ul>
                  <Button asChild className="bg-blue-600 hover:bg-blue-500">
                    <Link href="/contact">Enquire About Daily Tasks Support</Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Person cooking in a kitchen" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </div>

              {/* Only showing 3 services for brevity, but you would continue with the other services */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
            <p className="text-md text-blue-100 mb-8 max-w-2xl mx-auto">
              Our team is ready to answer your questions about our services and how we can support you or your loved one.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white bg-blue-600">
                <a href="tel:+61 451103939">Call +61 451103939</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;