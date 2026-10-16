"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, incrLike } from "../services/blogs"
import { auth } from "@/auth"

type BlogValues = {
  title: string
  author: string
  url: string
}

type BlogErrors = {
  title?: string
  author?: string
  url?: string
}

export type BlogFormState = {
  errors: BlogErrors
  values: BlogValues,
  success: boolean
}


export const createBlog = async (prevState: BlogFormState , formData: FormData): Promise<BlogFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = 0;

  const values: BlogValues = { title, author, url };
  const errors: BlogErrors = {}

  if (!title.trim() || title.trim().length < 5) {
     errors.title = "The title must be at least 5 characters long"   
  }

  if (!author.trim() || author.trim().length < 5) { 
    errors.author = "The author must be at least 5 characters long" 
  }

  if (!url.trim() || url.trim().length < 5) { 
    errors.url = "The URL must be at least 5 characters long" 
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values,
      success: false,
    }
  }

  await addBlog(title, author, url, likes)

  revalidatePath("/blogs")
  return { errors, values, success: true }
}

export const addLike = async (formData: FormData) => {
  const id = formData.get("id") as string

  await incrLike(Number(id));

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
