import React, { useContext } from "react";
import { IMyContext, myContext } from "../../context/myContext";
import "./drawer.css";

const Drawer = () => {
  const { state } = useContext(myContext) as IMyContext;
  return (
    <section className="drawer">
      <div className="welcome">Welcome {state.firstname}</div>

      <button className="btn menu">Review</button>
     <button className="btn menu">Test</button>
     <button className="btn menu">Grade</button>
    </section>
  );
};

export default Drawer;
