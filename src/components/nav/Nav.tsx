import "./nav.css";
import { useMutation, useQueryClient } from "react-query";
import { postSubTopic, postTopic } from "../../apis/myApis";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../features/authentication/authSlice";
import { useState } from "react";

import MyForm from "./MyForm";
import { routes } from "../../constantes/constantes";

const Nav = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const appState = useAppSelector(state => state.app);

  const mutation = useMutation(
    ({ topic, token }: { topic: string; token: string }) => postTopic({ topic, token }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries("getTopics");
      },
    }
  );

  const subTopicMutation = useMutation(
    ({ subtopic, topic, token }: { subtopic: string; topic: string; token: string }) =>
      postSubTopic({ subtopic, topic, token }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getSubtopic");
      },
    }
  );

  const handleSubmit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>,
    route: string
  ) => {
    e.preventDefault();

    if (route === routes.topics) {
      mutation.mutate({ topic: inputValue, token: token as string });
      setInputValue("");
    }
    if (route === routes.subtopic) {
      subTopicMutation.mutate({
        subtopic: inputValue,
        topic: appState.topic,
        token: token as string,
      });
      setInputValue("");
    }
  };

  return (
    <>
      {mutation.isLoading && <LinearProgress />}
      <nav className="nav">
        <MyForm handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />
        <button
          className="btn nav-btn"
          onClick={() => {
            console.log("signing out");
            dispatch(signOut());
            // dispatch(setRoute(routes.topics));
          }}
        >
          sign out
        </button>
      </nav>
    </>
  );
};

export default Nav;
