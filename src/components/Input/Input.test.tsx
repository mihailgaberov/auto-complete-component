import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";
import { vi } from "vitest";

describe("Input Component", () => {
  it("should render without crashing", () => {
    render(
      <Input
        onChangeHandler={() => {}}
        onKeyDown={() => {}}
        value=""
        onFocus={() => {}}
        onFocusOut={() => {}}
      />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call onChangeHandler when input value changes", () => {
    const onChangeHandler = vi.fn();
    render(
      <Input
        onChangeHandler={onChangeHandler}
        onKeyDown={() => {}}
        value=""
        onFocus={() => {}}
        onFocusOut={() => {}}
      />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChangeHandler).toHaveBeenCalledWith("test");
  });

  it("should be on focus when rendered", () => {
    render(
      <Input
        onChangeHandler={() => {}}
        onKeyDown={() => {}}
        value=""
        onFocus={() => {}}
        onFocusOut={() => {}}
      />
    );
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("should have placeholder text", () => {
    render(
      <Input
        onChangeHandler={() => {}}
        onKeyDown={() => {}}
        value=""
        onFocus={() => {}}
        onFocusOut={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText("Type a country name...")
    ).toBeInTheDocument();
  });
});
