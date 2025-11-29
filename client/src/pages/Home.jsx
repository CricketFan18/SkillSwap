import Post from '../components/Post.jsx';

function Home() {
 
  return (
    <div className="flex flex-col gap-4 p-4 items-center pb-20">
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    </div>
  );
}

export default Home;
