import { Box } from "@mui/material";
import * as React from "react";

export interface IInputTitleProps {
  children: React.ReactNode;
}

export function InputTitle(props: IInputTitleProps) {
  return (
    <Box fontWeight={500} mb={0.5}>
      {props.children}
    </Box>
  );
}
