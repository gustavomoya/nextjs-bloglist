import { desc, eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

export const getUsers = async () => {
    return db.query.users.findMany({
        orderBy: desc(users.id),
    })
}

export const getUserById = async (id: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, id)
    })
}

export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true },
    })
}

export const getUserByToken = async (token: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.token, token),
        columns: {
            id: true,
            username: true,
            name: true,
        },
        with: {
            blogs: {
                columns: {
                    author: true,
                    title: true,
                    url: true,
                },
            },
        },
    });

    if (!user) return null;

    const { blogs, ...userData } = user;

    return {
        ...userData,
        createdBlogs: blogs,
    };
}

export const saveToken = async (id: number, token: string) => {
    const user = await getUserById(id)
    if (user) {
        await db.update(users)
            .set({ token: token })
            .where(eq(users.id, id));
    }
}