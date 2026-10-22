import { db } from "@/db";
import { readingList } from "@/db/schema";

export const createReadingList = async (blogId: number, userId: number) => {
  await db.insert(readingList).values({ blogId, userId, read: false });
}