import Image from "next/image";
import { getBlogs } from "../services/blogs";

const blogs = getBlogs()


export default function Home() {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            {blog.title} by <strong>{blog.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
