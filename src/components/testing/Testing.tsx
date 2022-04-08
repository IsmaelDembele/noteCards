import { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import "./testing.css";
import { useQuery } from "react-query";
import { useAppSelector } from "../../app/hooks";
import { getAllCards } from "../../apis/myApis";

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

const timeoutTime = 500;

const Testing: React.FC = () => {
  const token = useAppSelector(state => state.auth.token) as string;
  const { data, isSuccess } = useQuery(["everything", token], () => getAllCards(token));
  const [side, setSide] = useState<boolean>(true);
  const [testVariable, setTestVariable] = useState<ITestVariable>(initialValue);

  useEffect(() => {
    if (isSuccess && testVariable.questionScored === data?.data.length) {
      console.log("############Finish##############");
    }
  }, [testVariable.questionScored]);

  const wrong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (isSuccess) {
      setSide(true);
      //to wait for the animation - if not we my see the answer of the
      setTimeout(() => {
        const { index, finish, questionScored } = testVariable;
        console.log(testVariable);
        if (isSuccess && !finish && index < data?.data.length - 1) {
          setTestVariable({
            ...testVariable,
            index: index + 1,
            questionScored: questionScored + 1,
          });
        } else {
          if (questionScored < data.data.length) {
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
          if (questionScored < data.data.length) {
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

  return (
    <section className="testing">
      <div className="testing-question-number center">
        <span>
          {isSuccess ? `Question ${testVariable.index + 1} out of ${data.data.length}` : ""}
        </span>
        <span>{isSuccess ? `Score ${testVariable.score} / ${data.data.length}` : ""}</span>
      </div>

      <div className="testing-check-answer center" onClick={() => setSide(!side)}>
        <span>Check</span>
      </div>
      <div className={`display_text  ${side ? "" : "flip"}`}>
        <div className="text_front">{isSuccess && data.data[testVariable.index].front}</div>
        <div className="text_back">{isSuccess && data.data[testVariable.index].back}</div>
      </div>

      <div className="testing-wrong center" onClick={e => wrong(e)}>
        <CloseRoundedIcon sx={{ fontSize: "50px" }} />
      </div>
      <div className="testing-right center" onClick={e => right(e)}>
        <CheckRoundedIcon sx={{ fontSize: "50px" }} />
      </div>
      <textarea className="testing-answer-box" placeholder="Type your answer here..."></textarea>
    </section>
  );
};

export default Testing;
