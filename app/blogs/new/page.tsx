"use client"
import { useActionState } from "react"
import { createBlog, type BlogFormState } from '@/app/actions/blogs'


const addBlog = () => {
    
    const initialState: BlogFormState = {
        errors: {},
        values: {
            title: "",
            author: "",
            url: "",
        },
    }

    const [state, formAction] = useActionState(createBlog, initialState)

    return (
        <div>
            <h2>Create a new blog</h2>
            <form action={formAction}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" defaultValue={state.values?.title} />
                    {state.errors?.title && (<p style={{ color: "red" }}> {state.errors.title} </p>)}
                </div>

                <div>
                    <label htmlFor="author">Author</label>
                    <input id="author" type="text" name="author" defaultValue={state.values?.author} />
                    {state.errors?.author && (<p style={{ color: "red" }}> {state.errors.author} </p>)}
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input id="url" type="text" name="url" defaultValue={state.values?.url} />
                    {state.errors?.url && (<p style={{ color: "red" }}> {state.errors.url} </p>)}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2">Create</button>
            </form>
        </div>
    )
}

export default addBlog