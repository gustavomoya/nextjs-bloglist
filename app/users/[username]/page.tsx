
import { notFound } from 'next/navigation';
import {getUserByUsername} from '../../services/users'
import Link from 'next/link';

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6 lg:px-10">
      <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
      <p className="text-gray-500 mb-4">Username: {user.username}</p>
      <h3 className="text-xl font-semibold mb-2">Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link className="text-blue-600 hover:underline pr-2" href={`/blogs/${blog.id}`}>{blog.title}</Link>
            by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );

}
