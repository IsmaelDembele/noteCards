import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSubTopic, postSubTopic } from "../../apis/myApis";
import { localStorageTopicKey, routes } from "../../constantes/constantes";
import { useAppDispatch } from "../../app/hooks";
import { viewCards } from "../../features/application/appSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
}

interface ISubTopic {
  _id: string;
  name: string;
  topicID: string;
}

const SubTopic: React.FC<IProps> = ({ title }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const mutation = useMutation(
    ({ subtopic, topic }: { subtopic: string; topic: string }) => postSubTopic({ subtopic, topic }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getSubtopic");
      },
    }
  );
  const { data, isSuccess } = useQuery(["getSubtopic", title], () => getSubTopic(title), {
    onSuccess: () => {
      localStorage.setItem(localStorageTopicKey, title);
    },
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate({ subtopic: inputValue as string, topic: title });
    setInputValue("");
  };

  if (isSuccess) console.log("subtopic", title);

  return (
    <section className="sub-topic">
      <div className="sub-topic-title">
        <p>{title}'s subtopics</p>
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
                  dispatch(viewCards({ topic: title, subTopic: el.name }));
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
