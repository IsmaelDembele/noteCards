import axios from "axios";
import { ISignup } from "../components/signup/Signup";
import { IAuthState } from "../features/authentication/authSlice";

export interface ICards {
  topic: string;
  subTopic: string;
}

export interface IReadCard {
  topic: string;
  subTopic: string;
  front?: string;
  back?: string;
  note?: string;
  token?: string;
  cardID?: string;
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
  ADD_CARDS: "/addCards",
  GET_CARD: "/getCard",
  UPDATE_CARD: "/updateCard",
  DELETE_TOPICS: "/deleteTopics",
  DELETE_SUB_TOPICS: "/deleteSubTopics",
  DELETE_CARD: "/deleteCard",
  DELETE_CARDS: "/deleteCards",
};

export const getCard = async (topic: string, subTopic: string, token: string) => {
  if (!topic || !subTopic || !token) return null;
  return await axios.get(
    `http://localhost:5000${pathRoutes.GET_CARD}/?topic=${topic}&subTopic=${subTopic}&token=${token}`
  );
};

export const getCards = async (topic: string, subTopic: string, token: string) => {
  return await axios.get(
    `http://localhost:5000${pathRoutes.GET_CARDS}/?topic=${topic}&subTopic=${subTopic}&token=${token}`
  );
};

export const addCards = async ({ topic, subTopic, front, back, note, token }: IReadCard) => {
  return await axios.post(`http://localhost:5000${pathRoutes.ADD_CARDS}`, {
    topic,
    subTopic,
    front,
    back,
    note,
    token,
  });
};

export const getSubTopic = async (topic: string, token: string) => {
  if (topic.length === 0 || !token) return null;

  return await axios.get(
    `http://localhost:5000${pathRoutes.GET_SUB_TOPIC}/?topic=${topic}&token=${token}`
  );
};

export const postSubTopic = async ({
  subtopic,
  topic,
  token,
}: {
  subtopic: string;
  topic: string;
  token: string;
}) => {
  if (subtopic.length === 0 || !token || token.length === 0) return null;

  return await axios.post(`http://localhost:5000${pathRoutes.POST_SUB_TOPIC}`, {
    subtopic,
    topic,
    token,
  });
};

export const getTopics = async (token: string) => {
  if (!token) return null;
  return await axios.get(`http://localhost:5000${pathRoutes.GET_TOPIC}/?token=${token}`);
};

export const postTopic = async ({ topic, token }: { topic: string; token: string }) => {
  if (topic.length < 1 || token.length < 0) return null;
  return await axios.post(`http://localhost:5000${pathRoutes.POST_TOPIC}`, { topic, token });
};

//islogged axios
export const getLogged = async (token: string) => {
  if (token === "") return null;
  return await axios.get(`http://localhost:5000${pathRoutes.IS_LOGGED}/?token=${token}`);
};

export const postLogged = async (logginInfo: IAuthState) => {
  return await axios.post(`http://localhost:5000${pathRoutes.SIGN_IN}`, { logginInfo });
};

export const postCreateAccount = async (signupInfo: ISignup) => {
  return await await axios.post(`http://localhost:5000${pathRoutes.CREATE_ACCOUNT}`, {
    signupInfo,
  });
};

export const updateCard = async (
  topic: string,
  subTopic: string,
  front: string,
  back: string,
  note: string,
  token: string,
  cardID: string
) => {
  return await axios.post(`http://localhost:5000${pathRoutes.UPDATE_CARD}`, {
    topic,
    subTopic,
    front,
    back,
    note,
    token,
    cardID,
  });
};

export const deleteCard = async (token: string, cardID: string) => {
  return await axios.post(`http://localhost:5000${pathRoutes.DELETE_CARD}`, { token, cardID });
};

export const deleteTopics = async (token: string) => {
  return await axios.post(`http://localhost:5000${pathRoutes.DELETE_TOPICS}`, { token });
};

export const deleteSubTopics = async (token: string, topic: string) => {
  return await axios.post(`http://localhost:5000${pathRoutes.DELETE_SUB_TOPICS}`, { token, topic });
};
export const deleteCards = async (token: string, topic: string, subTopic: string) => {
  return await axios.post(`http://localhost:5000${pathRoutes.DELETE_CARDS}`, {
    token,
    topic,
    subTopic,
  });
};
