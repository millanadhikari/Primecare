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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Calendar,
  Users,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/ui/mobile-nav";
import { createMessage } from "../lib/messageApi";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    preferredContact: "",
    priority: "High",
    category: "Inquiry",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createMessage(formData);
      console.log("Form data submitted:", response);
      if (response.status == "success") {
        alert("Your message has been sent!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          preferredContact: "",
          priority: "High",
          category: "Inquiry",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our care coordinators",
      contact: "+61 451103939",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Enquiries",
      description: "Send us your questions anytime",
      contact: "info@primechoicecare.com.au",
      hours: "Response within 24 hours",
      action: "Send Email",
    },
    {
      icon: MessageSquare,
      title: "Emergency Support",
      description: "24/7 emergency care coordination",
      contact: "+61 451103939",
      hours: "Available 24/7",
      action: "Emergency Line",
    },
  ];

  const locations = [
    {
      city: "Sydney",
      state: "NSW",
      address: "Level 15, 135 King Street, Sydney NSW 2000",
      phone: "+61 451103939",
      email: "info@primechoicecare.com.au",
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
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Contact
              </Link>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
            <MobileNav currentPath="/contact" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-blue-100 text-blue-800">Contact Us</Badge>
            <h1
              className={`text-4xl md:text-6xl font-bold text-gray-900 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Get in <span className="text-blue-600">Touch Today</span>
            </h1>
            <p
              className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Ready to start your care journey? Our friendly team is here to
              answer your questions, provide information about our services, and
              help you find the perfect care solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg text-center"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto bg-gradient-to-br from-blue-500 to-teal-500 p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {method.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-blue-600">
                      {method.contact}
                    </p>
                    <p className="text-sm text-gray-600">{method.hours}</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Request a Free Consultation</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll contact you within 24 hours
                  to discuss your care needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Service Interest
                      </label>
                      <Select
                        name="service"
                        onValueChange={(value) =>
                          setFormData({ ...formData, service: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal-care">
                            Personal Care Services
                          </SelectItem>
                          <SelectItem value="community-support">
                            Community Support
                          </SelectItem>
                          <SelectItem value="respite-care">
                            Respite Care
                          </SelectItem>
                          <SelectItem value="ndis-services">
                            NDIS Services
                          </SelectItem>
                          <SelectItem value="all-services">
                            All Services
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="preferredContact"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Contact Method
                      </label>
                      <Select
                        name="preferredContact"
                        onValueChange={(value) =>
                          setFormData({ ...formData, preferredContact: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="either">Either</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tell Us About Your Needs
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Please describe your care needs and any questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg"
                  >
                    Send Enquiry
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-teal-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Why Choose Pathway Care Solutions?
                  </h3>
                  <div className="space-y-4">
                    {[
                      "NDIS Registered Provider",
                      "15+ Years Experience",
                      "150+ Qualified Caregivers",
                      "24/7 Support Available",
                      "Personalized Care Plans",
                      "Comprehensive Insurance",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">
                      8:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-semibold text-gray-900">
                      9:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-semibold text-gray-900">
                      Emergency Only
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Emergency Line</span>
                      <span className="font-semibold text-red-600">
                        24/7 Available
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-teal-100 text-teal-800">Our Locations</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Serving Communities Across Australia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With offices in major cities, we're always close by to provide the
              support you need
            </p>
          </div>
          <div className="flex items-center justify-center">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm"
              >
                <CardHeader className="text-center pb-2">
                  <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-3 rounded-xl w-fit mx-auto mb-2">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {location.city}, {location.state}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-gray-600">{location.address}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">{location.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700 text-xs">
                        {location.email}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Don't Wait - Start Your Care Journey Today
            </h2>
            <p className="text-xl text-blue-100">
              Our care coordinators are standing by to help you find the perfect
              care solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-md px-8"
              >
                <Link href="tel:1300728422">Call +61 451103939</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600 text-md px-8"
              >
                <Link href="mailto:info@primechoicecare.com.au">
                  Send Email
                </Link>
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
                <span className="text-xl font-bold">PrimeChoice Care</span>
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
              &copy; 2024 Pathway Care Solutions. All rights reserved. | ABN: 12
              345 678 901
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
