// src/components/TuRuta/LikeIcon.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import LikeIcon from "./LikeIcon";

describe("LikeIcon", () => {

  test("ejecuta onClick cuando se hace click", () => {
    const handleClick = jest.fn();
    render(<LikeIcon like={false} onClick={handleClick} />);

    const button = screen.getByRole("img", { hidden: true }).parentElement!;

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
