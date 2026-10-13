import { registerUser } from "../actions/users"


const addBlog = () => {
    return (
        <div>
            <h2>Register</h2>
            <form action={registerUser}>
                <div>
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>
                </div>
                <div>
                    <label>
                        Name
                        <input type="text" name="name" required />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2">Register</button>
            </form>
        </div>
    )
}

export default addBlog