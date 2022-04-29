import { createSlice } from "@reduxjs/toolkit";
import {
  localStorageCardIdKey,
  localStorageRouteKey,
  localStorageSubTopicKey,
  localStorageTopicKey,
  routes,
} from "../../utils/constantes/constantes";

export interface IAppState {
  route: string;
  topic: string;
  subTopic: string;
  cardID: string;
  cardIndex: number;
  newCard: false;
  testTopic: string;
  testSubtopic: string;
  mobileDrawerVisible: boolean;
}

const initialState: IAppState = {
  route: localStorage.getItem(localStorageRouteKey) || routes.topics,
  topic: localStorage.getItem(localStorageTopicKey) || "",
  subTopic: localStorage.getItem(localStorageSubTopicKey) || "",
  cardID: localStorage.getItem(localStorageCardIdKey) || "",
  cardIndex: -1,
  newCard: false,
  testTopic: "",
  testSubtopic: "",
  mobileDrawerVisible: false,
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
      state.newCard = false;
    },
    viewCard: (state, action) => {
      localStorage.setItem(localStorageCardIdKey, action.payload);

      state.route = routes.card;
      state.cardIndex = action.payload;
    },
    nextCard: state => {
      state.cardIndex = state.cardIndex + 1;
    },
    previousCard: state => {
      state.cardIndex = state.cardIndex - 1;
    },
    setNewCard: (state, action) => {
      state.newCard = action.payload;
    },
    account: state => {
      localStorage.setItem(localStorageRouteKey, routes.account);
      localStorage.removeItem(localStorageTopicKey);
      localStorage.removeItem(localStorageSubTopicKey);
      localStorage.removeItem(localStorageCardIdKey);

      state.route = routes.account;
    },
    test: state => {
      localStorage.setItem(localStorageRouteKey, routes.test);
      localStorage.removeItem(localStorageTopicKey);
      localStorage.removeItem(localStorageSubTopicKey);
      localStorage.removeItem(localStorageCardIdKey);

      state.route = routes.test;
    },
    setTestTopic: (state, action) => {
      state.testTopic = action.payload;
    },
    setTestSubTopic: (state, action) => {
      state.testTopic = action.payload.topic;
      state.testSubtopic = action.payload.subtopic;
    },
    review: state => {
      localStorage.removeItem(localStorageRouteKey);
      localStorage.removeItem(localStorageTopicKey);
      localStorage.removeItem(localStorageSubTopicKey);
      localStorage.removeItem(localStorageCardIdKey);

      state.route = routes.topics;
    },
    toggleMobileDrawer: state => {
      state.mobileDrawerVisible = !state.mobileDrawerVisible;
    },
  },
});

export const {
  viewSubtopics,
  viewCards,
  review,
  setRoute,
  viewCard,
  nextCard,
  previousCard,
  setNewCard,
  test,
  account,
  setTestTopic,
  setTestSubTopic,
  toggleMobileDrawer,
} = appSlice.actions;

export default appSlice.reducer;
