import { useContext } from "react";
import { IMyContext, myContext } from "../../context/myContext";
import { AddCircle } from "@mui/icons-material";
import "./nav.css";
import { Outlet } from "react-router-dom";

const Nav = () => {
  const { dispatch, state } = useContext(myContext) as IMyContext;

  return (
    <>
      <nav className="nav">
        <form className="nav-form">
          <input
            type="text"
            placeholder="Create a new topic"
            className="input"
            value={state.navAddTopic}
            onChange={e => dispatch({ type: "addTopic", payload: e.target.value })}
          />
          <AddCircle className="nav-add-btn" sx={{ fontSize: 23 }} />
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
