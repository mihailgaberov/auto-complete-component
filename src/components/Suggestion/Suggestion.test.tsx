import { render, screen } from "@testing-library/react";
import Suggestion from "./Suggestion";

describe("Suggestion Component", () => {
  it("should render without crashing", () => {
    render(<Suggestion name="test" flag="🇦🇱" searchValue="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should be selected when isSelected prop is true", () => {
    render(<Suggestion name="test" flag="🇦🇱" searchValue="test" isSelected />);
    expect(screen.getByText("test").parentElement?.parentElement).toHaveClass(
      "selected"
    );
  });

  it("should highlight the letters in the country name when search value matches", () => {
    render(<Suggestion name="test" flag="🇦🇱" searchValue="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();

    render(<Suggestion name="test" flag="🇦🇱" searchValue="es" />);

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getAllByRole("mark")).toHaveLength(2);
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "mark" && content.startsWith("es")
        );
      })
    ).toBeInTheDocument();
  });
});
