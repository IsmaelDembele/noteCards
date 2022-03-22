import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../drawer/Drawer";
import Nav from "../nav/Nav";
import Topic from "../topic/Topic";
import Topics from "../topics/Topics";
import "./home.css";

const Home: React.FC = () => {
  const [a] = useState('topics');
  return (
    <div className="home_page">
      <Nav />
      <main className="main">
        <Drawer />
        {a === 'topics' && <Topics />}
        {a === 'topic' && <Topic />}
        {a === 'cards' && <Topic />}
        {a === 'card' && <Topic />}

      </main>
    </div>
  );
};

export default Home;
