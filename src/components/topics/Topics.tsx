import React, { useState } from "react";
import "./topics.css";

const Topics = () => {
  const [data] = useState([
    {
      title: "Cyber Security",
    },
    {
      title: "Cyber Security",
    },
    {
      title: "Cyber Security",
    },
    {
      title: "Cyber Security",
    },
    {
      title: "Cyber Security",
    },
    {
      title: "Cyber Security",
    },
    {
      title: "Cyber Security",
    },
  ]);
  return (
    <section className="topics">
      <div className="topics-title">Topics</div>
      {data.map((el, index) => {
        return (
          <div key={index} className="topics-items">
            {el.title}
          </div>
        );
      })}
    </section>
  );
};

export default Topics;
