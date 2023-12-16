"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetchCountries } from "@/apis";
import {
  Typography,
  TextField,
  Divider,
  Stack,
  Button,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Section } from "./Section";
import { CenteredBox } from "./CenteredBox";
import { InputTitle } from "./InputTitle";
import { RegisterContext } from "../contexts/RegisterContext";
import { setFullName, setDOB, setCountry } from "../actions";

export default function PersonSearchForm() {
  const { registration, dispatch } = useContext(RegisterContext);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { isLoading: isLoadingCountries, data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchCountries(),
  });

  const { fullName, dob, country } = registration;

  const onSubmit = () => {
    setSubmitting(true);
    const params = new URLSearchParams(
      registration as { [key: string]: string }
    );
    router.replace(`/results?${params.toString()}`);
  };

  const canSubmit =
    fullName?.trim().length && dob?.trim().length && country?.trim().length;

  return (
    <Box pt={4}>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Stack p={2} spacing={2}>
            <Typography variant="h4" className="text-center">
              SDN Search
            </Typography>
            <Stack
              divider={
                <Box pt={2} pb={2}>
                  <Divider />
                </Box>
              }
            >
              <Box>
                <Section title="Personal">
                  <CenteredBox>
                    <InputTitle>Full Name</InputTitle>
                    <TextField
                      id="full-name"
                      value={fullName}
                      disabled={submitting}
                      onChange={(e) => dispatch(setFullName(e.target.value))}
                      className="w-full md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12"
                    />
                  </CenteredBox>
                  <CenteredBox>
                    <InputTitle>Date of Birth</InputTitle>
                    <DatePicker
                      className="w-full md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12"
                      onChange={(e) =>
                        dispatch(setDOB(e?.format("YYYY-MM-DD")))
                      }
                      value={dob ? dayjs(dob) : null}
                    />
                  </CenteredBox>
                  <CenteredBox>
                    <InputTitle>Country</InputTitle>
                    <Autocomplete
                      id="country"
                      loading={isLoadingCountries}
                      disabled={submitting}
                      options={(countries?.data || [])?.map(
                        (country: CountryAPIResponseEntry) => ({
                          label: country.name.common,
                          value: country.name.common,
                        })
                      )}
                      onChange={(_, e) => dispatch(setCountry(e?.value ?? ""))}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      value={
                        country
                          ? {
                              label: country,
                              value: country,
                            }
                          : null
                      }
                      className="w-full md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12"
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </CenteredBox>
                </Section>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  id="basic-button"
                  variant="contained"
                  disabled={!canSubmit || submitting}
                  className="w-full md:w-3/12 lg:w-3/12 xl:w-3/12 2xl:w-3/12"
                  onClick={onSubmit}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
