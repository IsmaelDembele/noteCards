import React, { createContext, useReducer } from "react";
import { reducer } from "../reducer/myReducer";

export interface IMyContext {
  state: ISate;
  dispatch: React.Dispatch<IAction>;
}

export interface ISate {
  isLogged: boolean;
  signin: ISignin;
  token: string;
}

export interface ISignin {
  email: string;
  password?: string;
}

export interface IAction {
  type: string;
  payload?: { token: string; msg: string; email: string } | ISignin | boolean;
}

const initialState: ISate = {
  isLogged: false,
  signin: {
    email:
      (localStorage.getItem("signInCredentials") &&
        JSON.parse(localStorage.getItem("signInCredentials") as string)?.email) ||
      "",
  },
  token:
    (localStorage.getItem("signInCredentials") &&
      JSON.parse(localStorage.getItem("signInCredentials") as string)?.token) ||
    "",
};

const myContext = createContext<IMyContext | null>(null);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <myContext.Provider value={{ state, dispatch }}>{children}</myContext.Provider>;
};

export { AppProvider, myContext };
