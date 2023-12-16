"use client";

import Theme from "@/theme";
import PersonSearchForm from "./PersonSearchForm";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RegisterProvider } from "../contexts/RegisterContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function PersonSearch() {
  return (
    <ThemeProvider theme={Theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RegisterProvider>
          <QueryClientProvider client={queryClient}>
            <PersonSearchForm />
          </QueryClientProvider>
        </RegisterProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
