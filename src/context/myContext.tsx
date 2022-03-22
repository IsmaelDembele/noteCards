import React, { createContext, useReducer } from "react";
import { reducer } from "../reducer/myReducer";

export interface IMyContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

export interface IState {
  isLogged: boolean;
  signin: ISignin;
  token: string;
  firstname: string;
  lastname: string;
  navAddTopic: string;
}

export interface ISignin {
  email: string;
  password?: string;
}

export interface IAction {
  type: string;
  payload?:
    | { token: string; msg?: string; email: string; firstname: string; lastname: string }
    | ISignin
    | boolean
    | string;
}

const storage = JSON.parse(localStorage.getItem("signInCredentials") as string);

const initialState: IState = {
  isLogged: false,
  signin: {
    email: (localStorage.getItem("signInCredentials") && storage?.email) || "",
  },
  token: (localStorage.getItem("signInCredentials") && storage?.token) || "",
  firstname: (localStorage.getItem("signInCredentials") && storage?.firstname) || "", //get them from localstorage
  lastname: (localStorage.getItem("signInCredentials") && storage?.lastname) || "",
  navAddTopic: "",
};

const myContext = createContext<IMyContext | null>(null);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <myContext.Provider value={{ state, dispatch }}>{children}</myContext.Provider>;
};

export { AppProvider, myContext };
