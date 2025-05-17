import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Home, Award, Clock, Brain } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Personal Care",
    description:
      "Assistance with daily personal activities including hygiene, grooming, and mobility support.",
    icon: <Heart className="h-10 w-10 text-care-blue" />,
    link: "/services#personal-care",
  },
  {
    title: "Community Participation",
    description:
      "Support to engage in community activities, develop social skills, and build connections.",
    icon: <Users className="h-10 w-10 text-care-blue" />,
    link: "/services#community-participation",
  },
  {
    title: "Daily Tasks & Shared Living",
    description:
      "Help with household tasks, meal preparation, and maintaining a safe living environment.",
    icon: <Home className="h-10 w-10 text-care-blue" />,
    link: "/services#daily-tasks",
  },
  {
    title: "Supported Independent Living",
    description:
      "Comprehensive support in a shared or independent living arrangement tailored to individual needs.",
    icon: <Award className="h-10 w-10 text-care-blue" />,
    link: "/services#supported-independent",
  },
  {
    title: "Respite Care",
    description:
      "Short-term care providing relief for primary caregivers and families.",
    icon: <Clock className="h-10 w-10 text-care-blue" />,
    link: "/services#respite-care",
  },
  {
    title: "Capacity Building",
    description:
      "Developing skills for increased independence and participation in daily life activities.",
    icon: <Brain className="h-10 w-10 text-care-blue" />,
    link: "/services#capacity-building",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of disability support services
            tailored to individual needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
            >
              <CardHeader className="pb-0">
                <div className="mb-4 text-blue-600">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription className="text-gray-600 mb-4 text-base">
                  {service.description}
                </CardDescription>
                <Link
                  href={service.link}
                  className="text-blue-600 hover:text-blue-400 font-medium inline-flex items-center"
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-500">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
