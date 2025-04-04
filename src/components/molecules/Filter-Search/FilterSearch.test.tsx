
import { render, screen, fireEvent } from "@testing-library/react";
import FilterSearch from "./FilterSearch";

describe("FilterSearch", () => {
  test("renderiza el input con el placeholder", () => {
    render(<FilterSearch />);
    const input = screen.getByPlaceholderText("Search or filter results");
    expect(input).toBeInTheDocument();
  });

  test("actualiza el valor del input al escribir", () => {
    render(<FilterSearch />);
    const input = screen.getByPlaceholderText("Search or filter results") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Rick" } });

    expect(input.value).toBe("Rick");
  });


});
