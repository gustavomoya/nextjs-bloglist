import { getUserByToken } from "@/app/services/users";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const headersList = await headers()
    const authorization = headersList.get('authorization')

    if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const user = await getUserByToken(token)

    if (!user) {
        return NextResponse.json(
            { error: "Invalid API token" },
            { status: 401 }
        );
    }

    return NextResponse.json(user);
}
