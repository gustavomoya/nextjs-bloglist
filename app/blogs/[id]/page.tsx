
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike } from '../../actions/blogs'

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
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Add Like
        </button>
      </form>
    </div>
 )
}