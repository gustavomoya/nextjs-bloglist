import { desc, eq, ilike, sql } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import { getCurrentUser } from "./session"
import { createReadingList } from "./reading.list"

export const getBlogs = async (title?: string) => {
  if (title) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${title}%`),
      orderBy: desc(blogs.likes),
    })
  }

  return db.query.blogs.findMany({
    orderBy: desc(blogs.likes),
  })
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const [blog] = await db.insert(blogs).values({ title, author, url, likes, userId: user.id }).returning();

  await createReadingList(blog.id, user.id);
}

export const getBlogById = async (id: number) => {
  const user = await getCurrentUser()

  if (user) {
    return db.query.blogs.findFirst({
      where: eq(blogs.id, id),
      with: {
        readingList: {
          where: eq(readingList.userId, Number(user.id)),
        },
      },
    })
  }

  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const incrLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db.update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
}