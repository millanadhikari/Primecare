"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Eye,
  Share2,
  Trash2,
  MoreVertical,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBlog } from "@/app/lib/blogApi";

interface Blog {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  type: string;
  status: "Published" | "Draft" | "Scheduled";
  excerpt: string;
  content: string;
  featuredImage: string;
  publishDate: string;
  isFeatured: boolean;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  slug: string;
  views: number;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogDetailsProps {
  blog: Blog;
}

export function BlogDetails({ blog }: BlogDetailsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    router.push(`/crm/blogs/${blog.id}/edit`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Missing access token");
      return;
    }
    try {
      await deleteBlog(token, blog?.id);
      toast.success("Blog deleted successfully");
      router.push("/crm/blogs");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
      return;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'at' p");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/crm/blogs")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Blog
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
                disabled={isLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Blog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Blog Header */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Status and Type */}
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  blog.status === "Published"
                    ? "default"
                    : blog.status === "Draft"
                    ? "secondary"
                    : "outline"
                }
              >
                {blog.status}
              </Badge>
              {blog.isFeatured && (
                <Badge variant="destructive">Featured</Badge>)}
              <Badge variant="outline">{blog.type}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight">{blog.title}</h1>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground">{blog.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={blog.authorAvatar} />
                  <AvatarFallback>
                    {blog.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.publishDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{blog?.views?.toLocaleString()} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blog?.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Image */}
      {blog.featuredImage && (
        <Card>
          <CardContent className="p-0">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {/* Blog Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Article Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>

      {/* Blog Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">SEO Information</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Meta Title:</span>
                  <p className="text-muted-foreground">{blog.metaTitle}</p>
                </div>
                <div>
                  <span className="font-medium">Meta Description:</span>
                  <p className="text-muted-foreground">
                    {blog.metaDescription}
                  </p>
                </div>
                <div>
                  <span className="font-medium">URL Slug:</span>
                  <p className="text-muted-foreground">{blog.slug}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Publishing Details</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Created:</span>
                  <p className="text-muted-foreground">
                    {formatDateTime(blog.createdAt)}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <p className="text-muted-foreground">
                    {formatDateTime(blog.updatedAt)}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Published:</span>
                  <p className="text-muted-foreground">
                    {formatDateTime(blog.publishDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
