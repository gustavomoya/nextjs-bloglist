
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = getBlogById(id)

  if (!blog) {
    notFound()
  }

 return (
    <div className="mt-5">
      <h2>
        <strong>{blog.title}</strong> by {blog.author}
      </h2>
       <p><strong>URL:</strong> {blog.url}</p>
        <p><strong>Likes:</strong> {blog.likes}</p>
    </div>
 )
}