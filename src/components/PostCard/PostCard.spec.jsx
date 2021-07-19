import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    render(<PostCard post={postCardPropsMock} />);

    expect(
      screen.getByRole("img", { name: postCardPropsMock.title })
    ).toHaveAttribute("src", postCardPropsMock.cover);

    expect(
      screen.getByRole("heading", { name: postCardPropsMock.title })
    ).toBeInTheDocument();

    expect(screen.getByText(postCardPropsMock.body)).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<PostCard post={postCardPropsMock} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
