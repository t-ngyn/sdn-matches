type CountryAPIResponseEntry = {
  name: {
    common: string;
    official: string;
  };
};

type Case = {
  name: string;
  dob: string;
  address: {
    country: string;
  };
};

type SDNAPIResponseBody = {
  apiKey: string;
  source: ["SDN"];
  cases: Case[];
};

type Address = {
  city: string;
  country: string;
  uid: number;
};

type SDNMatch = {
  dob: string;
  addresses: Address[];
};
