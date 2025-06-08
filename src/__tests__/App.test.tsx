import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Main from "../renderer/modules/main/Main";

describe("App", () => {
  it("should render", () => {
    expect(render(<Main />)).toBeTruthy();
  });
});
