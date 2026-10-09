import Link from "next/link";
import { getUsers } from '../services/users'

export default async function UsersPage() {

    const users = await getUsers()

    return (
    <div>
      <h2>List of users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link className="font-medium text-blue-500 pr-2" href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

}
