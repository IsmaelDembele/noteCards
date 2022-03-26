import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  localStorageRouteKey,
  localStorageSignInCredentialsKey,
  localStorageSubTopicKey,
  localStorageTopicKey,
  routes,
} from "../../constantes/constantes";
// import { RootState } from "../../app/store";

export interface IAppState {
  route: string;
  topic: string;
  subTopic: string;
}

const storage = JSON.parse(localStorage.getItem(localStorageSignInCredentialsKey) as string);

const initialState: IAppState = {
  route: localStorage.getItem(localStorageRouteKey) || routes.topics,
  topic: localStorage.getItem(localStorageTopicKey) || "",
  subTopic: localStorage.getItem(localStorageSubTopicKey) || "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    viewSubtopics: (state, action) => {
      state.route = routes.subtopic;
      state.topic = action.payload;
      localStorage.setItem(localStorageRouteKey, routes.subtopic);
    },
    viewCards: (state, action) => {
      localStorage.setItem(localStorageSubTopicKey, action.payload.subTopic);
      localStorage.setItem(localStorageRouteKey, routes.cards);

      state.route = routes.cards;
      state.topic = action.payload.topic;
      state.subTopic = action.payload.subTopic;
    },
    review: state => {
      localStorage.removeItem(localStorageRouteKey);
      localStorage.removeItem(localStorageTopicKey);
      state.route = routes.topics;
    },
  },
});

export const { setRoute, viewSubtopics, viewCards, review } = appSlice.actions;

export default appSlice.reducer;
