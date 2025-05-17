import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  House,
  Activity,
  Car,
  CalendarDays,
  Users,
  Book,
  UserSquare2,
} from "lucide-react";
import Link from "next/link";

const ndisPlans = [
  {
    title: "Accommodation/Tenancy",
    description:
      "Support services to help you find and maintain suitable accommodation or tenancy arrangements.",
    icon: <House className="h-8 w-8 text-blue-600" />,
    link: "/ndis#accommodation-tenancy",
  },
  {
    title: "Assist-Personal Activities",
    description:
      "Assistance with personal care tasks and daily living activities tailored to your individual needs.",
    icon: <Activity className="h-8 w-8 text-orange-500" />,
    link: "/ndis#personal-activities",
  },
  {
    title: "Assist-Travel/Transport",
    description:
      "Support to access transportation and travel assistance for appointments and community activities.",
    icon: <Car className="h-8 w-8 text-teal-600" />,
    link: "/ndis#travel-transport",
  },
  {
    title: "Daily Tasks/Shared Living",
    description:
      "Help with household management and support for shared living environments.",
    icon: <CalendarDays className="h-8 w-8 text-blue-600" />,
    link: "/ndis#daily-tasks",
  },
  {
    title: "Community Participation",
    description:
      "Support to engage in community activities and develop social connections and skills.",
    icon: <Users className="h-8 w-8 text-orange-500" />,
    link: "/ndis#community-participation",
  },
  {
    title: "Development-Life Skills",
    description:
      "Programs designed to help you develop important life skills and increase independence.",
    icon: <Book className="h-8 w-8 text-teal-600" />,
    link: "/ndis#life-skills",
  },
  {
    title: "Group/Center Activities",
    description:
      "Group-based activities and programs at our centers focused on skill development and socialization.",
    icon: <UserSquare2 className="h-8 w-8 text-blue-600" />,
    link: "/ndis#group-activities",
  },
];

const NdisPlansSection = () => {
  return (
    <section className="section-padding bg-blue-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            NDIS Participants Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide support across all key areas of NDIS funding to help you
            achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ndisPlans.map((plan, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="pb-4 text-center">
                <div className="rounded-full bg-blue-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  {plan.icon}
                </div>
                <CardTitle className="text-lg mb-[-15px]">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <Link
                  href={plan.link}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium inline-flex items-center"
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
          <p className="text-gray-700 max-w-xl mx-auto">
            Our experienced team works closely with you to maximize your NDIS
            funding and ensure you receive all the supports you're entitled to.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NdisPlansSection;
