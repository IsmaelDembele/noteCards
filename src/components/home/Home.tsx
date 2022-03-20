import React from "react";
import Drawer from "../drawer/Drawer";
import Nav from "../nav/Nav";
import Topics from "../topics/Topics";
import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="home_page">
      <Nav />
      <main className="main">
        <Drawer />
        <Topics />
      </main>
    </div>
  );
};

export default Home;
