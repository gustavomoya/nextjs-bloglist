"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <nav>
            <Link className="text-blue-500 hover:underline" href="/">home</Link>
            {" | "}
            <Link className="text-blue-500 hover:underline" href="/blogs">blogs</Link>
            {" | "}
            <Link className="text-blue-500 hover:underline" href="/users">users</Link>
            {" | "}
            {session ? (
                <>
                    <Link className="text-blue-500 hover:underline" href="/blogs/new">create new</Link>
                    {" | "}
                    <em>{session.user?.name} logged in</em>{" "}
                    <button className="text-blue-500 hover:underline" onClick={() => signOut()}>logout</button>
                </>
            ) : (
                <>
                    <Link className="text-blue-500 hover:underline" href="/login">login</Link>
                    {" | "}
                    <Link className="text-blue-500 hover:underline" href="/register">register</Link>
                </>
            )}
        </nav>
    )
}