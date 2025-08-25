import { MainLayout } from "@/components/layout/main-layout";
import { NewBlogForm } from "./new-blog-form";
import { AIBlogCreator } from "./ai-blog-creator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Edit3 } from "lucide-react";

export default function NewBlogPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Blog Post</h1>
          <p className="text-muted-foreground">
            Choose how you'd like to create your blog post
          </p>
        </div>

        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Manual Editor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="mt-6">
            <AIBlogCreator />
          </TabsContent>

          <TabsContent value="manual" className="mt-6">
            <NewBlogForm />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
