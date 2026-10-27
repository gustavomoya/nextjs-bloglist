import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/services/session";
import { generateToken } from "@/app/actions/users"
import { getReadingList } from "../services/reading.list";
import { markAsReadAction } from "@/app/actions/reading.list";

export default async function ProfilePage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const readingList = await getReadingList(user.id);

    const unreadBlogs = readingList.filter(
        (reading) => !reading.read
    );

    const readBlogs = readingList.filter(
        (reading) => reading.read
    );

    return (
        <div className="mx-auto w-full max-w-2xl p-6 lg:px-10">
            <div className="mb-8">
                <h2 data-testid="user-profile" className="text-2xl font-bold mb-8">My Profile</h2>
                <p data-testid="user-name" className="text-gray-500 mb-4">Name: {user.name}</p>
                <p data-testid="user-username" className="text-gray-500 mb-4">Username: {user.username}</p>

                <hr className="border-gray-300 border"/>
            </div>


            <div className="mb-8" data-testid="reading-list-section">
                <h3 className="text-xl font-bold mt-4 mb-2">
                    Reading List
                </h3>

                {readingList.length === 0 && (
                    <p
                        data-testid="empty-reading-list"
                        className="text-gray-500"
                    >
                        Your reading list is empty.
                    </p>
                )}

                {unreadBlogs.length > 0 ? (
                    <div data-testid="unread-section">
                        <h4 className="text-lg font-semibold mt-4 mb-2">
                            Unread ({unreadBlogs.length})
                        </h4>

                        <ul>
                            {unreadBlogs.map((reading) => (
                                <li
                                    key={reading.id}
                                    className="flex justify-between rounded p-3 bg-gray-50 hover:bg-gray-100 mb-2"
                                >
                                    <Link
                                        className="text-blue-600 hover:underline pr-2"
                                        href={`/blogs/${reading.blog.id}`}
                                    >
                                        {reading.blog.title}
                                    </Link>

                                    <form action={markAsReadAction}>
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={reading.id}
                                        />

                                        <input
                                            type="hidden"
                                            name="user_id"
                                            value={user.id}
                                        />

                                        <button
                                            type="submit"
                                            data-testid={`mark-read-${reading.id}`}
                                            className="bg-green-500 hover:bg-green-700 text-white text-sm py-2 px-2 rounded"
                                        >
                                            Mark as read
                                        </button>
                                    </form>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p
                        data-testid="no-unread-blogs"
                        className="text-gray-500"
                    >
                        No unread blogs.
                    </p>
                )}

                {readBlogs.length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold mt-4 mb-2">
                            Read ({readBlogs.length})
                        </h4>

                        <ul>
                            {readBlogs.map((reading) => (
                                <li
                                    key={reading.id}
                                    className="rounded p-3 bg-gray-50 hover:bg-gray-100 mb-2"
                                >
                                    <Link
                                        className="text-blue-600 hover:underline pr-2"
                                        href={`/blogs/${reading.blog.id}`}
                                    >
                                        {reading.blog.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <hr className="border-gray-300 border"/>

            <div data-testid="api-token-section">
                <h3 className="text-xl font-bold mt-4 mb-2">API TOKEN</h3>

                <div
                    data-testid="token-display"
                    className="mb-4 pt-2 pb-4 bg-gray-100"
                >
                    <p className="px-2">Current token:</p>

                    {user.token ? (
                        <code
                            data-testid="api-token"
                            className="block mx-2 px-2 bg-gray-200 font-semibold text-gray-700 break-all"
                        >
                            {user.token}
                        </code>
                    ) : (
                        <p
                            data-testid="no-token-message"
                            className="mx-2 px-2 bg-gray-200 font-semibold text-gray-700"
                        >
                            No token has been generated yet
                        </p>
                    )}
                </div>


                <form action={generateToken}>
                    <input type="hidden" name="id" value={user.id}/>
                    <button type="submit"
                            data-testid="generate-token-button"
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Generate New Token
                    </button>
                </form>
            </div>

        </div>
    )
}