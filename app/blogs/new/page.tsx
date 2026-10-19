"use client"
import { useActionState, useEffect } from "react"
import { createBlog, type BlogFormState } from '@/app/actions/blogs'
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"


const AddBlog = () => {

    const initialState: BlogFormState = {
        errors: {},
        values: {
            title: "",
            author: "",
            url: "",
        },
        success: false
    }

    const [state, formAction] = useActionState(createBlog, initialState)

    const { showNotification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            showNotification("The blog was created successfully")
            router.push("/blogs")
        }
    }, [state, showNotification, router])

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                    <input id="title" type="text" name="title" defaultValue={state.values?.title} className="mt-1 block w-full border rounded px-3 py-2" />
                    {state.errors?.title && (<p style={{ color: "red" }}> {state.errors.title} </p>)}
                </div>

                <div>
                    <label htmlFor="author" className="block mb-1 font-medium">Author</label>
                    <input id="author" type="text" name="author" defaultValue={state.values?.author} className="mt-1 block w-full border rounded px-3 py-2" />
                    {state.errors?.author && (<p style={{ color: "red" }}> {state.errors.author} </p>)}
                </div>
                <div>
                    <label htmlFor="url" className="block mb-1 font-medium">Url</label>
                    <input id="url" type="text" name="url" defaultValue={state.values?.url} className="mt-1 block w-full border rounded px-3 py-2" />
                    {state.errors?.url && (<p style={{ color: "red" }}> {state.errors.url} </p>)}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
            </form>
        </div>
    )
}

export default AddBlog