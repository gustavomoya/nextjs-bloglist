import { db } from "@/db";
import { readingList } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const createReadingList = async (blogId: number, userId: number) => {
  await db.insert(readingList).values({ blogId, userId, read: false });
}


export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: {
        columns: {
          id: true,
          author: true,
          title: true,
          url: true,
        },
      },
    },
  })
}

export const markBlogAsRead = async (itemId: number, userId: number) => {
  const [item] = await db.update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.id, itemId),
        eq(readingList.userId, userId)
      )).returning();

  return item ?? null;
}