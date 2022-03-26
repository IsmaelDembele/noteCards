import React, { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { review } from "../../features/application/appSlice";
import "./drawer.css";

const Drawer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);
  return (
    <section className="drawer">
      <div className="welcome">Welcome {state.firstname}</div>

      <button className="btn menu" onClick={() => dispatch(review())}>
        Review
      </button>
      <button className="btn menu">Test</button>
      <button className="btn menu">Grade</button>
    </section>
  );
};

export default Drawer;
