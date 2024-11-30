import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title Component", () => {
  it("should render without crashing", () => {
    render(<Title content="Countries in Europe" />);
    const titleElement = screen.getByText("Countries in Europe");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("container", "small", "center");
  });

  it("should render with custom size", () => {
    render(<Title content="Countries in Europe" size="big" />);
    const titleElement = screen.getByText("Countries in Europe");
    expect(titleElement).toHaveClass("container", "big", "center");
  });

  it("should render with custom position", () => {
    render(<Title content="Select your country" position="left" />);
    const titleElement = screen.getByText("Select your country");
    expect(titleElement).toHaveClass("container", "small", "left");
  });

  it("should render with both custom size and position", () => {
    render(<Title content="Select your country" size="big" position="left" />);
    const titleElement = screen.getByText("Select your country");
    expect(titleElement).toHaveClass("container", "big", "left");
  });

  it("should render as h2 element", () => {
    render(<Title content="Select your country" />);
    const titleElement = screen.getByRole("heading", { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Select your country");
  });
});
