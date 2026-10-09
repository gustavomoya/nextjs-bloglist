
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
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <Link className="font-medium text-blue-500 pr-2" href={`/blogs/${blog.id}`}>{blog.title}</Link>
            by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );

}
