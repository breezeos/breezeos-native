import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./Setup";
import "@r/assets/styles/index.css";
import DialogProvider from "@r/components/DialogProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <App />
      </DialogProvider>
    </QueryClientProvider>
  </StrictMode>,
);
