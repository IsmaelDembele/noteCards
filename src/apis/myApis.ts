import axios from "axios";
import { ISignup } from "../components/signup/Signup";
import { ISignin } from "../context/myContext";

const pathRoutes = {
  IS_LOGGED: "/islogged",
  SIGN_IN: "/signin",
  CREATE_ACCOUNT: "/createAccount",
};

//islogged axios
export const getLogged = async (token: string, email: string) => {
  if (token === "" || email === "") return null;
  return await axios.get(
    `http://localhost:5000${pathRoutes.IS_LOGGED}/?token=${token}&email=${email}`
  );
};

export const postLogged = async (logginInfo: ISignin) => {
  return await axios.post(`http://localhost:5000${pathRoutes.SIGN_IN}`, { logginInfo });
};

export const postCreateAccount = async (signupInfo: ISignup) => {
  return await await axios.post(`http://localhost:5000${pathRoutes.CREATE_ACCOUNT}`, {
    signupInfo,
  });
};
