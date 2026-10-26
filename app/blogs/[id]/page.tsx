
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike, addReadingList } from '../../actions/blogs'
import { auth } from "@/auth";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params

  const session = await auth();

  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div data-testid="blog-detail" className="mx-auto w-full max-w-2xl p-6 lg:px-10">
      <h2 className="text-2xl font-bold mb-2">
          <strong data-testid="blog-title">{blog.title}</strong> by <span data-testid="blog-author">{blog.author}</span>
      </h2>
      <p className="text-gray-500 mb-2"><strong>URL:</strong> {blog.url}</p>
      <p className="text-gray-500 mb-2"><strong>Likes:</strong> {blog.likes}</p>

      <div className="flex">
        <form action={addLike}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Like
          </button>
        </form>
        {!blog.readingList?.length && session?.user?.email && (
          <form action={addReadingList}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit"
                    data-testid="add-to-reading-list-button"
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 ml-4 rounded">
              Add to Reading List
            </button>
          </form>
        )}
      </div>

    </div>
  )
}