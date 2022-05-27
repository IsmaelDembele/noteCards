import { createSlice } from "@reduxjs/toolkit";
import {
  localStorageCardIdKey,
  localStorageRouteKey,
  localStorageSubTopicKey,
  localStorageTopicKey,
  routeExpirationTime,
  routes,
} from "../../utils/constantes/constantes";
import { get, set } from "../../utils/functions/function";

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
  route: get(localStorageRouteKey) || routes.topics,
  topic: get(localStorageTopicKey) || "",
  subTopic: get(localStorageSubTopicKey) || "",
  cardID: get(localStorageCardIdKey) || "",
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

      set(localStorageRouteKey, routes.subtopic, routeExpirationTime);
      set(localStorageTopicKey, action.payload, routeExpirationTime);
    },
    viewCards: (state, action) => {
      set(localStorageTopicKey, action.payload.topic, routeExpirationTime);
      set(localStorageSubTopicKey, action.payload.subTopic, routeExpirationTime);
      set(localStorageRouteKey, routes.cards, routeExpirationTime);

      state.route = routes.cards;
      state.topic = action.payload.topic;
      state.subTopic = action.payload.subTopic;
      state.newCard = false;
    },
    viewCard: (state, action) => {
      set(localStorageCardIdKey, action.payload, routeExpirationTime);

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
      set(localStorageRouteKey, routes.account, routeExpirationTime);
      localStorage.removeItem(localStorageTopicKey);
      localStorage.removeItem(localStorageSubTopicKey);
      localStorage.removeItem(localStorageCardIdKey);

      state.route = routes.account;
    },
    test: state => {
      set(localStorageRouteKey, routes.test, routeExpirationTime);
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
