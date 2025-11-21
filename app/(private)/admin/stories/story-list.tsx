"use client";

import { useState } from "react";
import {
  StoryWithTranslations,
  deleteStory,
  updateStory,
} from "./_actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StoryListProps {
  initialStories: StoryWithTranslations[];
}

export function StoryList({ initialStories }: StoryListProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStory, setSelectedStory] =
    useState<StoryWithTranslations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    if (!selectedStory) return;
    setIsLoading(true);
    const result = await updateStory(selectedStory.id, formData);
    setIsLoading(false);
    if (result.success) {
      setIsEditOpen(false);
      setSelectedStory(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this story?")) return;
    const result = await deleteStory(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  const openEdit = (story: StoryWithTranslations) => {
    setSelectedStory(story);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100">
            Stories
          </h2>
          <p className="text-slate-400 mt-1">
            Manage your story chronicles and translations.
          </p>
        </div>
        <Link href="/admin/stories/new">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Create Story
          </Button>
        </Link>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-slate-800/50">
                <TableHead className="text-slate-400">Title</TableHead>
                <TableHead className="text-slate-400">Language</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Author</TableHead>
                <TableHead className="text-right text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialStories.map((story) => {
                // Find translation for current language or fallback to first one
                const translation = story.translations[0];
                const authorName =
                  story.author.translations[0]?.name || "Unknown";

                return (
                  <TableRow
                    key={story.id}
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium text-slate-200">
                      {translation?.title || "Untitled"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-slate-700 text-slate-400"
                      >
                        {translation?.language}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={story.isPublished ? "default" : "secondary"}
                        className={
                          story.isPublished
                            ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border-0"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700 border-0"
                        }
                      >
                        {story.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {authorName}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-slate-900 border-slate-800 text-slate-200"
                        >
                          <DropdownMenuItem
                            onClick={() => openEdit(story)}
                            className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(story.id)}
                            className="text-red-400 focus:bg-red-950/30 focus:text-red-300 cursor-pointer"
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {initialStories.length === 0 && (
                <TableRow className="border-slate-800">
                  <TableCell
                    colSpan={5}
                    className="text-center h-32 text-slate-500 hover:text-white transition-colors cursor-default"
                  >
                    No stories found. Create one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle>Edit Story</DialogTitle>
          </DialogHeader>
          {selectedStory && (
            <form action={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title" className="text-slate-200">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  name="title"
                  required
                  defaultValue={selectedStory.translations[0]?.title}
                  className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-slate-200">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  required
                  defaultValue={selectedStory.translations[0]?.description}
                  className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-coverImageUrl" className="text-slate-200">
                  Cover Image URL
                </Label>
                <Input
                  id="edit-coverImageUrl"
                  name="coverImageUrl"
                  defaultValue={selectedStory.coverImageUrl}
                  className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-language" className="text-slate-200">
                  Language
                </Label>
                <select
                  id="edit-language"
                  name="language"
                  defaultValue={selectedStory.translations[0]?.language}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="EN">English</option>
                  <option value="ES">Spanish</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-isPublished"
                  name="isPublished"
                  value="true"
                  defaultChecked={selectedStory.isPublished}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-violet-600 focus:ring-violet-600"
                />
                <Label htmlFor="edit-isPublished" className="text-slate-200">
                  Published
                </Label>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
