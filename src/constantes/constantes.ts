export const localStorageAuthTokenKey = "token";
export const localStorageRouteKey = "route";
export const localStorageTopicKey = "topic";
export const localStorageSubTopicKey = "subTopic";
export const localStorageCardIdKey = "cardId";
export const routes = {
  topics: "/",
  subtopic: "/subTopic",
  cards: "/cards",
  card: "/card",
  signin: "/signin",
  signup: "/signup",
  test: "/test",
  testOptions: "/testOPtions",
};

export const testMenu = {
  everything: "everything",
  topic: "Topic",
  subtopic: "Subtopics",
};

export let currentSubTopic: string = "";
