import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSubTopic, postSubTopic } from "../../apis/myApis";
import { routes } from "../../constantes/constantes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewCards } from "../../features/application/appSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  topic: string;
}

interface ISubTopic {
  _id: string;
  name: string;
  topicID: string;
}

const SubTopic: React.FC<IProps> = ({ topic }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token) as string;

  const mutation = useMutation(
    ({ subtopic, topic, token }: { subtopic: string; topic: string; token: string }) =>
      postSubTopic({ subtopic, topic, token }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getSubtopic");
      },
    }
  );
  const { data, isSuccess } = useQuery(["getSubtopic", topic, token], () =>
    getSubTopic(topic, token)
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate({ subtopic: inputValue as string, topic: topic, token: token as string });
    setInputValue("");
  };

  return (
    <section className="sub-topic">
      <div className="sub-topic-title">
        <p>{topic}'s subtopics</p>
        <form className="add-subtopic" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Enter a new subTopic"
            className="input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <AddCircle sx={{ fontSize: "23" }} className="btn" onClick={e => handleSubmit(e)} />
        </form>
      </div>
      <div className="list-items">
        {isSuccess &&
          data?.data.map((el: ISubTopic, index: number) => {
            return (
              <div
                className="item"
                key={index}
                onClick={e => {
                  e.preventDefault();
                  dispatch(viewCards({ topic: topic, subTopic: el.name }));
                  navigate(routes.cards);
                }}
              >
                {el.name}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default SubTopic;
