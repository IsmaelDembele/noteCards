import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllCardsOfTopic, getTopics } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes, testMenu } from "../../constantes/constantes";
import { setTestTopic } from "../../features/application/appSlice";
import Testing from "../testing/Testing";
import "./testModal.css";

type TTestModal = {
  title: string;
};

const TestModal: React.FC<TTestModal> = ({ title }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [choosenTopic, setChoosenTopic] = useState<string>("");
  const token = useAppSelector(state => state.auth.token) as string;
  const { data, isSuccess } = useQuery(["getTopics", token], () => getTopics(token));
  // const { data: dataTopic, isSuccess: isSuccessTopic } = useQuery(
  //   ["getbyTopic", token, choosenTopic],
  //   () => getAllCardsOfTopic(token, choosenTopic)
  // );

  // console.log(dataTopic, isSuccessTopic);

  return (
    <form className="test-modal">
      <p>Choose Your Topic</p>

      <div className="select-topic">
        <label htmlFor="Topic">Choose a topic:</label>

        <select
          name="Topic"
          id="Topic"
          value={choosenTopic}
          onChange={e => setChoosenTopic(e.target.value)}
        >
          <option value=""></option>
          {isSuccess &&
            data?.data.map((el: any, index: number) => {
              return (
                <option key={index} value={el.name}>
                  {el.name}
                </option>
              );
            })}

          {/* <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>  */}
        </select>
      </div>

      {/* <div className="select-subtopic">
        <label htmlFor="cars">Choose a car:</label>

        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div> */}

      <button type="button" className="cancel btn">
        Cancel
      </button>
      <button
        type="submit"
        className="submit btn"
        onClick={e => {
          e.preventDefault();
          if (choosenTopic.length > 0) {
            dispatch(setTestTopic(choosenTopic));
            navigate(routes.testOptions + ":" + testMenu.topic);
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default TestModal;
