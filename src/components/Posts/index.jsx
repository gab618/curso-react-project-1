import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts }) => (
  <div className="posts">{posts && posts.map((post) => <PostCard post={post} key={post.id} />)}</div>
);
