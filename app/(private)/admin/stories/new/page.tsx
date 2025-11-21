'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createStory } from '../_actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewStoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    const result = await createStory(formData)

    if (result.success) {
      router.push('/admin/stories')
      router.refresh()
    } else { 
      setError(result.error || 'Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/stories">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Create New Story</h1>
          <p className="text-slate-400">Start a new chronicle adventure.</p>
        </div>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Story Details</CardTitle>
          <CardDescription className="text-slate-400">
            Enter the basic information for your story. You can add scenes and decisions later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <fieldset disabled={isLoading} className="space-y-6 transition-opacity disabled:opacity-70">
              <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">Title</Label>
              <Input 
                id="title" 
                name="title" 
                required 
                placeholder="The Lost Kingdom" 
                className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-200">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                required 
                placeholder="A brief summary of the story..." 
                className="min-h-[120px] bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-slate-200">Story Type</Label>
                <Select name="type" defaultValue="STATIC">
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-100">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                    <SelectItem value="STATIC">Static (Hand-written)</SelectItem>
                    <SelectItem value="DYNAMIC_AI">Dynamic (AI Generated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-slate-200">Language</Label>
                <Select name="language" defaultValue="EN">
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-100">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="ES">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-slate-200">Cover Image</Label>
              <Input 
                id="coverImage" 
                name="coverImage" 
                type="file"
                accept="image/*"
                className="bg-slate-950 border-slate-800 text-slate-100 file:text-slate-100 file:bg-slate-800 file:border-0 file:mr-4 file:py-2 file:px-4 hover:file:bg-slate-700"
              />
              <p className="text-xs text-slate-500">Upload a cover image (optional).</p>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-950/30 border border-red-900/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <Link href="/admin/stories">
                <Button variant="ghost" type="button" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-violet-600 hover:bg-violet-700 text-white min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Story'
                )}
              </Button>
            </div>
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
