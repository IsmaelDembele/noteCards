import { Preview } from "@mui/icons-material";
import {
  localStorageRouteKey,
  localStorageSignInCredentialsKey,
  localStorageSubTopicKey,
  localStorageTopicKey,
  routes,
} from "../constantes/constantes";
import { IAction, IState } from "../context/myContext";

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "cardsHandleChange": {
      const { name, value } = action.payload as { name: string; value: string };
      return {
        ...state,
        card: { ...state.card, [name]: value },
      };
    }

    case "viewCards": {
      const { topic, subtopic } = action.payload as { topic: string; subtopic: string };
      localStorage.setItem(localStorageSubTopicKey, subtopic);
      localStorage.setItem(localStorageRouteKey, routes.cards);

      return {
        ...state,
        route: routes.cards,
        subTopic: subtopic,
        topic: topic,
        // topic: action.payload?.
      };
    }
    case "review": {
      localStorage.removeItem(localStorageRouteKey);
      localStorage.removeItem(localStorageTopicKey);
      return {
        ...state,
        route: routes.topics,
      };
    }

    case "viewSubtopics": {
      const newState = { ...state, route: "subTopic", topic: action.payload as string };
      localStorage.setItem(localStorageRouteKey, newState.route);

      return newState as IState;
    }

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
      //removed previous signin credentials
      return { ...state, isLogged: action.payload as boolean };
    }
    case "signOut": {
      localStorage.removeItem(localStorageRouteKey);
      localStorage.removeItem(localStorageSignInCredentialsKey);
      localStorage.removeItem(localStorageTopicKey);
      return {
        ...state,
        token: "",
        signin: { email: "" },
        route: "topics",
        isLogged: false,
        firstname: "",
        lastname: "",
      };
    }
    case "addTopic": {
      return {
        ...state,
        navInputTopicValue: action.payload as string,
      };
    }
    case "addSubTopic": {
      return {
        ...state,
        subtopicInputValue: action.payload as string,
      };
    }
    default:
      return state;
  }
};
