import Link from "next/link";
import { Box, Container, Paper, Typography } from "@mui/material";
import { SDNResults } from "@/components/SDNResults";

export default function Results() {
  return (
    <Box pt={4}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" className="text-center">
            Results
          </Typography>
          <SDNResults />
          <div className="text-right pt-4">
            <Link
              href="/search"
              className="text-black no-underline hover:#000 visited:#000"
            >
              {"<"} Back to Search
            </Link>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}
