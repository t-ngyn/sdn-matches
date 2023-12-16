"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResultsTable } from "./ResultsTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function SDNResults() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResultsTable />
    </QueryClientProvider>
  );
}
