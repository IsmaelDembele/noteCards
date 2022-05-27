import { createSlice } from "@reduxjs/toolkit";
import {
  localStorageRouteKey,
  localStorageAuthTokenKey,
  localStorageTopicKey,
  routes,
  localStorageSubTopicKey,
  routeExpirationTime,
} from "../../utils/constantes/constantes";
import { get, set } from "../../utils/functions/function";

export interface IAuthState {
  isLogged?: boolean;
  token?: string;
}

const initialState: IAuthState = {
  isLogged: false,
  token: get(localStorageAuthTokenKey) || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignin: (state, action) => {
      state.isLogged = action.payload;
    },
    getToken: (state, action) => {
      const { token } = action.payload as { token: string };
      state.token = token;
    },
    signOut: state => {
      set(localStorageRouteKey, routes.topics, routeExpirationTime);
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
