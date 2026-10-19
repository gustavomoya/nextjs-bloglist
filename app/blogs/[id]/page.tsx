
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike } from '../../actions/blogs'

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6 lg:px-10">
      <h2 className="text-2xl font-bold mb-2">
        <strong>{blog.title}</strong> by {blog.author}
      </h2>
      <p className="text-gray-500 mb-2"><strong>URL:</strong> {blog.url}</p>
      <p className="text-gray-500 mb-2"><strong>Likes:</strong> {blog.likes}</p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Add Like
        </button>
      </form>
    </div>
  )
}