"use server"

import { revalidatePath } from "next/cache";
import { markBlogAsRead } from "@/app/services/reading.list";
import { getCurrentUser } from "@/app/services/session";

export const markAsReadAction = async (formData: FormData) => {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Not logged in")
    }

    const itemId = formData.get("id") as string
    const userId = Number(formData.get("user_id") as string)

    if (userId != user.id) {
        throw new Error("Invalid action")
    }

    const item = await markBlogAsRead(Number(itemId), user.id);

    if (!item) {
        throw new Error("Reading list item not found");
    }

    revalidatePath(`/me`)
}