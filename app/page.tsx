
const Home = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Blogs app</h1>
        An example app for{" "}
        <a href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs" className="text-blue-600 hover:underline">
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a href="https://github.com/gustavomoya/nextjs-bloglist" className="text-blue-600 hover:underline">
          https://github.com/gustavomoya/nextjs-bloglist
        </a>{" "}
        for the source code
      </div>
    </div>
  )
}
export default Home
