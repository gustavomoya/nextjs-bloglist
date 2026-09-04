import Image from "next/image";
import Link from "next/link"
import { getBlogs } from "../services/blogs";

const blogs = getBlogs()


export default function Home() {
  return (
    <div>
      <h2>Blogs</h2>
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
