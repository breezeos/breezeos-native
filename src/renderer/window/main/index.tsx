import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Desktop from "./Desktop";
import DialogProvider from "../../components/DialogProvider";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <DialogProvider>
      <Desktop />
    </DialogProvider>
  </StrictMode>,
);
