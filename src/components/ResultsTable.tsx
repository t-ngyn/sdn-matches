"use client";

import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchSdnResults } from "@/apis";
import { CircularProgress } from "@mui/material";
import { Outcome } from "./Outcome";

export function ResultsTable() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const dob = searchParams.get("dob");
  const fullName = searchParams.get("fullName");

  if (!country || !dob || !fullName) {
    return "Missing parameters -- unable to show results";
  }

  const {
    isLoading,
    isFetching,
    data: results,
  } = useQuery({
    queryKey: ["sdn"],
    queryFn: () =>
      fetchSdnResults({
        apiKey: process.env.NEXT_PUBLIC_SDN_API_KEY ?? "",
        source: ["SDN"],
        cases: [
          {
            name: fullName,
            dob: dob,
            address: {
              country,
            },
          },
        ],
      }),
  });

  const hasFullName = results?.data?.matches?.[fullName]?.length > 0;
  const hasDOB =
    hasFullName &&
    results?.data?.matches?.[fullName]?.some(
      (entry: SDNMatch) => entry?.dob === dayjs(dob).format("DD MMM YYYY")
    );
  const hasCountry =
    hasFullName &&
    results?.data?.matches?.[fullName]?.some((entry: SDNMatch) =>
      entry.addresses.some((address) => address?.country === country)
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Property</b>
              </TableCell>
              <TableCell align="right">
                <b>Value</b>
              </TableCell>
              <TableCell align="right">
                <b>Outcome</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Full Name
              </TableCell>
              <TableCell align="right">{fullName}</TableCell>
              <TableCell align="right">
                {isLoading || isFetching ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <Outcome foundResult={hasFullName} />
                )}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Date of Birth
              </TableCell>
              <TableCell align="right">{dob}</TableCell>
              <TableCell align="right">
                {isLoading || isFetching ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <Outcome foundResult={hasDOB} />
                )}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Country
              </TableCell>
              <TableCell align="right">{country}</TableCell>
              <TableCell align="right">
                {isLoading || isFetching ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <Outcome foundResult={hasCountry} />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
