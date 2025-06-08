import { createRoot } from "react-dom/client";
import { StrictMode, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Setup from "./Setup";
import "@r/styles/index.css";
import {
  LoadingContext,
  LoadingProvider,
} from "@/renderer/contexts/LoadingContext";
import Loading from "@/renderer/layouts/Loading";

const queryClient = new QueryClient();
const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

function App() {
  const isLoading = useContext(LoadingContext);
  return isLoading ? <Loading /> : <Setup />;
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </QueryClientProvider>
  </StrictMode>,
);
