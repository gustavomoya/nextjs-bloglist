import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", {length: 256}).notNull(),
  author: varchar("author", {length: 256}).notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
})
