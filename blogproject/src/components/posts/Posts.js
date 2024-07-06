import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  return (
    <div className="posts">
      <Post id={1} />
      <Post id={2}/>
      <Post id={3}/>
      <Post id={4}/>
      <Post />
    </div>
  );
}
