import Link from "next/link";
import { getBlogs } from "@/app/services/blogs"

export default async function BlogListPage({
    filter,
}: {
    filter?: string
}) {

    const blogs = await getBlogs(filter)

    return (
        <ul className="mt-5 space-y-2">
            {blogs.map(blog => (
                <li
                    key={blog.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                    <div className="min-w-0">
                        <Link
                            className="font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                            href={`/blogs/${blog.id}`}
                        >
                            {blog.title}
                        </Link>

                        <p className="mt-1 text-sm text-gray-500">
                            by {blog.author}
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
                        {blog.likes} likes
                    </span>
                </li>
            ))}
        </ul>
    );
}