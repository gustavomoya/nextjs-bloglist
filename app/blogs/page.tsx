import { Suspense } from "react";
import BlogListPage from "./BlogList";
import BlogListSkeleton from "@/app/components/BlogListSkeleton";


export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {

  const { filter } = await searchParams

  return (
    <div data-testid="blogs-list" className="mx-auto w-full max-w-2xl p-6 lg:px-10">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form method="GET" action="/blogs" className="w-full max-w-md rounded pt-2">
        <div className="mb-2 flex justify-items-start">
          <input type="text"
            data-testid="filter-input"
            name="filter"
            defaultValue={filter ?? ""}
            placeholder="Search by title" className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button type="submit"
                  data-testid="search-button"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Search
          </button>
        </div>
      </form>
      <Suspense
        key={filter ?? ""}
        fallback={<BlogListSkeleton />}
      >
        <BlogListPage filter={filter} />
      </Suspense>
    </div>
  );
}
