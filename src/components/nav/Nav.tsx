import "./nav.css";
import { useMutation, useQueryClient } from "react-query";
import { postSubTopic, postTopic, _path } from "../../apis/myApis";
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
import axios from "axios";

const Nav = () => {
  const mobileMatche = useMediaQuery("(max-width:600px)");
  const visibleMobileDrawer = useAppSelector(state => state.app.mobileDrawerVisible);
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app);

  const mutation = useMutation(({ topic }: { topic: string }) => postTopic({ topic }), {
    onSuccess: data => {
      queryClient.invalidateQueries("getTopics");
    },
    onError: error => {
      error && notify(errorMsg);
    },
  });

  const subTopicMutation = useMutation(
    ({ subtopic, topic }: { subtopic: string; topic: string }) => postSubTopic({ subtopic, topic }),
    {
      onSuccess: data => {
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
      mutation.mutate({ topic: inputValue });
      setInputValue("");
    }
    if (route === routes.subtopic) {
      subTopicMutation.mutate({
        subtopic: inputValue,
        topic: appState.topic,
      });
      setInputValue("");
    }
  };

  //signout
  const signOutMutation = useMutation(() => axios.post(`${_path}${routes.signout}`), {
    onSuccess: () => {
      console.log("signOut");
      dispatch(signOut());
    },
  });

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
            onClick={() => {
              dispatch(toggleMobileDrawer());
            }}
          />
        )}
        <MyForm handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />
        <button
          className="btn nav-btn"
          onClick={() => {
            signOutMutation.mutate();
          }}
        >
          sign out
        </button>
      </nav>
    </>
  );
};

export default Nav;
