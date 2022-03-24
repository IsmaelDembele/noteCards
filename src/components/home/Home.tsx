import React, { useContext, useState } from "react";
import { routes } from "../../constantes/constantes";
import { IMyContext, myContext } from "../../context/myContext";
import Cards from "../cards/Cards";
import Drawer from "../drawer/Drawer";
import Nav from "../nav/Nav";
import SubTopic from "../subTopic/SubTopic";
import Topics from "../topics/Topics";
import "./home.css";

const Home: React.FC = () => {
  // const [a] = useState("topics");
  const { state } = useContext(myContext) as IMyContext;

  return (
    <div className="home_page">
      <Nav />
      <main className="main">
        <Drawer />
        {state.route === routes.topics && <Topics />}
        {state.route === routes.subtopic && <SubTopic title={state.topic as string} />}
        {state.route === routes.cards && (
          <Cards topic={state.topic as string} subTopic={state.subTopic as string} />
        )}
        {/* {state.route === "card" && <Topic />}//card  */}
      </main>
    </div>
  );
};

export default Home;
