// import { useQuery } from "react-query";
// import { getLogged } from "../apis/myApis";
// import Signin from "../components/signin/Signin";
import { IAction, ISate } from "../context/myContext";

export const reducer = (state: ISate, action: IAction): ISate => {
  switch (action.type) {
    case "getToken": {
      const { token, email } = action.payload as { token: string; email: string };
      return {
        ...state,
        token: token,
        signin: { email: email },
      };
    }
    case "setSignin": {
      return { ...state, isLogged: action.payload as boolean };
    }
    case "signOut": {
      localStorage.removeItem("signInCredentials");
      return {
        token: "",
        signin: { email: "" },

        isLogged: false,
      };
    }
    default:
      return state;
  }
};
