import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About PrimeChoice Care
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Prime Choice Care is a NDIS registered (National Disability
              Insurance Scheme) Provider operating all over greater Sydney
              region. We are specialised in Disability Support, Supported
              Accommodation such as SIL, STA and MTA, Community Participation,
              Domestic Assistance, Social and Community Participation and more.
              We support our clients 24/7.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Founded by a team of experienced disability support professionals,
              we understand the unique challenges faced by individuals and
              families navigating disability services. That's why we focus on
              building meaningful relationships and delivering care that's as
              individual as the people we support.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/about">Learn More About Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-600 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              >
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="people.jpg"
                  alt="Caregiver supporting person with disability"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <p className="font-bold text-blue-600 text-xl">10+ Years</p>
                <p className="text-gray-700">
                  Of experience in disability support services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
