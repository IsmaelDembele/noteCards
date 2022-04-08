import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSubTopic, deleteSubTopics, getSubTopic, renameSubTopic } from "../../apis/myApis";
import { routes } from "../../constantes/constantes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewCards } from "../../features/application/appSlice";
import { useNavigate } from "react-router-dom";
import MyModal from "../myModal/MyModal";
import { useState } from "react";

interface IProps {
  topic: string;
}

interface ISubTopic {
  _id: string;
  name: string;
  topicID: string;
}

type TMutation = {
  token: string;
  topic: string;
  subTopic: string;
  newSubTopic?: string;
};

const SubTopic: React.FC<IProps> = ({ topic }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token) as string;
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useQuery(["getSubtopic", topic, token], () =>
    getSubTopic(topic, token)
  );

  const mutation = useMutation(
    ({ token, topic }: { token: string; topic: string }) => deleteSubTopics(token, topic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubtopic", topic, token]);
      },
    }
  );

  const deleteSubTopicMutation = useMutation(
    ({ token, topic, subTopic }: TMutation) => deleteSubTopic(token, topic, subTopic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubtopic", topic, token]);
        setEdit(false);
      },
    }
  );

  const renameSubTopicMutation = useMutation(
    ({ token, topic, subTopic, newSubTopic }: TMutation) =>
      renameSubTopic(token, topic, subTopic, newSubTopic as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubtopic", topic, token]);
        setEdit(false);
      },
    }
  );

  return (
    <section className="sub-topic" onClick={() => edit && setEdit(false)}>
      <MyModal
        item="SubTopic"
        visibility={edit}
        data={isSuccess ? data?.data : []}
        openModal={setEdit}
        deleteItem={deleteSubTopicMutation}
        renameItem={renameSubTopicMutation}
      />

      <div className="sub-topic-title">
        <p>{topic}</p>
        <button className="btn" onClick={() => setEdit(!edit)}>
          Edit SubTopics
        </button>
        <button
          className="btn"
          onClick={() => {
            const result = prompt("This will delete all the subtopics: type DELETE to continue");
            result === "DELETE" && mutation.mutate({ token, topic });
          }}
        >
          Delete SubTopics
        </button>
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
