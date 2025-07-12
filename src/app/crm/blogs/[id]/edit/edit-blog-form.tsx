"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CalendarIcon,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { updateBlogbyId } from "@/app/lib/blogApi";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

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
  publishDate: any;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  isFeatured: boolean;
  slug: string;
  views: number;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

interface EditBlogFormProps {
  blog: Blog;
}

function sanitizeBlogData(blog: Partial<Blog>) {
  return {
    title: blog.title ?? "",
    author: blog.author ?? "",
    type: blog.type ?? "",
    status: blog.status ?? "Draft",
    excerpt: blog.excerpt ?? "",
    content: blog.content ?? "",
    featuredImage: blog.featuredImage ?? "",
    publishDate: blog.publishDate ? new Date(blog.publishDate) : new Date(),
    tags: blog.tags ?? [],
    metaTitle: blog.metaTitle ?? "",
    isFeatured: blog.isFeatured ?? false,
    metaDescription: blog.metaDescription ?? "",
    slug: blog.slug ?? "",
  };
}
export function EditBlogForm({ blog }: EditBlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isFeat, setIsFeat] = useState(blog?.isFeatured ?? false);

  const [blogData, setBlogData] = useState(() => sanitizeBlogData(blog));

  const handleInputChange = (field: string, value: string | string[]) => {
    const sanitizedValue = value ?? "";

    setBlogData((prev) => {
      const updated = { ...prev, [field]: sanitizedValue };

      if (field === "title" && typeof sanitizedValue === "string") {
        updated.slug = sanitizedValue
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();
      }

      return updated;
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBlogData((prev) => ({
        ...prev,
        publishDate: date,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData((prev) => ({
          ...prev,
          featuredImage: reader.result as string,
        }));
        toast.success("Featured image updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !blogData.tags.includes(newTag.trim())) {
      setBlogData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCancel = () => {
    router.push(`/crm/blogs/${blog.id}`);
  };

  const handleSaveDraft = async () => {
    if (!blogData.title || !blogData.author) {
      toast.error("Please fill in the title and author");
      return;
    }

    setIsLoading(true);

    try {
      const draftData = {
        ...blogData,
        status: "Draft",
        updatedAt: new Date().toISOString(),
      };

      await updateBlogbyId(
        blog.id,
        draftData,
        localStorage.getItem("accessToken") || ""
      );

      router.push(`/crm/blogs/${blog.id}`);

      toast.success("Blog saved as draft");
      // router.push("crm/blogs");
    } catch (error) {
      toast.error("Failed to save draft. Please try again.");
      console.error("Error saving draft:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (
      !blogData.title ||
      !blogData.author ||
      !blogData.content ||
      !blogData.excerpt
    ) {
      toast.error(
        "Please fill in all required fields (Title, Author, Content, Excerpt)"
      );
      return;
    }

    setIsLoading(true);

    try {
      const updateData = {
        ...blogData,
        publishDate: blogData.publishDate.toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Updating blog with data:", updateData);

      // Simulate API call
      const refreshBlog = await updateBlogbyId(
        blog.id,
        updateData,
        localStorage.getItem("accessToken") || ""
      );
      setBlogData(sanitizeBlogData(refreshBlog?.data?.post || {}));
      toast.success("Blog updated successfully");
      router.push(`/crm/blogs/${blog.id}`);
    } catch (error) {
      toast.error("Failed to update blog. Please try again.");
      console.error("Error updating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (
      !blogData.title ||
      !blogData.author ||
      !blogData.content ||
      !blogData.excerpt
    ) {
      toast.error(
        "Please fill in all required fields (Title, Author, Content, Excerpt)"
      );
      return;
    }

    setIsLoading(true);

    try {
      const publishData = {
        ...blogData,
        status: "Published",
        publishDate: blogData.publishDate.toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const refreshBlog = await updateBlogbyId(
        blog.id,
        publishData,
        localStorage.getItem("accessToken") || ""
      );
      setBlogData(sanitizeBlogData(refreshBlog?.data?.post || {}));
      toast.success("Blog updated successfully");
      router.push(`/crm/blogs/${blog.id}`);
    } catch (error) {
      toast.error("Failed to publish blog. Please try again.");
      console.error("Error publishing blog:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleFeatured = async (newValue: boolean) => {
    setIsFeat(newValue); // instantly update UI

    try {
      const updatedBlogData = {
        ...blogData,
        isFeatured: newValue,
      };

      const refreshBlog = await updateBlogbyId(
        blog.id,
        updatedBlogData,
        localStorage.getItem("accessToken") || ""
      );

      setBlogData(sanitizeBlogData(updatedBlogData));

      toast.success(
        `Blog marked as ${newValue ? "featured" : "not featured"} successfully`
      );
    } catch (error) {
      toast.error("Failed to update featured status. Please try again.");
      console.error("Error updating featured status:", error);
      setIsFeat(!newValue); // revert if error
    }
  };
  const handleSchedule = async () => {
    if (
      !blogData.title ||
      !blogData.author ||
      !blogData.content ||
      !blogData.excerpt
    ) {
      toast.error(
        "Please fill in all required fields and select a publish date"
      );
      return;
    }

    if (blogData.publishDate <= new Date()) {
      toast.error("Publish date must be in the future");
      return;
    }

    setIsLoading(true);

    try {
      const scheduleData = {
        ...blogData,
        status: "Scheduled",
        publishDate: blogData.publishDate.toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Scheduling blog with data:", scheduleData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Blog scheduled successfully");
      router.push("crm/blogs");
    } catch (error) {
      toast.error("Failed to schedule blog. Please try again.");
      console.error("Error scheduling blog:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!blogData) return null;

 
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Blog Post</h1>
            <p className="text-muted-foreground">
              Update and modify your blog post
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {blogData?.isFeatured && <Badge>Featured </Badge>}
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            variant="secondary"
            onClick={handleSchedule}
            disabled={isLoading}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button
            onClick={
              blogData?.status === "Published" ? handleUpdate : handlePublish
              // handleUpdate
            }
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : blogData?.status === "Published"
              ? "Update"
              : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={blogData?.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={blogData?.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="url-friendly-slug"
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated from title. Edit if needed.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={blogData?.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Brief description of the blog post..."
                  className="min-h-[80px]"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={blogData?.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Write your blog post content here..."
                  className="min-h-[300px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {blogData?.featuredImage ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={blogData?.featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        setBlogData((prev) => ({ ...prev, featuredImage: "" }))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Label
                      htmlFor="featuredImageReplace"
                      className="cursor-pointer"
                    >
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Replace Image
                        </span>
                      </Button>
                      <Input
                        id="featuredImageReplace"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="featuredImage" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-foreground">
                          Upload featured image
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </span>
                        <Input
                          id="featuredImage"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={blogData?.metaTitle}
                  onChange={(e) =>
                    handleInputChange("metaTitle", e.target.value)
                  }
                  placeholder="SEO title for search engines"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={blogData?.metaDescription}
                  onChange={(e) =>
                    handleInputChange("metaDescription", e.target.value)
                  }
                  placeholder="SEO description for search engines"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="author">Author *</Label>
                <Select
                  value={blogData?.author}
                  onValueChange={(value) => handleInputChange("author", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Rebecca Chen">
                      Dr. Rebecca Chen
                    </SelectItem>
                    <SelectItem value="Dr. Mark Johnson">
                      Dr. Mark Johnson
                    </SelectItem>
                    <SelectItem value="Sarah Williams">
                      Sarah Williams
                    </SelectItem>
                    <SelectItem value="Jennifer Martinez">
                      Jennifer Martinez
                    </SelectItem>
                    <SelectItem value="Michael Thompson">
                      Michael Thompson
                    </SelectItem>
                    <SelectItem value="Dr. Lisa Anderson">
                      Dr. Lisa Anderson
                    </SelectItem>
                    <SelectItem value="David Wilson">David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Blog Type *</Label>
                <Select
                  value={blogData?.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blog type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Best Practices">
                      Best Practices
                    </SelectItem>
                    <SelectItem value="Mental Health">Mental Health</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Family Support">
                      Family Support
                    </SelectItem>
                    <SelectItem value="Workplace">Workplace</SelectItem>
                    <SelectItem value="Health & Wellness">
                      Health & Wellness
                    </SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                    <SelectItem value="News & Updates">
                      News & Updates
                    </SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={blogData?.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !blogData?.publishDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {blogData?.publishDate
                        ? format(blogData?.publishDate, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={blogData?.publishDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="featured">Featured</Label>
                <Switch
                  id="isFeatured"
                  checked={isFeat}
                  onCheckedChange={toggleFeatured}
                  className="bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button onClick={handleAddTag} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {blogData?.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  {blogData?.title || "Blog Title"}
                </div>
                <div className="text-xs text-muted-foreground">
                  By {blogData?.author || "Author"} • {blogData?.type || "Type"}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-3">
                  {blogData?.excerpt || "Blog excerpt will appear here..."}
                </div>
                <Badge
                  variant={
                    blogData?.status === "Published"
                      ? "default"
                      : blogData?.status === "Draft"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {blogData?.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
