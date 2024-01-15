import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { store } from "./store/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
// store.get(apiAccessTokenAtom)
// store.set(apiAccessTokenAtom, "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <JotaiProvider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<p>Loading...</p>}>
            <App />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </JotaiProvider>
  </React.StrictMode>
);
