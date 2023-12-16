export const ACTION_TYPES = {
  SET_FULL_NAME: "SET_FULL_NAME",
  SET_DOB: "SET_DOB",
  SET_COUNTRY: "SET_COUNTRY",
};

export const setFullName = (fullName: string) => ({
  type: ACTION_TYPES.SET_FULL_NAME,
  payload: { fullName },
});

export const setDOB = (dob: string | undefined) => ({
  type: ACTION_TYPES.SET_DOB,
  payload: { dob },
});

export const setCountry = (country: string) => ({
  type: ACTION_TYPES.SET_COUNTRY,
  payload: { country },
});
