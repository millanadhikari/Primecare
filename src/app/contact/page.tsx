'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-gray-700">
              Complete the form to send your message. If your inquiry is urgent, don&asos;t hesitate to call us at the number below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-700 mb-1">+61 451103939</p>
                <p className="text-gray-500 text-sm">Monday-Friday: 8am-6pm</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-700 mb-1">info@primechoicecare.com.au</p>
                <p className="text-gray-500 text-sm">We respond within 24 hours</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-gray-700 mb-1">123 Care Street</p>
                <p className="text-gray-500 text-sm">Sydney, NSW 2000</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Hours</h3>
                <p className="text-gray-700 mb-1">Mon-Sat: 8am-6pm</p>
                <p className="text-gray-500 text-sm">Sun: Closed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-gray-700 mb-6">
                  Fill out the form below and we&aspos;ll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Your phone number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" rows={4} required />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-400/90">
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Map and Additional Info */}
              <div>
                <div className="rounded-lg overflow-hidden h-64 border border-gray-200 mb-6">
                  {/* This would be a Google Map in a real implementation */}
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                    <p className="text-gray-500">Map would be displayed here</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4">Need Immediate Assistance?</h3>
                <p className="text-gray-700 mb-6">
                  If you need immediate support or have urgent questions about our services, 
                  please don&asos;t hesitate to call us directly.
                </p>
                
                <Button asChild className="w-full bg-blue-400 hover:bg-blue-400/90">
                  <a href="tel:1300972273" className="flex items-center justify-center">
                    Call Us Now <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-xl mb-3">Service Areas</h4>
                  <p className="text-gray-700 mb-4">
                    We provide services throughout the Sydney metropolitan area and surrounding regions, including:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-gray-700">
                    <div>
                      <p>• Sydney CBD</p>
                      <p>• Inner West</p>
                      <p>• Eastern Suburbs</p>
                      <p>• North Shore</p>
                    </div>
                    <div>
                      <p>• Northern Beaches</p>
                      <p>• Western Sydney</p>
                      <p>• South Sydney</p>
                      <p>• Sutherland Shire</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Abbreviated */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find quick answers to common questions about our services.
              </p>
            </div>
            
            {/* Just a placeholder for FAQs - would typically use an Accordion component here */}
            <div className="max-w-3xl mx-auto">
              <p className="text-center text-gray-700">FAQ content would be displayed here.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
