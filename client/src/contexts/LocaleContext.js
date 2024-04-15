import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function LocalizationProviderWrapper({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
