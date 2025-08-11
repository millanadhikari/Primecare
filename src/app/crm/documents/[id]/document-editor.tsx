"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  ArrowLeft,
  Eye,
  Save,
  Plus,
  Type,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  AlignLeft,
  ImagePlus,
  PenTool,
  Upload,
  CheckSquare,
  Calendar,
  Clock,
  ChevronDown,
  Hash,
  Trash2,
  GripVertical,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { updateDocumentTemplate } from "@/app/lib/documentsApi";

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  properties?: Record<string, any>;
}

interface ElementType {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  defaultProps: Partial<FormElement>;
}

const elementTypes: ElementType[] = [
  {
    id: "headline",
    name: "Headline",
    icon: <Type className="h-4 w-4" />,
    type: "headline",
    defaultProps: { label: "Headline Text", properties: { size: "h2" } },
  },
  {
    id: "text",
    name: "Text",
    icon: <FileText className="h-4 w-4" />,
    type: "text",
    defaultProps: {
      label: "Text Content",
      properties: { content: "Enter your text here..." },
    },
  },
  {
    id: "image",
    name: "Image",
    icon: <ImageIcon className="h-4 w-4" />,
    type: "image",
    defaultProps: {
      label: "Image",
      properties: { src: "", alt: "Image description" },
    },
  },
  {
    id: "short-answer",
    name: "Short Answer",
    icon: <MessageSquare className="h-4 w-4" />,
    type: "input",
    defaultProps: {
      label: "Short Answer",
      placeholder: "Enter your answer...",
    },
  },
  {
    id: "long-answer",
    name: "Long Answer",
    icon: <AlignLeft className="h-4 w-4" />,
    type: "textarea",
    defaultProps: {
      label: "Long Answer",
      placeholder: "Enter detailed answer...",
    },
  },
  {
    id: "annotated-image",
    name: "Annotated Image",
    icon: <ImagePlus className="h-4 w-4" />,
    type: "annotated-image",
    defaultProps: { label: "Annotated Image", properties: { annotations: [] } },
  },
  {
    id: "signature",
    name: "Signature",
    icon: <PenTool className="h-4 w-4" />,
    type: "signature",
    defaultProps: { label: "Digital Signature" },
  },
  {
    id: "file-upload",
    name: "File Upload",
    icon: <Upload className="h-4 w-4" />,
    type: "file",
    defaultProps: {
      label: "Upload File",
      properties: { accept: "*/*", multiple: false },
    },
  },
  {
    id: "checkbox",
    name: "Checkbox",
    icon: <CheckSquare className="h-4 w-4" />,
    type: "checkbox",
    defaultProps: { label: "Checkbox Option" },
  },
  {
    id: "date-input",
    name: "Date Input",
    icon: <Calendar className="h-4 w-4" />,
    type: "date",
    defaultProps: { label: "Select Date" },
  },
  {
    id: "time-input",
    name: "Time Input",
    icon: <Clock className="h-4 w-4" />,
    type: "time",
    defaultProps: { label: "Select Time" },
  },
  {
    id: "dropdown",
    name: "Dropdown",
    icon: <ChevronDown className="h-4 w-4" />,
    type: "select",
    defaultProps: {
      label: "Select Option",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  },
  {
    id: "number-input",
    name: "Number Input",
    icon: <Hash className="h-4 w-4" />,
    type: "number",
    defaultProps: { label: "Enter Number", placeholder: "0" },
  },
];

interface DocumentEditorProps {
  template: {
    title: string;
  };
}

export function DocumentEditor({ template }) {
  const router = useRouter();
  const [documentTitle, setDocumentTitle] = useState(template.name);
  const [formElements, setFormElements] = useState<FormElement[]>(
    template.fields || []
  );
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;

      // Adding new element from sidebar
      if (
        source.droppableId === "elements-sidebar" &&
        destination.droppableId === "form-builder"
      ) {
        const elementType = elementTypes[source.index];
        const newElement: FormElement = {
          id: `${elementType.type}-${Date.now()}`,
          type: elementType.type,
          label: elementType.defaultProps.label || elementType.name,
          placeholder: elementType.defaultProps.placeholder,
          required: false,
          options: elementType.defaultProps.options,
          properties: elementType.defaultProps.properties,
        };

        const newElements = [...formElements];
        newElements.splice(destination.index, 0, newElement);
        setFormElements(newElements);
        toast.success(`${elementType.name} added to form`);
        return;
      }

      // Reordering existing elements
      if (
        source.droppableId === "form-builder" &&
        destination.droppableId === "form-builder"
      ) {
        const newElements = Array.from(formElements);
        const [reorderedElement] = newElements.splice(source.index, 1);
        newElements.splice(destination.index, 0, reorderedElement);
        setFormElements(newElements);
      }
    },
    [formElements]
  );

  const updateElement = (id: string, updates: Partial<FormElement>) => {
    setFormElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    setFormElements((elements) => elements.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
    toast.success("Element deleted");
  };

  const renderFormElement = (
    element: FormElement,
    index: number,
    isPreview = false
  ) => {
    const isSelected = selectedElement === element.id && !isPreview;

    const elementContent = () => {
      switch (element.type) {
        case "headline":
        //   const HeadingTag = (element.properties?.size || "h2") as keyof JSX.IntrinsicElements;
        //   return <HeadingTag className="font-bold">{element.label}</HeadingTag>;

        case "text":
          return (
            <p className="text-sm text-muted-foreground">
              {element.properties?.content || element.label}
            </p>
          );

        case "image":
          return (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {element.properties?.alt || "Image placeholder"}
              </p>
            </div>
          );

        case "input":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <Input placeholder={element.placeholder} disabled={isPreview} />
            </div>
          );

        case "textarea":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                placeholder={element.placeholder}
                disabled={isPreview}
              />
            </div>
          );

        case "select":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <Select disabled={isPreview}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {element.options?.map((option, idx) => (
                    <SelectItem key={idx} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );

        case "checkbox":
          return (
            <div className="flex items-center space-x-2">
              <Checkbox disabled={isPreview} />
              <Label>{element.label}</Label>
            </div>
          );

        case "date":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <Input type="date" disabled={isPreview} />
            </div>
          );

        case "time":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <Input type="time" disabled={isPreview} />
            </div>
          );

        case "number":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type="number"
                placeholder={element.placeholder}
                disabled={isPreview}
              />
            </div>
          );

        case "file":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
              </div>
            </div>
          );

        case "signature":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <PenTool className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to sign</p>
              </div>
            </div>
          );

        case "annotated-image":
          return (
            <div className="space-y-2">
              <Label>
                {element.label}{" "}
                {element.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload image for annotation
                </p>
              </div>
            </div>
          );

        default:
          return <div>Unknown element type</div>;
      }
    };

    if (isPreview) {
      return (
        <div key={element.id} className="mb-4">
          {elementContent()}
        </div>
      );
    }

    return (
      <Draggable key={element.id} draggableId={element.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`group relative rounded-lg border p-4 mb-2 transition-all ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            } ${snapshot.isDragging ? "shadow-lg" : ""}`}
            onClick={() => setSelectedElement(element.id)}
          >
            <div className="flex items-start gap-2">
              <div
                {...provided.dragHandleProps}
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">{elementContent()}</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                >
                  <Settings className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const selectedElementData = formElements.find(
    (el) => el.id === selectedElement
  );

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No auth token");

    try {
      const fields = formElements.map((element) => ({
        id: element.id,
        type: element.type,
        label: element.label,
        placeholder: element.placeholder,
        required: element.required || false,
        options: element.options || [],
        properties: element.properties || {},
      }));

      if (!documentTitle.trim()) {
        toast.error("Document title cannot be empty");
        return;
      }
      const templateData = {
        name: documentTitle,
        description: template.description || "",
        fields: fields,
      };

      // Call API to save template
      // Assuming saveDocumentTemplate is a function that handles the API call
      const res = await updateDocumentTemplate(
        template.id,
        templateData,
        token
      );

      toast.success("Document template saved successfully");
    } catch (error) {
      console.error("Failed to save template:", error);
      toast.error("Failed to save template");
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <Input
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                />
                <p className="text-sm text-muted-foreground">
                  {template.description || "Document description"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="mr-2 h-4 w-4" />
                {isPreviewMode ? "Edit" : "Preview"}
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Left Sidebar - Form Elements */}
          {!isPreviewMode && (
            <div className="w-80 border-r bg-card">
              <div className="p-4">
                <h3 className="font-semibold mb-4">Form Elements</h3>
                <Droppable droppableId="elements-sidebar" isDropDisabled={true}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
                    >
                      {elementTypes.map((elementType, index) => (
                        <Draggable
                          key={elementType.id}
                          draggableId={elementType.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all ${
                                snapshot.isDragging
                                  ? "shadow-lg border-primary bg-primary/5"
                                  : "hover:border-primary/50 hover:bg-accent"
                              }`}
                            >
                              {elementType.icon}
                              <span className="text-sm font-medium">
                                {elementType.name}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Form Builder */}
            <div className="flex-1 p-6">
              <ScrollArea className="h-full">
                {isPreviewMode ? (
                  <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>{documentTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {formElements.map((element, index) =>
                        renderFormElement(element, index, true)
                      )}
                      {formElements.length === 0 && (
                        <div className="text-center py-12">
                          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            No elements added yet
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    <Droppable droppableId="form-builder">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[400px] rounded-lg border-2 border-dashed p-6 transition-colors ${
                            snapshot.isDraggingOver
                              ? "border-primary bg-primary/5"
                              : "border-muted-foreground/25"
                          }`}
                        >
                          {formElements.length === 0 ? (
                            <div className="text-center py-12">
                              <Plus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                              <p className="text-lg font-medium mb-2">
                                Start Building Your Form
                              </p>
                              <p className="text-muted-foreground">
                                Drag elements from the sidebar to create your
                                document template
                              </p>
                            </div>
                          ) : (
                            formElements.map((element, index) =>
                              renderFormElement(element, index)
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Right Sidebar - Element Properties */}
            {!isPreviewMode && selectedElementData && (
              <div className="w-80 border-l bg-card">
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Element Properties</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={selectedElementData.label}
                        onChange={(e) =>
                          updateElement(selectedElement!, {
                            label: e.target.value,
                          })
                        }
                      />
                    </div>

                    {selectedElementData.type === "input" ||
                    selectedElementData.type === "textarea" ||
                    selectedElementData.type === "number" ? (
                      <div>
                        <Label>Placeholder</Label>
                        <Input
                          value={selectedElementData.placeholder || ""}
                          onChange={(e) =>
                            updateElement(selectedElement!, {
                              placeholder: e.target.value,
                            })
                          }
                        />
                      </div>
                    ) : null}

                    {selectedElementData.type === "select" && (
                      <div>
                        <Label>Options (one per line)</Label>
                        <Textarea
                          value={selectedElementData.options?.join("\n") || ""}
                          onChange={(e) =>
                            updateElement(selectedElement!, {
                              options: e.target.value
                                .split("\n")
                                .filter(Boolean),
                            })
                          }
                        />
                      </div>
                    )}

                    {selectedElementData.type === "headline" && (
                      <div>
                        <Label>Heading Size</Label>
                        <Select
                          value={selectedElementData.properties?.size || "h2"}
                          onValueChange={(value) =>
                            updateElement(selectedElement!, {
                              properties: {
                                ...selectedElementData.properties,
                                size: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="h1">Heading 1</SelectItem>
                            <SelectItem value="h2">Heading 2</SelectItem>
                            <SelectItem value="h3">Heading 3</SelectItem>
                            <SelectItem value="h4">Heading 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {selectedElementData.type === "text" && (
                      <div>
                        <Label>Content</Label>
                        <Textarea
                          value={selectedElementData.properties?.content || ""}
                          onChange={(e) =>
                            updateElement(selectedElement!, {
                              properties: {
                                ...selectedElementData.properties,
                                content: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedElementData.required || false}
                        onCheckedChange={(checked) =>
                          updateElement(selectedElement!, {
                            required: !!checked,
                          })
                        }
                      />
                      <Label>Required field</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
