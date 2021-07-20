import P from "prop-types";
import "./styles.css";

export const PostCard = ({ post }) => {
  return (
    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: P.shape({
    id: P.number.isRequired,
    cover: P.string.isRequired,
    title: P.string.isRequired,
    body: P.string.isRequired,
  }),
};
