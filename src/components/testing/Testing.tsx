import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import "./testing.css";
import { notify } from "../../utils/functions/function";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constantes/constantes";

interface ITestVariable {
  index: number;
  score: number;
  finish: boolean;
  questionScored: number;
}

const initialValue: ITestVariable = {
  index: 0,
  score: 0,
  finish: false,
  questionScored: 0,
};

type TTesting = {
  data: any;
  isSuccess: boolean;
};
const timeoutTime = 500;

const Testing: React.FC<TTesting> = ({ data, isSuccess }) => {
  const [side, setSide] = useState<boolean>(true);
  const [testVariable, setTestVariable] = useState<ITestVariable>(initialValue);
  const [finish, setFinish] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && testVariable.questionScored === data?.data.length) {
      setFinish(true);
      console.log("############Finish##############");
    }
    // eslint-disable-next-line
  }, [testVariable.questionScored]);

  useEffect(() => {
    if (isSuccess && data?.data.length === 0) {
      notify(
        "This Topic or Subtopic does not contained any cards. Please create a card and try again."
      );
      navigate(routes.test, { replace: true });
    }
  }, [isSuccess, navigate, data?.data.length]);

  const wrong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (isSuccess) {
      setSide(true);
      //to wait for the animation - if not we my see the answer of the
      setTimeout(() => {
        const { index, finish, questionScored } = testVariable;
        if (isSuccess && !finish && index < data?.data.length - 1) {
          setTestVariable({
            ...testVariable,
            index: index + 1,
            questionScored: questionScored + 1,
          });
        } else {
          if (questionScored < data?.data.length) {
            setTestVariable({
              ...testVariable,
              questionScored: questionScored + 1,
              finish: true,
            });
          }
        }
      }, timeoutTime);
    }
  };
  const right = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (isSuccess) {
      setSide(true);
      //to wait for the animation - if not we my see the answer of the
      setTimeout(() => {
        const { index, score, finish, questionScored } = testVariable;
        if (!finish && index < data?.data.length - 1) {
          setTestVariable({
            ...testVariable,
            index: index + 1,
            score: score + 1,
            questionScored: questionScored + 1,
          });
        } else {
          if (questionScored < data?.data.length) {
            setTestVariable({
              ...testVariable,
              score: score + 1,
              questionScored: questionScored + 1,
              finish: true,
            });
          }
        }
      }, timeoutTime);
    }
  };

  if (isSuccess && data?.data.length === 0) {
    return <div>Error</div>;
  }

  return (
    <div className="testing">
      <div className="testing-question-number center">
        <span>
          {isSuccess ? `Question ${testVariable.index + 1} out of ${data?.data.length}` : ""}
        </span>
        <span className={finish ? "score" : ""}>
          {isSuccess ? `Score ${testVariable.score} / ${data?.data.length}` : ""}
        </span>
      </div>

      <div className="testing-check-answer center" onClick={() => setSide(!side)}>
        <span>Check</span>
      </div>
      <div className={`display_text testing-question ${side ? "" : "flip"}`}>
        <div className="text_front ">{isSuccess && data?.data[testVariable.index].front}</div>
        <div className="text_back">{isSuccess && data?.data[testVariable.index].back}</div>
      </div>

      <div className="testing-wrong center" onClick={e => wrong(e)}>
        <CloseRoundedIcon sx={{ fontSize: "50px" }} />
      </div>
      <div className="testing-right center" onClick={e => right(e)}>
        <CheckRoundedIcon sx={{ fontSize: "50px" }} />
      </div>
      <textarea className="testing-answer-box" placeholder="Type your answer here..."></textarea>
    </div>
  );
};

export default Testing;
