import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { routes, testMenu } from "../../constantes/constantes";
import { setTestTopic } from "../../features/application/appSlice";
import "./test.css";

const Test = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  dispatch(setTestTopic(""));

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
          onClick={() => navigate(routes.testOptions + ":" + testMenu.topic)}
        >
          by topic
        </div>
        <div
          className="test-subTopics center"
          onClick={() => navigate(routes.testOptions + ":" + testMenu.subtopic)}
        >
          by subtopics
        </div>
      </div>
    </section>
  );
};

export default Test;