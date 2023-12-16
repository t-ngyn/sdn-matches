import React, { useReducer } from "react";
import { ACTION_TYPES } from "../actions";

const { SET_FULL_NAME, SET_DOB, SET_COUNTRY } = ACTION_TYPES;

export type Registration = {
  fullName: string;
  dob: string | undefined;
  country: string;
};

export type Action = {
  type: string;
  payload: { [key: string]: string | undefined };
};

const DEFAULT_STATE: Registration = {
  fullName: "",
  dob: undefined,
  country: "",
};

const RegisterContext = React.createContext<{
  registration: Registration;
  dispatch: React.Dispatch<Action>;
}>({
  registration: DEFAULT_STATE,
  dispatch: () => {
    return;
  },
});

const reducer = (state: Registration, action: Action) => {
  switch (action.type) {
    case SET_FULL_NAME:
      return Object.assign({}, state, { fullName: action.payload.fullName });
    case SET_DOB:
      return Object.assign({}, state, { dob: action.payload.dob });
    case SET_COUNTRY:
      return Object.assign({}, state, {
        country: action.payload.country,
      });
  }
  return state;
};

const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [registration, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <RegisterContext.Provider value={{ registration, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
