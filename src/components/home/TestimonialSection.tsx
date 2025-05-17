"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "PrimeCare has been a lifeline for our family. Their caregivers are compassionate, reliable, and truly care about my son&apos;s wellbeing. The individualized support has helped him gain confidence and independence.",
    author: "Sarah M.",
    role: "Mother of NDIS Participant",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    quote:
      "The team at PrimeCare goes above and beyond to ensure I can participate fully in my community. They don&apos;t just provide support – they&apos;ve helped me build skills and confidence to live more independently.",
    author: "James T.",
    role: "NDIS Participant",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    quote:
      "As a support coordinator, I&apos;ve referred many clients to PrimeCare. Their consistency, professionalism, and genuine commitment to person-centered care sets them apart. I know my clients are in good hands.",
    author: "Michelle K.",
    role: "NDIS Support Coordinator",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the people and families who have experienced the
            difference our care makes.
          </p>
        </div>

        <div className="relative">
          <Card className="border-0 shadow-lg bg-white max-w-4xl mx-auto p-0">
            <CardContent className="p-0 ">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="hidden md:block">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-10 md:col-span-2">
                  <svg
                    className="h-10 w-10 text-blue-600 opacity-20 mb-4"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8v10H0V8h10zm12 0v10H12V8h10z"></path>
                  </svg>
                  <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                  &quot;{testimonials[current].quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-lg">
                      {testimonials[current].author}
                    </p>
                    <p className="text-blue-600">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  current === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4 md:ml-0">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4 md:mr-0">
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
