import { getUserByUsername } from "@/app/services/users";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }

    try {

        const body = await request.json();
        const { username, name, password } = body;

        if (
            typeof username !== "string" ||
            typeof name !== "string" ||
            typeof password !== "string" ||
            username.trim().length < 4 ||
            password.length < 4 ||
            !name.trim()
        ) {
            return NextResponse.json(
                {
                    error:
                        "Username and password must have at least 4 characters, and name is required",
                },
                { status: 400 },
            );
        }

        const existingUser = await getUserByUsername(username)

        if (existingUser) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 409 },)
        }


        const passwordHash = await bcrypt.hash(password, 10)

        const [user] = await db.insert(users).values({ username, name, passwordHash }).returning({
            id: users.id,
            username: users.username,
            name: users.name,
        })

        return NextResponse.json(user, { status: 201 });

    } catch (error) {
        console.error("Failed to create test user:", error);

        return NextResponse.json(
            { error: "Could not create user" },
            { status: 500 },
        );
    }
}
