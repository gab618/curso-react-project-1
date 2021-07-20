import P from "prop-types";

import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts }) => (
  <div className="posts">{posts && posts.map((post) => <PostCard post={post} key={post.id} />)}</div>
);

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      cover: P.string.isRequired,
      title: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
    }),
  ),
};
