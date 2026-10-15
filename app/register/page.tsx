"use client"
import { useActionState } from "react"
import { registerUser } from "@/app/actions/users"


const addBlog = () => {
    const initialState = { error: "", values: { username: "", name: "", password: "", passwordConfirm: "", } };

    const [state, formAction] = useActionState(registerUser, initialState)


    return (
        <div>
            <h2>Register</h2>
            <form action={formAction}>
                <div>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input id="username" type="text" name="username" defaultValue={state.values?.username} />
                    {state.errors?.username && (
                        <p style={{ color: "red" }}>
                            {state.errors.username}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input id="name" type="text" name="name" defaultValue={state.values?.name} />
                    {state.errors?.name && (
                        <p style={{ color: "red" }}>
                            {state.errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input id="password" type="password" name="password" defaultValue={state.values?.password} />
                    {state.password?.name && (
                        <p style={{ color: "red" }}>
                            {state.errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="passwordConfirm">
                        Confirm password
                    </label>

                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        required
                        defaultValue={
                            state.values?.passwordConfirm
                        }
                    />

                    {state.errors?.passwordConfirm && (
                        <p style={{ color: "red" }}>
                            {state.errors.passwordConfirm}
                        </p>
                    )}
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2">Register</button>
            </form>
        </div>
    )
}

export default addBlog