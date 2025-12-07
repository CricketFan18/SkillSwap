import Post from "../components/Post.jsx";
import { data } from "../context/dummy.js";

function Home() {
  const posts = data;
  return (
      <div className="flex flex-col gap-4 p-4 items-center">
        {posts.map((post) => (
          <Post key={post._id} postData={post} />
        ))}
      </div>
  );
}

export default Home;
