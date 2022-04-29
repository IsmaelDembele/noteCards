import "./nav.css";
import { useMutation, useQueryClient } from "react-query";
import { postSubTopic, postTopic } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../features/authentication/authSlice";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import MyForm from "./MyForm";
import { errorMsg, routes } from "../../utils/constantes/constantes";
import { notify } from "../../utils/functions/function";
import LoadingBar from "../loadingBar/LoadingBar";
import { useMediaQuery } from "@mui/material";
import { toggleMobileDrawer } from "../../features/application/appSlice";

const Nav = () => {
  const mobileMatche = useMediaQuery("(max-width:600px)");
  const visibleMobileDrawer = useAppSelector(state => state.app.mobileDrawerVisible);
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
      onError: error => {
        error && notify(errorMsg);
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
      onError: error => {
        error && notify(errorMsg);
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
      {(mutation.isLoading || subTopicMutation.isLoading) && <LoadingBar />}
      <nav
        className="nav"
        style={mobileMatche && !visibleMobileDrawer ? { gridColumn: "1 / end" } : {}}
      >
        {mobileMatche && (
          <MenuIcon
            sx={{ fontSize: 23, marginLeft: "7%" }}
            style={{ cursor: "pointer" }}
            onClick={() => {dispatch(toggleMobileDrawer())}}
          />
        )}
        <MyForm handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />
        <button
          className="btn nav-btn"
          onClick={() => {
            dispatch(signOut());
          }}
        >
          sign out
        </button>
      </nav>
    </>
  );
};

export default Nav;
