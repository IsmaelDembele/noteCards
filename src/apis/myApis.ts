import axios from "axios";
import { IAuthState } from "../features/authentication/authSlice";

export interface IReadCard {
  topic: string;
  subTopic: string;
  front: string;
  back: string;
  note: string;
}

const pathRoutes = {
  IS_LOGGED: "/islogged",
  SIGN_IN: "/signin",
  CREATE_ACCOUNT: "/createAccount",
  POST_TOPIC: "/postTopics",
  GET_TOPIC: "/getTopics",
  POST_SUB_TOPIC: "/postSubTopic",
  GET_SUB_TOPIC: "/getSubTopic",
  GET_CARDS: "/getCards",
};

export const getCards = async ({ topic, subTopic, front, back, note }: IReadCard) => {
  return await axios.get(
    `http://localhost:5000${pathRoutes.GET_CARDS}/?front=${front}&back=${back}&note=${note}&topic=${topic}&subTopic=${subTopic}`
  );
};

export const getSubTopic = async (topic: string) => {
  if (topic.length === 0) return null;

  return await axios.get(`http://localhost:5000${pathRoutes.GET_SUB_TOPIC}/?topic=${topic}`);
};

export const postSubTopic = async ({ subtopic, topic }: { subtopic: string; topic: string }) => {
  if (subtopic.length === 0) return null;

  return await axios.post(`http://localhost:5000${pathRoutes.POST_SUB_TOPIC}`, { subtopic, topic });
};

export const getTopics = async () => {
  return await axios.get(`http://localhost:5000${pathRoutes.GET_TOPIC}`);
};

export const postTopic = async (topic: string) => {
  if (topic.length < 1) return null;
  return await axios.post(`http://localhost:5000${pathRoutes.POST_TOPIC}`, { topic });
};

//islogged axios
export const getLogged = async (token: string, email: string) => {
  if (token === "" || email === "") return null;
  return await axios.get(
    `http://localhost:5000${pathRoutes.IS_LOGGED}/?token=${token}&email=${email}`
  );
};

export const postLogged = async (logginInfo: IAuthState) => {
  return await axios.post(`http://localhost:5000${pathRoutes.SIGN_IN}`, { logginInfo });
};

export const postCreateAccount = async (signupInfo: IAuthState) => {
  return await await axios.post(`http://localhost:5000${pathRoutes.CREATE_ACCOUNT}`, {
    signupInfo,
  });
};
