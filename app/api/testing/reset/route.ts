import { db } from "@/db";
import { blogs, readingList, users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest) {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }

    try {

        // console.log('removing data')

        await db.delete(readingList);
        await db.delete(blogs);
        await db.delete(users);

        return NextResponse.json(
            { message: "All data has been deleted" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Failed to reset database:", error);

        return NextResponse.json(
            { error: "Could not reset database" },
            { status: 500 },
        );
    }
}
