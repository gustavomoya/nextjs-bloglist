import Image from "next/image";

const Home = () => {
  return (
    <div>
      <div>
        <h1 className="font-semibold text-black my-3">Blogs app</h1>
        An example app for{" "}
        <a href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs" className="font-medium text-blue-500">
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a href="https://github.com/gustavomoya/nextjs-bloglist" className="font-medium text-blue-500">
          https://github.com/gustavomoya/nextjs-bloglist
        </a>{" "}
        for the source code
      </div>
    </div>
  )
}
export default Home
