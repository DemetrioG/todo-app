import { render } from "@testing-library/react";
import Button from "../index";

describe("Button component", () => {
  it("renders with default class name and text", () => {
    const { getByText } = render(<Button text="Hello World" />);
    expect(getByText("Hello World")).toHaveClass(
      "p-2 rounded bg-zinc-500 text-white w-28"
    );
  });

  it("renders with custom class name", () => {
    const { getByText } = render(
      <Button text="Hello World" className="custom-class" />
    );
    expect(getByText("Hello World")).toHaveClass("custom-class");
  });

  it("renders with custom styles", () => {
    const { getByText } = render(
      <Button text="Hello World" style={{ fontSize: 14 }} />
    );
    expect(getByText("Hello World")).toHaveStyle("fontSize: 14px");
  });

  it("renders with custom attributes", () => {
    const { getByText } = render(<Button text="Hello World" disabled />);
    expect(getByText("Hello World")).toBeDisabled();
  });
});
