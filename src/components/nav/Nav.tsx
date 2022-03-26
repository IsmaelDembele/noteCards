import "./nav.css";
import { useMutation, useQueryClient } from "react-query";
import { postTopic } from "../../apis/myApis";
import { AddCircle } from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../features/authentication/authSlice";
import { setRoute } from "../../features/application/appSlice";
import { routes } from "../../constantes/constantes";
import { useState } from "react";

const Nav = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);
  const mutation = useMutation((value: string) => postTopic(value), {
    onSuccess: data => {
      queryClient.invalidateQueries("getTopics");
    },
  });

  const handleSubmit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    mutation.mutate(inputValue);
    setInputValue("");
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
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <AddCircle className="nav-add-btn" sx={{ fontSize: 23 }} onClick={e => handleSubmit(e)} />
        </form>
        <button
          className="btn nav-btn"
          onClick={() => {
            console.log("signing out");
            dispatch(signOut());
            dispatch(setRoute(routes.topics));
          }}
        >
          sign out
        </button>
      </nav>
    </>
  );
};

export default Nav;
