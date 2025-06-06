import { createRoot } from "react-dom/client";
import { StrictMode, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Desktop from "./Desktop";
import DialogProvider from "@/renderer/layouts/DialogProvider";
import { LoadingContext, LoadingProvider } from "@/renderer/contexts/LoadingContext";
import Loading from "@/renderer/layouts/Loading";

const queryClient = new QueryClient();
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function App(){
  const isLoading = useContext(LoadingContext);

  return isLoading ? <Loading /> : (
    <DialogProvider>
      <Desktop />
    </DialogProvider>
  )
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

