import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Desktop from "../renderer/window/main/Desktop";

describe("App", () => {
  it("should render", () => {
    expect(render(<Desktop />)).toBeTruthy();
  });
});
