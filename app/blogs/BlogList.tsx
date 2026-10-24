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
                <li key={blog.id}>
                    <Link className="text-blue-600 hover:underline pr-2" href={`/blogs/${blog.id}`}>{blog.title}</Link>
                    by {blog.author}
                </li>
            ))}
        </ul>
    );
}