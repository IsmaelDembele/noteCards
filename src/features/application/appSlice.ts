import { createSlice } from "@reduxjs/toolkit";
import {
  localStorageCardIdKey,
  localStorageRouteKey,
  localStorageSubTopicKey,
  localStorageTopicKey,
  routes,
} from "../../constantes/constantes";
// import { RootState } from "../../app/store";

export interface IAppState {
  route: string;
  topic: string;
  subTopic: string;
  cardID: string;
  cardIndex: number;
}

const initialState: IAppState = {
  route: localStorage.getItem(localStorageRouteKey) || routes.topics,
  topic: localStorage.getItem(localStorageTopicKey) || "",
  subTopic: localStorage.getItem(localStorageSubTopicKey) || "",
  cardID: localStorage.getItem(localStorageCardIdKey) || "",
  cardIndex: -1,
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
      localStorage.setItem(localStorageTopicKey, action.payload);
    },
    viewCards: (state, action) => {
      localStorage.setItem(localStorageTopicKey, action.payload.topic);
      localStorage.setItem(localStorageSubTopicKey, action.payload.subTopic);
      localStorage.setItem(localStorageRouteKey, routes.cards);

      state.route = routes.cards;
      state.topic = action.payload.topic;
      state.subTopic = action.payload.subTopic;
    },
    viewCard: (state, action) => {
      localStorage.setItem(localStorageRouteKey, routes.card);
      localStorage.setItem(localStorageCardIdKey, action.payload);

      state.route = routes.card;
      // state.cardID = action.payload;
      state.cardIndex = action.payload;
    },
    nextCard: state => {
      state.cardIndex = state.cardIndex + 1;
    },
    previousCard: state => {
      state.cardIndex = state.cardIndex - 1;
    },
    review: state => {
      localStorage.removeItem(localStorageRouteKey);
      localStorage.removeItem(localStorageTopicKey);
      localStorage.removeItem(localStorageSubTopicKey);
      localStorage.removeItem(localStorageCardIdKey);

      state.route = routes.topics;
    },
  },
});

export const { viewSubtopics, viewCards, review, setRoute, viewCard, nextCard, previousCard } =
  appSlice.actions;

export default appSlice.reducer;
