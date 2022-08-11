import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getSubTopic, getTopics } from "../../apis/myApis";
import { useAppDispatch } from "../../app/hooks";
import { routes, testMenu } from "../../utils/constantes/constantes";
import { setTestSubTopic, setTestTopic } from "../../features/application/appSlice";
import "./testModal.css";

type TTestModal = {
  title: string;
};

const TestModal: React.FC<TTestModal> = ({ title }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [choosenTopic, setChoosenTopic] = useState<string>("");
  const [choosenSubTopic, setChoosenSubTopic] = useState<string>("");
  const [dataSubtopic, setDataSubtopic] = useState<any>(null);
  const { data, isSuccess } = useQuery(["getTopics"], () => getTopics());

  useEffect(() => {
    if (title === testMenu.subtopic) {
      queryClient
        .fetchQuery(["getSubtopic", choosenTopic], () => getSubTopic(choosenTopic))
        .then(res => {
          res?.data && setDataSubtopic(res.data);
        });
    }
  }, [choosenTopic, queryClient, title]);

  return (
    <form className="test-modal">
      <p>Choose Your {title}</p>

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
        </select>
      </div>

      {title === testMenu.subtopic && (
        <div className="select-subtopic">
          <label htmlFor="SubTopic">Choose a Subtopic:</label>

          <select
            name="SubTopic"
            id="SubTopic"
            value={choosenSubTopic}
            disabled={choosenTopic.length === 0}
            onChange={e => {
              setChoosenSubTopic(e.target.value);
            }}
          >
            <option value=""></option>
            {dataSubtopic &&
              dataSubtopic.map((el: any, index: number) => {
                return (
                  <option key={index} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
          </select>
        </div>
      )}

      <button type="button" className="cancel btn" onClick={() => navigate(routes.test)}>
        Cancel
      </button>
      <button
        type="submit"
        className="submit btn"
        disabled={title === testMenu.subtopic && choosenSubTopic.length === 0}
        onClick={e => {
          e.preventDefault();
          if (choosenTopic.length > 0 && title === testMenu.topic) {
            dispatch(setTestTopic(choosenTopic));
            navigate(routes.testOptions + ":" + testMenu.topic);
          }
          if (
            choosenTopic.length > 0 &&
            choosenSubTopic.length > 0 &&
            title === testMenu.subtopic
          ) {
            dispatch(setTestSubTopic({ topic: choosenTopic, subtopic: choosenSubTopic }));
            navigate(routes.testOptions + ":" + testMenu.subtopic);
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default TestModal;
