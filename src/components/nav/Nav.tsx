import { useContext } from "react";
import { IMyContext, myContext } from "../../context/myContext";
import { AddCircle } from "@mui/icons-material";
import "./nav.css";

const Nav = () => {
  const { dispatch } = useContext(myContext) as IMyContext;

  return (
    <nav className="nav">
      <form className="nav-form">
        <input type="text" placeholder="Create a new topic" className="input" />
        <AddCircle className="nav-add-btn" sx={{ fontSize: 23 }} />
      </form>
      <button
        className="btn nav-btn"
        onClick={() => {
          dispatch({ type: "signOut" });
        }}
      >
        sign out
      </button>
    </nav>
  );
};

export default Nav;
