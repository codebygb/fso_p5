import React from "react";
import Blog from "./Blog";

export default function BlogList({ handleLogout, blogs, user, setBlogs }) {
  return (
    <>
      <h2>Blogs</h2>
      <h3>User {user.name} is logged in</h3>
      <button onClick={() => handleLogout()}>Logout</button>
      {blogs.map((blog) => (
        <Blog setBlogs={setBlogs} key={blog.id} blog={blog} userid={user.id} />
      ))}
    </>
  );
}
