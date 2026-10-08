import { desc, eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

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
  await db.insert(blogs).values({ title, author, url, likes });
}

export const getBlogById = async (id: number) => {
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