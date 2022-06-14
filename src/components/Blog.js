import Toggle from "./Toggle";
import * as blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog, userid, handleLikeExt, setBlogs }) => {
  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderStyle: "solid",
    borderColor: "black",
    //make border rounded
    borderRadius: 5,
  };
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = () => {
    blogService
      .update(blog.id, { ...blog, likes: likes + 1, user: blog.user.id })
      .then((response) => {
        setLikes(response.likes);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then((response) => {
          setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id));
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} by {blog.author}
      <Toggle buttonLabel={"Show"}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {likes} likes{" "}
          <button
            className="likeBtn"
            onClick={() => (handleLikeExt ? handleLikeExt() : handleLike())}
          >
            like
          </button>
        </div>
        <div>added by {blog?.user?.name}</div>
        {userid === blog.user.id && (
          <button onClick={() => handleDelete()}>Delete</button>
        )}
      </Toggle>
    </div>
  );
};

export default Blog;
