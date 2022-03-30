import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  localStorageRouteKey,
  localStorageSignInCredentialsKey,
  localStorageTopicKey,
} from "../../constantes/constantes";
// import { RootState } from "../../app/store";

export interface IAuthState {
  isLogged?: boolean;
  email: string;
  password?: string;
  token?: string;
  firstname?: string;
  lastname?: string;
}

const storage = JSON.parse(localStorage.getItem(localStorageSignInCredentialsKey) as string);

const initialState: IAuthState = {
  isLogged: false,
  email: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.email) || "",
  token: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.token) || "",
  firstname: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.firstname) || "", //get them from localstorage
  lastname: (localStorage.getItem(localStorageSignInCredentialsKey) && storage?.lastname) || "",
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
      const { token, email, firstname, lastname } = action.payload as {
        token: string;
        msg?: string | undefined;
        email: string;
        firstname: string;
        lastname: string;
      };

      state.token = token;
      state.email = email;
      state.firstname = firstname;
      state.lastname = lastname;
    },
    signOut: state => {
      localStorage.removeItem(localStorageRouteKey);
      localStorage.removeItem(localStorageSignInCredentialsKey);
      localStorage.removeItem(localStorageTopicKey);

      state.token = "";
      state.email = "";
      // state.route= "topics";
      state.isLogged = false;
      state.firstname = "";
      state.lastname = "";
    },
  },
});

export const { setSignin, getToken, signOut } = authSlice.actions;

export default authSlice.reducer;
