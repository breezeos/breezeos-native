import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./Setup";
import "../../assets/styles/index.css";
import DialogProvider from "@r/components/DialogProvider";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </StrictMode>,
);
