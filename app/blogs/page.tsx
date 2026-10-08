import Link from "next/link"
import { getBlogs } from "../services/blogs";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {

  const { filter } = await searchParams

  const blogs = await getBlogs(filter)

  return (
    <div>
      <h2>Blogs</h2>
      <form method="GET" action="/blogs" className="w-full min-w-0 xl:w-1/6  rounded pt-6">
        <div className="mb-2 flex justify-items-start">
          <input type="text"
            name="filter"
            defaultValue={filter ?? ""}
            placeholder="Search by title" className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Search
          </button>
        </div>
      </form>
      <ul className="mt-5">
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link className="font-medium text-blue-500 pr-2" href={`/blogs/${blog.id}`}>{blog.title}</Link>
            by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
