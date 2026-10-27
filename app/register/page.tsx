"use client"
import { useActionState, useEffect } from "react"
import { registerUser, type RegisterUserState } from "@/app/actions/users"
import { useNotification } from "../components/NotificationContext"
import { useRouter } from "next/navigation"


const AddUser = () => {
    const initialState: RegisterUserState = {
        errors: {},
        values: {
            username: "",
            name: "",
            password: "",
            passwordConfirm: "",
        },
        success: false
    }

    const [state, formAction] = useActionState(registerUser, initialState)


    const { showNotification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            showNotification("The registration was successful.")
            router.push("/login")
        }
    }, [state, showNotification, router])

    return (
        <div className="mx-auto w-full max-w-2xl p-6 lg:px-10">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1 font-medium">
                        Username
                    </label>
                    <input id="username" type="text" name="username" defaultValue={state.values?.username} className="mt-1 block w-full border rounded px-3 py-2" />
                    {state.errors?.username && (
                        <p data-testid="username-error" style={{ color: "red" }}>
                            {state.errors.username}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                        Name
                    </label>
                    <input id="name" type="text" name="name" defaultValue={state.values?.name} className="mt-1 block w-full border rounded px-3 py-2" />
                    {state.errors?.name && (
                        <p style={{ color: "red" }}>
                            {state.errors.name}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">
                        Password
                    </label>
                    <input id="password" type="password" name="password" defaultValue={state.values?.password} className="mt-1 block w-full border rounded px-3 py-2" />
                    {state.errors?.password && (
                        <p style={{ color: "red" }}>
                            {state.errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="passwordConfirm" className="block mb-1 font-medium">
                        Confirm Password
                    </label>

                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        defaultValue={
                            state.values?.passwordConfirm
                        }
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />

                    {state.errors?.passwordConfirm && (
                        <p data-testid="passwordConfirm-error" style={{ color: "red" }}>
                            {state.errors.passwordConfirm}
                        </p>
                    )}
                </div>

                <button type="submit"
                        data-testid="register-button"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Register
                </button>
            </form>
        </div>
    )
}

export default AddUser