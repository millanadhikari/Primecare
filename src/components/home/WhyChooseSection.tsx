'use client';
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Shield,
  Users,
  Star,
  Award,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: <Heart className="h-10 w-10 text-blue-500" />,
    title: "Personalized Care Approach",
    shortDesc:
      "Customized support plans tailored to your unique needs and preferences.",
    longDesc:
      "We believe every person deserves care as individual as they are. Our team works closely with you to develop a personalized care plan that addresses your specific needs, preferences, and goals, ensuring you receive the exact support that's right for you.",
  },
  {
    icon: <Shield className="h-10 w-10 text-orange-500" />,
    title: "Experienced & Trained Staff",
    shortDesc:
      "Our team of professionals has extensive experience in disability support.",
    longDesc:
      "Our support workers undergo comprehensive training and continuous professional development to ensure they provide the highest quality care. With years of experience in disability support, our team has the expertise to handle complex needs with confidence and compassion.",
  },
  {
    icon: <Users className="h-10 w-10 text-teal-600" />,
    title: "NDIS Registered Provider",
    shortDesc:
      "Fully registered and compliant with all NDIS quality and safeguards.",
    longDesc:
      "As a registered NDIS provider, we maintain strict compliance with all quality and safeguarding requirements. This means you can trust that our services meet the highest standards of care and that your funding is managed transparently and effectively.",
  },
  {
    icon: <Star className="h-10 w-10 text-blue-500" />,
    title: "Flexible Support Options",
    shortDesc:
      "Services available 24/7 to accommodate your schedule and needs.",
    longDesc:
      "We understand that support needs can change and vary at different times. That's why we offer flexible scheduling with services available 24/7, allowing you to receive care when and where you need it most, including evenings, weekends, and holidays.",
  },
  {
    icon: <Award className="h-10 w-10 text-orange-500" />,
    title: "Holistic Approach to Care",
    shortDesc:
      "We focus on your overall wellbeing, not just your immediate needs.",
    longDesc:
      "Our holistic approach addresses all aspects of your wellbeing – physical, emotional, social, and psychological. We don't just provide basic support; we work to enhance your quality of life and help you achieve your personal goals and aspirations.",
  },
  {
    icon: <Handshake className="h-10 w-10 text-teal-600" />,
    title: "Transparent Communication",
    shortDesc:
      "Clear, open communication with participants and their support networks.",
    longDesc:
      "We believe in fostering strong, trust-based relationships through transparent communication. We keep you and your support network informed and involved every step of the way, ensuring you have clarity about your services and are empowered to make informed decisions.",
  },
];

const WhyChooseSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-blue-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose PrimeChoice Care?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We go above and beyond to ensure our participants receive the
            highest quality care and support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className={cn(
                "border-gray-200 transition-all hover:border-blue-500 hover:shadow-md overflow-hidden",
                expandedIndex === index ? "shadow-lg" : ""
              )}
            >
              <CardHeader className="flex flex-row items-start gap-4 pb-0">
                <div className="bg-blue-50 rounded-full p-2">{reason.icon}</div>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {reason.shortDesc}
                  </CardDescription>
                </div>
              </CardHeader>

              <Separator className="my-0" />

              <CardContent className="pb-0 ">
                <Collapsible
                  open={expandedIndex === index}
                  onOpenChange={() => toggleExpand(index)}
                  className="space-y-0"
                >
                  <CollapsibleTrigger className="flex items-center justify-center w-full text-sm text-blue-500 font-medium hover:underline">
                    {expandedIndex === index ? (
                      <div className="flex items-center cursor-pointer">
                        Show Less <ChevronUp className="ml-1 h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex items-center cursor-pointer">
                        Read More <ChevronDown className="ml-1 h-4 w-4" />
                      </div>
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="animate-accordion-down">
                    <p className="pt-2 text-gray-700">{reason.longDesc}</p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
