import { Box, Stack } from "@mui/material";
import * as React from "react";

export interface ISectionProps {
  children: React.ReactNode;
  title: string;
}

export function Section(props: ISectionProps) {
  return (
    <Stack direction="row" spacing={4} pl={2}>
      <Box sx={{ width: 200 }} fontWeight={500}>
        {props.title}
      </Box>
      <Box sx={{ width: 1 }}>
        <Stack spacing={2} width={1}>
          {props.children}
        </Stack>
      </Box>
    </Stack>
  );
}
