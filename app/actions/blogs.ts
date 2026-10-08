"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, incrLike } from "../services/blogs"


export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes =  0;
  
  await addBlog(title, author, url, likes)
  
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const addLike = async(formData: FormData) => {
  const id = formData.get("id") as string

  await incrLike(Number(id));
  
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
