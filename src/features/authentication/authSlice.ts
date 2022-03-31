import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  localStorageRouteKey,
  localStorageAuthTokenKey,
  localStorageTopicKey,
  routes,
  localStorageSubTopicKey,
} from "../../constantes/constantes";

export interface IAuthState {
  isLogged?: boolean;
  token?: string;
}

const storage = JSON.parse(localStorage.getItem(localStorageAuthTokenKey) as string);

const initialState: IAuthState = {
  isLogged: false,
  token: (localStorage.getItem(localStorageAuthTokenKey) && storage?.token) || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSignin: (state, action) => {
      state.isLogged = action.payload;
    },
    getToken: (state, action) => {
      const { token } = action.payload as { token: string };
      state.token = token;
    },
    signOut: state => {
      localStorage.setItem(localStorageRouteKey, routes.topics);
      localStorage.removeItem(localStorageAuthTokenKey);
      localStorage.removeItem(localStorageTopicKey);
      localStorage.removeItem(localStorageSubTopicKey);

      state.token = "";
      state.isLogged = false;
    },
  },
});

export const { setSignin, getToken, signOut } = authSlice.actions;

export default authSlice.reducer;
