import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/services/session";
import { generateToken } from "@/app/actions/users"

export default async function ProfilePage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6 lg:px-10">
            <h2 className="text-2xl font-bold mb-8">My Profile</h2>
            <p className="text-gray-500 mb-4">Name: {user.name}</p>
            <p className="text-gray-500 mb-4">Username: {user.username}</p>

            <hr className="border-gray-300 border" />

            <h3 className="text-xl font-bold mt-4 mb-2">API TOKEN</h3>

            <div className="mb-4 pt-2 pb-4 bg-gray-100">
                <p className="px-2">Current token:</p>
                <p className="mx-2 px-2 bg-gray-200 font-semibold text-gray-700">{user.token ? user.token : 'No token has been generated yet'}</p>
            </div>

            <form action={generateToken}>
                <input type="hidden" name="id" value={user.id} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Generate New Token
                </button>
            </form>

        </div>
    )
}