import Link from "next/link";
import { getUsers } from '../services/users'

export default async function UsersPage() {

  const users = await getUsers()

  return (
    <div className="mx-auto w-full max-w-2xl p-6 lg:px-10">
      <h2 className="text-2xl font-bold mb-4">List of users</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id}>
            <Link className="text-blue-600 hover:underline" href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

}
