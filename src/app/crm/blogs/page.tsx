"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Filter,
  Trash2,
  MoreVertical,
  ExternalLink,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { get } from "http";
import { createBlog, deleteBlog, getBlogs } from "@/app/lib/blogApi";
import { set } from "date-fns";
import { SkeletonRow } from "@/components/layout/SkeletonRow";

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setLoading(true);
    try {
      const data = await getBlogs(token, {
        searchQuery,
        statusFilter: statusFilter,
        type: typeFilter === "All" ? "" : typeFilter,
        page: currentPage,
        limit: recordsPerPage,
      });
      console.log("Fetched blogs:", data);
      setBlogs(data?.data?.blogs);
      setLoading(false); // For demo purposes, using static data
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      toast.error("Failed to load blogs");
    }
  };
  const handleDeleteBlog = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Missing access token");
      return;
    }
    try {
      await deleteBlog(token, id);
      setBlogs((prevBlogs) => prevBlogs?.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
      return;
    }
  };

  const handleDuplicateBlog = async (blog) => {
    console.log("Duplicating blog:", blog);
    // if (
    //   !blog.title ||
    //   !blog.author ||
    //   !blog.content ||
    //   !blog.excerpt
    // ) {
    //   toast.error(
    //     "Please fill in all required fields (Title, Author, Content, Excerpt)"
    //   );
    //   return;
    // }

    try {
      const { id, createdAt, updatedAt, ...rest } = blog;
      const duplicateData = {
        ...rest,
        title: `${blog.title} (Copy)`,
        slug: `${blog.slug}-copy-${Date.now()}`, // make slug unique
        status: "Draft", // default to draft,
        excerpt: blog.excerpt || "No excerpt provided",
        content: blog.content || "<p>No content provided</p>",
        metaTitle: blog.metaTitle || `${blog.title} - Copy`,
        metaDescription: blog.metaDescription || `Copy of ${blog.title}`,
        publishDate: new Date().toISOString(), // fresh timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token");

      console.log("Duplicating blog with data:", duplicateData);

      await createBlog(duplicateData, token);

      toast.success("Blog duplicated successfully");
      fetchBlogs();
      router.push("/crm/blogs");
    } catch (error) {
      toast.error("Failed to duplicate blog. Please try again.");
      console.error("Error duplicating blog:", error);
    } finally {
    }
  };

  // Filter and search logic
  const filteredBlogs = useMemo(() => {
    return blogs?.filter((blog) => {
      const matchesSearch =
        (blog?.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog?.author ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (blog?.excerpt ?? "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || blog?.status === statusFilter;
      const matchesType = typeFilter === "All" || blog?.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [blogs, searchQuery, statusFilter, typeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs?.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentBlogs = filteredBlogs?.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === "status") {
      setStatusFilter(value);
    } else if (filterType === "type") {
      setTypeFilter(value);
    }
  };

  const handleRecordsPerPageChange = (value: string) => {
    setRecordsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddNewBlog = () => {
    router.push("/crm/blogs/new");
  };

  const formatDate = (dateString: string) => {
    console.log("Formatting date:", dateString);
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "default";
      case "Draft":
        return "secondary";
      case "Scheduled":
        return "outline";
      default:
        return "outline";
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, statusFilter, typeFilter, currentPage, recordsPerPage]);
  return (
    <MainLayout>
      <PageHeader
        title="Blog Management"
        description="Create, manage, and publish blog posts for your audience."
      >
        <Button onClick={handleAddNewBlog}>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <Input
                  placeholder="Search blogs..."
                  className="w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={typeFilter}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
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
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Published
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Views
                    </TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading
                    ? // Render 5 skeleton rows
                      Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    : currentBlogs?.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell>
                            <div className="flex  space-x-3">
                              <div className="rounded-full h-20 w-12 flex-shrink-0">
                                {blog?.featuredImage && (
                                  <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-32 h-12 rounded-full object-cover mx-auto"
                                  />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{blog.title}</div>
                                <div className="text-sm text-muted-foreground line-clamp-1">
                                  {blog.excerpt}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {/* <Avatar className="h-6 w-6">
                            <AvatarImage src={blog.authorAvatar} />
                            <AvatarFallback className="text-xs">
                              {blog.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar> */}
                              <span className="text-sm">{blog.author}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {blog.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(blog.status)}>
                              {blog.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(blog.publishedDate)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {blog?.views?.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(`/crm/blogs/${blog.id}`)
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(`/crm/blogs/${blog.id}/edit`)
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDuplicateBlog(blog)}
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteBlog(blog.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredBlogs?.length)} of{" "}
                  {filteredBlogs?.length} items
                </span>
                <Select
                  value={recordsPerPage.toString()}
                  onValueChange={handleRecordsPerPageChange}
                >
                  <SelectTrigger className="w-[80px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>records per page</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current page
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
