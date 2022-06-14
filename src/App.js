import { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import * as blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("loggedBlogappUser")));
    blogService.getAll().then((blogs) => {
      // sort blogs by likes
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} user={user} />
      ) : (
        <>
          <BlogList
            setBlogs={setBlogs}
            handleLogout={handleLogout}
            blogs={blogs}
            user={user}
          />
          <BlogForm setBlogs={setBlogs} user={user} />
        </>
      )}
    </div>
  );
};

export default App;
