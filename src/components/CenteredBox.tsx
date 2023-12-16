import { Box } from "@mui/material";
import * as React from "react";

export interface ICenteredBoxProps {
  children: React.ReactNode;
}

export function CenteredBox(props: ICenteredBoxProps) {
  return (
    <Box sx={{ width: 1 }} className="flex flex-col items-center">
      {props.children}
    </Box>
  );
}
