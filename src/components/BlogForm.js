import * as blogService from "../services/blogs";
import React, { useRef, useState } from "react";
import Toggle from "./Toggle";

export default function BlogForm({ setBlogs, user }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const toggleRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author || !url) {
      setError("Title, author and url are required");
      return;
    }
    const blog = {
      title,
      author,
      url,
    };

    blogService
      .create(blog)
      .then((response) => {
        setTitle("");
        setAuthor("");
        setUrl("");
        setError(null);
        setSuccess(`A new blog ${response.title} by ${response.author} added`);
        const newBlog = {
          ...response,
          user: {
            id: user.id,
            name: user.name,
          },
        };
        setBlogs((blogs) => [...blogs, newBlog]);

        setTimeout(() => {
          setSuccess(null);
          toggleRef.current.toggle();
        }, 5000);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  return (
    <Toggle ref={toggleRef} buttonLabel={"Add More Blogs"}>
      {error && (
        <p>
          {error?.response?.data?.error ||
            error?.message ||
            "An error occurred while adding a Blog"}
        </p>
      )}
      {success && <p>{success}</p>}
      <h2>Add New Blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            type="text"
            id="url"
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" id="submit">
          Add
        </button>
      </form>
    </Toggle>
  );
}
