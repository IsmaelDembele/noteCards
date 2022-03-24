import React, { useContext } from "react";
import { AddCircle } from "@mui/icons-material";
import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSubTopic, postSubTopic } from "../../apis/myApis";
import { IMyContext, myContext } from "../../context/myContext";
import { localStorageTopicKey } from "../../constantes/constantes";

interface IProps {
  title: string;
}

interface ISubTopic {
  _id: string;
  name: string;
  topicID: string;
}

const SubTopic: React.FC<IProps> = props => {
  const { title } = props;
  const queryClient = useQueryClient();
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
  const { state, dispatch } = useContext(myContext) as IMyContext;

  const handleSubmit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate({ subtopic: state?.subtopicInputValue as string, topic: title });
    state.subtopicInputValue = "";
  };

  if (isSuccess) console.log("subtopic", title);

  return (
    <section className="topic">
      <div className="title">
        <p>{title}'s subtopics</p>
        <form className="add-subtopic" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Enter a new subTopic"
            className="input"
            value={state?.subtopicInputValue}
            onChange={e => dispatch({ type: "addSubTopic", payload: e.target.value })}
          />
          <AddCircle sx={{ fontSize: "23" }} className="btn" onClick={e => handleSubmit(e)} />
        </form>
      </div>
      {isSuccess &&
        data?.data.map((el: ISubTopic, index: number) => {
          return (
            <div
              className="topic-items"
              key={index}
              onClick={() => {
                dispatch({ type: "viewCards", payload: {topic: title, subtopic: el.name} });
              }}
            >
              {el.name}
            </div>
          );
        })}
    </section>
  );
};

export default SubTopic;
