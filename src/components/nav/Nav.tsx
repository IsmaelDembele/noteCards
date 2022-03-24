import { useContext } from "react";
import { IMyContext, myContext } from "../../context/myContext";
import "./nav.css";
import { focusManager, useMutation, useQueryClient } from "react-query";
import { postTopic } from "../../apis/myApis";
import { AddCircle } from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";

const Nav = () => {
  const queryClient = useQueryClient();

  const { dispatch, state } = useContext(myContext) as IMyContext;
  const mutation = useMutation((value: string) => postTopic(value), {
    onSuccess: data => {
      // focusManager.setFocused(true);
      queryClient.invalidateQueries("getTopics");
    },
  });

  const handleSubmit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    mutation.mutate(state?.navInputTopicValue as string);
    state.navInputTopicValue = "";
  };

  return (
    <>
      {mutation.isLoading && <LinearProgress />}
      <nav className="nav">
        <form className="nav-form" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Create a new topic"
            className="nav-input"
            value={state.navInputTopicValue}
            onChange={e => dispatch({ type: "addTopic", payload: e.target.value })}
          />
          <AddCircle className="nav-add-btn" sx={{ fontSize: 23 }} onClick={e => handleSubmit(e)} />
        </form>
        <button
          className="btn nav-btn"
          onClick={() => {
            console.log("signing out");
            dispatch({ type: "signOut" });
          }}
        >
          sign out
        </button>
      </nav>
    </>
  );
};

export default Nav;
