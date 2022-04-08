import React from "react";
import { useNavigate } from "react-router-dom";
import { routes, testMenu } from "../../constantes/constantes";
import "./test.css";

const Test = () => {
  const navigate = useNavigate();

  return (
    <section className="test">
      <div className="test-title center">Test your knowledge</div>
      <div className="test-menu">
        <div
          className="test-everything center"
          onClick={() => navigate(routes.testOptions + ":" + testMenu.everything)}
        >
          everything
        </div>
        <div
          className="test-topics center"
          onClick={() => navigate(routes.testOptions + ":" + testMenu.topics)}
        >
          by topic
        </div>
        <div
          className="test-subTopics center"
          onClick={() => navigate(routes.testOptions + ":" + testMenu.subtopics)}
        >
          by subtopics
        </div>
      </div>
    </section>
  );
};

export default Test;
