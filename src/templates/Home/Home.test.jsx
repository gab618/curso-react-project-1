import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Home from ".";
import { exp } from "prelude-ls";
import userEvent from "@testing-library/user-event";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com/*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title 1",
          body: "body 1",
          url: "img1.jpg",
        },
        {
          userId: 2,
          id: 2,
          title: "title 2",
          body: "body 2",
          url: "img2.jpg",
        },
        {
          userId: 3,
          id: 3,
          title: "title 3",
          body: "body 3",
          url: "img3.jpg",
        },
        {
          userId: 4,
          id: 4,
          title: "title 4",
          body: "body 4",
          url: "img4.jpg",
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it("should render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts =/");

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole("img", { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole("button", { name: /ver mais/i });
    expect(button).toBeInTheDocument();
  });

  it("should search for posts", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts =/");

    expect.assertions(12);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title 2" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title 3" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "title 4" })).not.toBeInTheDocument();

    userEvent.type(search, "title 1");
    expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "title 2" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "title 3" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Search value: title 1" })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole("heading", { name: "title 1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title 2" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "title 3" })).toBeInTheDocument();

    userEvent.type(search, "not a post");
    expect(screen.getByText("Não existem posts =/")).toBeInTheDocument();
  });

  it("should load more posts on click", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts =/");

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole("button", { name: /ver mais/i });

    userEvent.click(button);
    expect(screen.getByRole("heading", { name: "title 4" })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
