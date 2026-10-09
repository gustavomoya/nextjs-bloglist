import { relations } from "drizzle-orm"
import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", {length: 256}).notNull(),
  author: varchar("author", {length: 256}).notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").notNull().references(() => users.id),
})

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}))

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}))
