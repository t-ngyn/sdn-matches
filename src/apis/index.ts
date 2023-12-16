import axios from "axios";

export const fetchCountries = () => {
  return axios.get("https://restcountries.com/v3.1/all?fields=name");
};

export const fetchSdnResults = (params: SDNAPIResponseBody) => {
  return axios.post("https://search.ofac-api.com/v3", params);
};
