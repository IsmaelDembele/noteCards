import React, { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes } from "../../constantes/constantes";
import Cards from "../cards/Cards";
import Drawer from "../drawer/Drawer";
import Nav from "../nav/Nav";
import SubTopic from "../subTopic/SubTopic";
import Topics from "../topics/Topics";
import "./home.css";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app);

  return (
    <div className="home_page">
      <Nav />
      <main className="main">
        <Drawer />
        {appState.route === routes.topics && <Topics />}
        {appState.route === routes.subtopic && <SubTopic title={appState.topic} />}
        {appState.route === routes.cards && (
          <Cards topic={appState.topic as string} subTopic={appState.subTopic as string} />
        )}

        {/* {state.route === "card" && <Topic />}//card  */}
      </main>
    </div>
  );
};

export default Home;
