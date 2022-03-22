// import { useQuery } from "react-query";
// import { getLogged } from "../apis/myApis";
// import Signin from "../components/signin/Signin";
import { IAction, IState } from "../context/myContext";

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "getToken": {
      // console.log("gettoken", action.payload);

      const { token, email, firstname, lastname } = action.payload as {
        token: string;
        msg?: string | undefined;
        email: string;
        firstname: string;
        lastname: string;
      };
      return {
        ...state,
        token: token,
        signin: { email: email },
        firstname: firstname,
        lastname: lastname,
      };
    }
    case "setSignin": {
      return { ...state, isLogged: action.payload as boolean };
    }
    case "signOut": {
      localStorage.removeItem("signInCredentials");
      return {
        ...state,
        token: "",
        signin: { email: "" },

        isLogged: false,
        firstname: "",
        lastname: "",
      };
    }
    case "addTopic": {
      return {
        ...state,
        navAddTopic: action.payload as string,
      };
    }
    default:
      return state;
  }
};
