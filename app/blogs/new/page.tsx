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
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2">Create</button>
            </form>
        </div>
    )
}

export default addBlog