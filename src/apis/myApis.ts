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
  DELETE_TOPIC: "/deleteTopic",
  DELETE_SUB_TOPICS: "/deleteSubTopics",
  DELETE_SUB_TOPIC: "/deleteSubTopic",
  DELETE_CARD: "/deleteCard",
  DELETE_CARDS: "/deleteCards",
  DELETE_ACCOUNT: "/deleteAccount",
  RENAME_TOPIC: "/renameTopic",
  RENAME_SUB_TOPIC: "/renameSubTopic",
  GET_ALL_CARDS: "/getAllCards",
  GEL_ALL_CARDS_OF_TOPIC: "/getAllCardsOfTopic",
  CHANGE_PASSWORD: "/changePassword",
};

export const _path: string = process.env.REACT_APP_PATH as string;

export const getCard = async (topic: string, subTopic: string) => {
  if (!topic || !subTopic) return null;
  return await axios.get(`${_path}${pathRoutes.GET_CARD}/?topic=${topic}&subTopic=${subTopic}`);
};

export const getCards = async (topic: string, subTopic: string) => {
  return await axios.get(`${_path}${pathRoutes.GET_CARDS}/?topic=${topic}&subTopic=${subTopic}`);
};

export const addCards = async ({ topic, subTopic, front, back, note }: IReadCard) => {
  return await axios.post(`${_path}${pathRoutes.ADD_CARDS}`, {
    topic,
    subTopic,
    front,
    back,
    note,
  });
};

export const getSubTopic = async (topic: string) => {
  if (topic.length === 0) return null;

  return await axios.get(`${_path}${pathRoutes.GET_SUB_TOPIC}/?topic=${topic}`);
};

export const postSubTopic = async ({ subtopic, topic }: { subtopic: string; topic: string }) => {
  if (subtopic.length === 0) return null;

  return await axios.post(`${_path}${pathRoutes.POST_SUB_TOPIC}`, {
    subtopic,
    topic,
  });
};

export const getTopics = async () => {
  return await axios.get(`${_path}${pathRoutes.GET_TOPIC}/`);
};

export const postTopic = async ({ topic }: { topic: string }) => {
  if (topic.length < 1) return null;
  return await axios.post(`${_path}${pathRoutes.POST_TOPIC}`, { topic });
};

//islogged axios
export const getLogged = async () => {
  return await axios.get(`${_path}${pathRoutes.IS_LOGGED}/`);
};

export const postLogged = async (logginInfo: IAuthState) => {
  return await axios.post(
    `${_path}${pathRoutes.SIGN_IN}`,
    { logginInfo }
    // { withCredentials: false }
  );
};

export const postCreateAccount = async (signupInfo: ISignup) => {
  return await await axios.post(`${_path}${pathRoutes.CREATE_ACCOUNT}`, {
    signupInfo,
  });
};

export const updateCard = async (
  topic: string,
  subTopic: string,
  front: string,
  back: string,
  note: string,
  cardID: string
) => {
  return await axios.post(`${_path}${pathRoutes.UPDATE_CARD}`, {
    topic,
    subTopic,
    front,
    back,
    note,
    cardID,
  });
};

export const deleteCard = async (cardID: string) => {
  return await axios.post(`${_path}${pathRoutes.DELETE_CARD}`, { cardID });
};

export const deleteTopics = async () => {
  return await axios.post(`${_path}${pathRoutes.DELETE_TOPICS}`);
};

export const deleteSubTopics = async (topic: string) => {
  return await axios.post(`${_path}${pathRoutes.DELETE_SUB_TOPICS}`, { topic });
};

export const deleteCards = async (topic: string, subTopic: string) => {
  return await axios.post(`${_path}${pathRoutes.DELETE_CARDS}`, {
    topic,
    subTopic,
  });
};

export const deleteTopic = async (topic: string) => {
  return await axios.post(`${_path}${pathRoutes.DELETE_TOPIC}`, { topic });
};

export const renameTopic = async (topic: string, newTopic: string) => {
  return await axios.post(`${_path}${pathRoutes.RENAME_TOPIC}`, {
    topic,
    newTopic,
  });
};

export const deleteSubTopic = async (topic: string, subTopic: string) => {
  return await axios.post(`${_path}${pathRoutes.DELETE_SUB_TOPIC}`, {
    topic,
    subTopic,
  });
};

export const renameSubTopic = async (topic: string, subTopic: string, newSubTopic: string) => {
  return await axios.post(`${_path}${pathRoutes.RENAME_SUB_TOPIC}`, {
    topic,
    subTopic,
    newSubTopic,
  });
};

export const getAllCards = async () => {
  return await axios.post(`${_path}${pathRoutes.GET_ALL_CARDS}`);
};

export const getAllCardsOfTopic = async (topic: string) => {
  if (topic.length === 0) return null;
  return await axios.get(`${_path}${pathRoutes.GEL_ALL_CARDS_OF_TOPIC}/?&topic=${topic}`);
};

export const deleteAccount = async (password: string) => {
  if (!password) return null;
  return await axios.post(`${_path}${pathRoutes.DELETE_ACCOUNT}`, { password });
};

export const changePassword = async (password: string, newPassword: string) => {
  if (!password) return null;
  return await axios.post(`${_path}${pathRoutes.CHANGE_PASSWORD}`, {
    password,
    newPassword,
  });
};
