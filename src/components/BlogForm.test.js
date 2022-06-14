import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

// Test the blog form
test("should render the blog form", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  const { container } = render(<BlogForm handleSubmitExt={createBlog} />);

  const addBtn = container.querySelector(".toggleButton");
  await user.click(addBtn);

  const inputTitle = container.querySelector("#title");
  const inputAuthor = container.querySelector("#author");
  const inputUrl = container.querySelector("#url");

  await user.type(inputTitle, "Test blog");
  await user.type(inputAuthor, "Test author");
  await user.type(inputUrl, "https://test.com");

  expect(inputTitle.value).toBe("Test blog");
  expect(inputAuthor.value).toBe("Test author");
  expect(inputUrl.value).toBe("https://test.com");
});
