"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Edit3,
  Eye,
  Save,
  Wand2,
  Image as ImageIcon,
  Plus,
  X,
  Check,
  Download,
  Upload,
  Copy,
  RotateCcw,
  Zap,
  Brain,
  Loader2,
  ChevronRight,
  ChevronDown,
  Replace,
  Shuffle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Interfaces
interface AIGenerationState {
  isGenerating: boolean;
  stage: "content" | "images" | "complete" | null;
  progress: number;
  message: string;
}

interface NewBlogData {
  title: string;
  author: string;
  type: string;
  status: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imagePublicId: string;
  publishDate: Date | undefined;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

export function AIBlogCreator() {
  const router = useRouter();

  const [step, setStep] = useState<"input" | "generating" | "editing">("input");
  const [newBlogData, setNewBlogData] = useState<NewBlogData>({
    title: "",
    author: "",
    type: "AI Generated",
    status: "Draft",
    excerpt: "",
    content: "",
    featuredImage: "",
    imagePublicId: "",
    publishDate: undefined,
    tags: [],
    metaTitle: "",
    metaDescription: "",
    slug: "",
  });

  const [generationState, setGenerationState] = useState<AIGenerationState>({
    isGenerating: false,
    stage: null,
    progress: 0,
    message: "",
  });

  const [editedContent, setEditedContent] = useState("");
  const [isRegeneratingImages, setIsRegeneratingImages] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Generate blog post mock
  const generateWithAI = async () => {
    if (!newBlogData.title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }
    if (!newBlogData.author.trim()) {
      toast.error("Please enter an author name");
      return;
    }

    setStep("generating");
    setGenerationState({
      isGenerating: true,
      stage: "content",
      progress: 0,
      message: "Analyzing your request...",
    });

    setNewBlogData((data) => ({ ...data, status: "Generating" }));

    try {
      await new Promise((r) => setTimeout(r, 1000));
      setGenerationState((s) => ({
        ...s,
        progress: 25,
        message: "Generating content...",
      }));
      await new Promise((r) => setTimeout(r, 1500));
      setGenerationState((s) => ({
        ...s,
        stage: "images",
        progress: 60,
        message: "Generating featured image...",
      }));
      await new Promise((r) => setTimeout(r, 1000));
      setGenerationState((s) => ({
        ...s,
        progress: 80,
        message: "Generating tags and metadata...",
      }));
      await new Promise((r) => setTimeout(r, 1000));
      setGenerationState((s) => ({
        ...s,
        progress: 100,
        stage: "complete",
        message: "Finalizing blog post...",
      }));

      const now = new Date();
      const newSlug = newBlogData.title.toLowerCase().replace(/\s+/g, "-");
      const generated: NewBlogData = {
        title: newBlogData.title,
        author: newBlogData.author.trim() || "Unknown Author",
        type: newBlogData.type,
        status: "Draft",
        excerpt: `A comprehensive guide to ${newBlogData.title.toLowerCase()} with valuable insights.`,
        content: `
          <h2>Introduction</h2>
          <p>This comprehensive guide on ${newBlogData.title.toLowerCase()} offers you practical information and key insights.</p>
          <h3>Main Benefits</h3>
          <ul>
            <li>Improved understanding</li>
            <li>Better decision making</li>
            <li>Efficient planning</li>
          </ul>
          <h3>Conclusion</h3>
          <p>By applying these insights, you’ll be equipped to handle challenges confidently.</p>
        `,
        featuredImage:
          "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
        imagePublicId: "pexels-photo-3184465",
        publishDate: now,
        tags: ["Healthcare", "Guide", "Professional"],
        metaTitle: `${newBlogData.title} - Comprehensive Guide`,
        metaDescription: `Explore the complete guide on ${newBlogData.title} with practical advice and key strategies.`,
        slug: newSlug,
      };

      setNewBlogData(generated);
      setEditedContent(generated.content);
      setStep("editing");
      toast.success("Blog post generated!");
    } catch {
      toast.error("Failed to generate blog post");
      setNewBlogData((data) => ({ ...data, status: "Draft" }));
      setStep("input");
    } finally {
      setGenerationState({ isGenerating: false, stage: null, progress: 0, message: "" });
    }
  };

  // Regenerate content only
  const regenerateContent = async () => {
    setGenerationState({
      isGenerating: true,
      stage: "content",
      progress: 0,
      message: "Regenerating content...",
    });
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const updatedContent = `
        <h2>Updated Overview of ${newBlogData.title}</h2>
        <p>Fresh insights and actionable guidelines on ${newBlogData.title.toLowerCase()}.</p>
      `;
      setEditedContent(updatedContent);
      setNewBlogData((data) => ({ ...data, content: updatedContent }));
      toast.success("Content regenerated!");
    } finally {
      setGenerationState({ isGenerating: false, stage: null, progress: 0, message: "" });
    }
  };

  // Regenerate featured image and tags
  const regenerateImages = async () => {
    setIsRegeneratingImages(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const newImageUrl =
        "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200";
      const newImageId = "pexels-photo-3184298";
      const newTags = ["Innovation", "Healthcare", "AI"];
      setNewBlogData((data) => ({
        ...data,
        featuredImage: newImageUrl,
        imagePublicId: newImageId,
        tags: newTags,
      }));
      toast.success("Featured image and tags regenerated!");
    } finally {
      setIsRegeneratingImages(false);
    }
  };

  // Save & Publish handler
  const handleSaveAndPublish = async () => {
    try {
      const blogToSave = {
        ...newBlogData,
        content: editedContent,
        status: "Published",
        publishDate: new Date(),
      };
      console.log("Saving blog post:", blogToSave);
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Blog published successfully!");
      router.push("/blogs");
    } catch {
      toast.error("Failed to save blog post");
    }
  };

  // Back navigation handler
  const handleBack = () => {
    if (step === "editing" && editedContent !== newBlogData.content) {
      if (confirm("You have unsaved changes. Are you sure you want to go back?")) {
        router.push("/blogs");
      }
    } else {
      router.push("/blogs");
    }
  };

  // Render based on step

  if (step === "input") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create with AI
              </h1>
              <p className="text-muted-foreground">Let AI help you write amazing blog posts</p>
            </div>
          </div>

          {/* Main Creation Interface */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">What would you like to write about?</CardTitle>
                <p className="text-muted-foreground">
                  Provide a title, author, and brief description, and our AI will create a complete blog post for you
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Blog Post Title *
                  </Label>
                  <Input
                    id="title"
                    value={newBlogData.title}
                    onChange={(e) => setNewBlogData({ ...newBlogData, title: e.target.value })}
                    placeholder="e.g., Understanding NDIS Support Coordination"
                    className="text-lg h-12 border-2 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author" className="text-base font-medium">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    value={newBlogData.author}
                    onChange={(e) => setNewBlogData({ ...newBlogData, author: e.target.value })}
                    placeholder="Author name"
                    className="text-lg h-12 border-2 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-base font-medium">
                    What's this post about?
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={newBlogData.excerpt}
                    onChange={(e) => setNewBlogData({ ...newBlogData, excerpt: e.target.value })}
                    placeholder="Write a brief excerpt or description of your blog post..."
                    className="min-h-[120px] border-2 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={newBlogData.type}
                      onValueChange={(value) => setNewBlogData({ ...newBlogData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI Generated">AI Generated</SelectItem>
                        <SelectItem value="Guest Post">Guest Post</SelectItem>
                        <SelectItem value="Editorial">Editorial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={newBlogData.status}
                      onValueChange={(value) => setNewBlogData({ ...newBlogData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={generateWithAI}
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    disabled={!newBlogData.title.trim() || !newBlogData.author.trim()}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate with AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (step === "generating") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <Loader2 className="h-10 w-10 text-white animate-spin" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Creating Your Blog Post</h2>
                    <p className="text-muted-foreground">{generationState.message}</p>
                  </div>

                  <div className="space-y-3">
                    <Progress value={generationState.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{generationState.progress}% Complete</p>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          generationState.stage === "content"
                            ? "bg-blue-500 animate-pulse"
                            : generationState.progress > 25
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      Content
                    </div>
                    <ChevronRight className="h-4 w-4" />
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          generationState.stage === "images"
                            ? "bg-blue-500 animate-pulse"
                            : generationState.progress > 60
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      Images
                    </div>
                    <ChevronRight className="h-4 w-4" />
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          generationState.stage === "complete" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      Complete
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (step === "editing") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{newBlogData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{newBlogData.author}</span>
                  <span>•</span>
                  <span>{newBlogData.type}</span>
                  <span>•</span>
                  <span>{newBlogData.status}</span>
                  <span>•</span>
                  <span>{newBlogData.tags.join(", ")}</span>
                  <Badge variant="outline" className="ml-2">
                    {newBlogData.publishDate?.toLocaleDateString() ?? "Unpublished"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="mr-2 h-4 w-4" />
                {previewMode ? "Edit" : "Preview"}
              </Button>
              <Button onClick={handleSaveAndPublish}>
                <Save className="mr-2 h-4 w-4" />
                Save & Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Main Content */}
          <div className="flex-1 flex">
            {previewMode ? (
              <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                  <article className="prose prose-lg dark:prose-invert max-w-none">
                    {newBlogData.featuredImage && (
                      <div className="mb-8">
                        <img
                          src={newBlogData.featuredImage}
                          alt="Featured Image"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h1>{newBlogData.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: editedContent }}
                      className="prose-img:rounded-lg prose-img:shadow-md"
                    />
                  </article>
                </div>
              </div>
            ) : (
              <div className="flex-1 p-6 max-w-4xl mx-auto space-y-6">
                {/* Content Editor */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5" />
                      Content Editor
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={regenerateContent}
                      disabled={generationState.isGenerating}
                    >
                      {generationState.isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Regenerate Content
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                      placeholder="Edit your blog content here..."
                    />
                  </CardContent>
                </Card>

                {/* Featured Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Featured Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {newBlogData.featuredImage ? (
                        <div className="relative group">
                          <img
                            src={newBlogData.featuredImage}
                            alt="Featured Image"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button variant="secondary" size="sm">
                              <Replace className="mr-2 h-4 w-4" />
                              Replace
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p>No featured image set.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Tags and Meta Info */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Tags & Metadata
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={regenerateImages}
                      disabled={isRegeneratingImages}
                    >
                      {isRegeneratingImages ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Shuffle className="mr-2 h-4 w-4" />
                      )}
                      Regenerate Image & Tags
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {newBlogData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Meta Title</Label>
                        <Input
                          value={newBlogData.metaTitle}
                          onChange={(e) => setNewBlogData({ ...newBlogData, metaTitle: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label>Meta Description</Label>
                        <Textarea
                          value={newBlogData.metaDescription}
                          onChange={(e) => setNewBlogData({ ...newBlogData, metaDescription: e.target.value })}
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sidebar - AI Controls */}
            {!previewMode && (
              <div className="w-80 border-l bg-card">
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      AI Assistant
                    </h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={regenerateContent}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Content
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={regenerateImages}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Regenerate Image & Tags
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Improve SEO
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Content
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Export as PDF
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Start Over
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}