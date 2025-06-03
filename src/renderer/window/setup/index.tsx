import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./Setup";
import "@r/assets/styles/index.css";
import DialogProvider from "@r/components/DialogProvider";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </StrictMode>,
);
