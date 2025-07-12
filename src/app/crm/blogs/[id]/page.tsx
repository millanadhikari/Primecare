"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { BlogDetails } from "./blog-details";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogById } from "@/app/lib/blogApi";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //   const blog = {
  //     id: params.id,
  //     title: "Understanding NDIS Support Coordination",
  //     author: "Dr. Rebecca Chen",
  //     authorAvatar: "",
  //     type: "Educational",
  //     status: "Published" as const,
  //     excerpt: "A comprehensive guide to understanding how NDIS support coordination works and how it can benefit participants in achieving their goals.",
  //     content: `
  //       <h2>What is NDIS Support Coordination?</h2>
  //       <p>NDIS Support Coordination is a capacity building support that helps participants understand and implement their NDIS plan. Support coordinators work with participants to connect them with providers and community supports that will help them achieve their goals.</p>

  //       <h3>Key Benefits</h3>
  //       <ul>
  //         <li>Help understanding your NDIS plan</li>
  //         <li>Connecting with appropriate service providers</li>
  //         <li>Building your capacity to coordinate supports</li>
  //         <li>Crisis and complex support coordination when needed</li>
  //       </ul>

  //       <h3>How to Get Started</h3>
  //       <p>If you have support coordination funding in your NDIS plan, you can choose a support coordinator that best meets your needs. It's important to find someone who understands your goals and can work with you to achieve them.</p>

  //       <p>For more information about NDIS support coordination, contact our team today.</p>
  //     `,
  //     featuredImage: "https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=1200",
  //     publishDate: "2025-04-10T09:00:00.000Z",
  //     tags: ["NDIS", "Support Coordination", "Disability Services", "Healthcare"],
  //     metaTitle: "Understanding NDIS Support Coordination - MediCare Plus",
  //     metaDescription: "Learn about NDIS support coordination and how it can help participants achieve their goals through proper planning and provider connections.",
  //     slug: "understanding-ndis-support-coordination",
  //     views: 1247,
  //     readTime: "5 min read",
  //     createdAt: "2025-04-10T09:00:00.000Z",
  //     updatedAt: "2025-04-10T09:00:00.000Z"
  //   };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !id) {
      setError("Missing access token or ID.");
      setLoading(false);
      return;
    }

    getBlogById(id as string, token)
      .then((data) => {
        console.log("Fetched blog data:", data);
        setBlog(data?.data?.post);
      })
      .catch((err) => {
        console.error("Failed to fetch blog:", err);
        setError("Failed to fetch blog.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p>blog not found.</p>;
  return (
    <MainLayout>
      <BlogDetails blog={blog} />
    </MainLayout>
  );
}
