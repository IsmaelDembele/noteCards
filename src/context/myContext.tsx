import React, { createContext, useReducer } from "react";
import {
  localStorageRouteKey,
  localStorageSignInCredentialsKey,
  localStorageSubTopicKey,
  localStorageTopicKey,
} from "../constantes/constantes";
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
  navInputTopicValue?: string;
  subtopicInputValue?: string;
  route?: string;
  topic?: string;
  subTopic?: string;
  card: { front: string; back: string; note: string };
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
    | { topic: string; subtopic: string }
    | { name: string; value: string }
    | boolean
    | string;
}

const storage = JSON.parse(localStorage.getItem(localStorageSignInCredentialsKey) as string);

const initialState: IState = {
  isLogged: false,
  signin: {
    email: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.email) || "",
  },
  token: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.token) || "",
  firstname: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.firstname) || "", //get them from localstorage
  lastname: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.lastname) || "",
  route: localStorage.getItem(localStorageRouteKey) || "topics",
  topic: localStorage.getItem(localStorageTopicKey) || "",
  subTopic: localStorage.getItem(localStorageSubTopicKey) || "",
  navInputTopicValue: "",
  subtopicInputValue: "",
  card: { front: "", back: "", note: "" },
};

const myContext = createContext<IMyContext | null>(null);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <myContext.Provider value={{ state, dispatch }}>{children}</myContext.Provider>;
};

export { AppProvider, myContext };
