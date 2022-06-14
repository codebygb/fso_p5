import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

// Test default rendering of Blog
test("should render content of the blog without url and likes", () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "",
    likes: 0,
    user: {
      name: "Test user",
      username: "testuser",
      id: "01",
    },
  };
  const { container } = render(<Blog blog={blog} userid={"01"} />);
  const element = container.querySelector(".blog");
  expect(element).toHaveTextContent("Test blog by Test authorShow");
});

test("should render content of the blog with url and likes", async () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "",
    likes: 0,
    user: {
      name: "Test user",
      username: "testuser",
      id: "01",
    },
  };
  const user = userEvent.setup();
  const { container } = render(<Blog blog={blog} userid={"01"} />);
  const element = container.querySelector(".blog");
  const btn = container.querySelector(".toggleButton");
  await user.click(btn);
  expect(btn).toHaveTextContent("Hide");
  expect(element).toHaveTextContent(
    "Test blog by Test author0 likes likeadded by Test userDeleteHide"
  );
});

//Test clicking of like button
test("should call event handler twice when like button is clicked", async () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "",
    likes: 0,
    user: {
      name: "Test user",
      username: "testuser",
      id: "01",
    },
  };
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} userid={"01"} handleLikeExt={mockHandler} />
  );
  const btn = container.querySelector(".toggleButton");
  await userEvent.click(btn);
  const likeBtn = container.querySelector(".likeBtn");
  await userEvent.click(likeBtn);
  await userEvent.click(likeBtn);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
