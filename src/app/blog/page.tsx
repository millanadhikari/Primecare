"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Calendar,
  User,
  ArrowRight,
  Clock,
  Search,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

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
import { MobileNav } from "@/components/ui/mobile-nav";
import { getBlogs } from "../lib/blogApi";
import { useRouter } from "next/navigation";

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  const categories = [
    "All",
    "NDIS",
    "Home Care",
    "Respite Care",
    "Capacity Building",
    "Community",
    "Personal Care",
  ];

  const fetchBlogs = async () => {
    const token = "accesstoken"; // Replace with real token logic
    try {
      const response = await getBlogs(token, {
        searchQuery: searchTerm,
        type: selectedCategory === "All" ? "" : selectedCategory,
      });

      const data = response?.data?.blogs ?? [];

      const formatted = data
        .filter((post: any) => post.status === "Published") // optional
        .map((post: any) => ({
          id: post.id,
          title: post.title,
          author: post.author || "Admin",
          publishDate: post.publishDate,
          type: post.type || "General",
          image: post.featuredImage || "/default-image.jpg",
          excerpt: post.excerpt || "No description available.",
          readTime: post.readTime || "5 min read",
          isFeatured: post.isFeatured,
        }));
      console.log("Fetched blogs:", data)
      setBlogs(formatted);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredPosts = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost =
    selectedCategory === "All" && !searchTerm
      ? blogs.find((post) => post.isFeatured)
      : null;

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
                Pathway Care Solutions
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600"
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600"
              >
                Contact
              </Link>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
            <MobileNav currentPath="/blog" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Badge className="bg-blue-100 text-blue-800">Care Insights</Badge>
          <h1
            className={`text-4xl md:text-6xl font-bold mt-4 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            Expert <span className="text-blue-600">Care Insights</span>
          </h1>
          <p
            className={`mt-6 text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            Stay informed with the latest insights, tips, and guidance from our
            care professionals.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <Badge className="bg-yellow-100 text-yellow-800 mb-2">
              Featured Article
            </Badge>
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid lg:grid-cols-2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="object-cover w-full h-full aspect-video lg:aspect-square"
                />
                <div className="p-8">
                  <Badge className="bg-blue-100 text-blue-800">
                    {featuredPost.type}
                  </Badge>
                  <h2 className="text-3xl font-bold mt-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{featuredPost.excerpt}</p>
                  <div className="mt-4 flex space-x-4 text-sm text-gray-500">
                    <span>
                      <User className="inline w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </span>
                    <span>
                      <Calendar className="inline w-4 h-4 mr-1" />
                      {new Date(
                        featuredPost.publishDate
                      ).toLocaleDateString()}
                    </span>
                    <span>
                      <Clock className="inline w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => router.push(`/blog/${featuredPost.id}`)}>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {selectedCategory === "All"
              ? "Latest Articles"
              : `${selectedCategory} Articles`}
          </h2>
          <p className="text-gray-600 mb-8">
            {filteredPosts.length} article
            {filteredPosts.length !== 1 ? "s" : ""} found
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="shadow-md hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between text-xs text-gray-500">
                    <Badge className="bg-blue-100 text-blue-800">
                      {post.type}
                    </Badge>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription>{post.excerpt}</CardDescription>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      <User className="inline w-3 h-3 mr-1" />
                      {post.author}
                    </span>
                    <span>
                      <Calendar className="inline w-3 h-3 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full " onClick={() => router.push(`/blog/${post.id}`)}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
