import { createBlog } from '../../actions/blogs'

const addBlog = () => {
    return (
        <div>
            <h2>Create a new blog</h2>
            <form action={createBlog}>
                <div>
                    <label>
                        Title
                        <input type="text" name="title" required />

                    </label>
                </div>
                <div>
                    <label>
                        Author
                        <input type="text" name="author" required />
                    </label>
                </div>
                <div>
                    <label>
                        Url
                        <input type="text" name="url" required />
                    </label>
                </div>
                <div>
                    <label>
                        Likes
                        <input type="number" name="likes" />
                    </label>
                </div>
                <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Create</button>
            </form>
        </div>
    )
}

export default addBlog