import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTopic, deleteTopics, getTopics, renameTopic } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewSubtopics } from "../../features/application/appSlice";
import "./topics.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constantes/constantes";
import MyModal from "../myModal/MyModal";
import { useState } from "react";
import { string } from "yup";

export interface ITopics {
  _id?: string;
  name: string;
}

const Topics = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [edit, setEdit] = useState<boolean>(false);
  const token = useAppSelector(state => state.auth.token) as string;
  const queryClient = useQueryClient();
  const { data, isError, isSuccess } = useQuery(["getTopics", token], () => getTopics(token));

  const deleteTopicsMutation = useMutation((token: string) => deleteTopics(token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getTopics", token]);
    },
  });

  const deleteTopicMutation = useMutation(
    ({ topic, token }: { topic: string; token: string }) => deleteTopic(topic, token),
    {
      onSuccess: () => {
        setEdit(false);
        queryClient.invalidateQueries(["getTopics", token]);
      },
    }
  );

  const renameTopicMutation = useMutation(
    ({ token, topic, newTopic }: { token: string; topic: string; newTopic: string }) =>
      renameTopic(token, topic, newTopic),
    {
      onSuccess: () => {
        setEdit(false);
        queryClient.invalidateQueries(["getTopics", token]);
      },
    }
  );

  if (isError) return <div>Error...</div>;

  return (
    <section className="topics">
      <MyModal
        item="Topic"
        visibility={edit}
        data={isSuccess ? data?.data : []}
        openModal={setEdit}
        deleteItem={deleteTopicMutation}
        renameItem={renameTopicMutation}
      />

      <div className="topics-title">
        <p>Topics</p>

        <button className="btn" onClick={() => setEdit(!edit)}>
          Edit Topics
        </button>

        <button
          className="btn"
          onClick={() => {
            const result = prompt(
              "This will delete all the Topics and Subtopics: type DELETE to continue"
            );
            result === "DELETE" && deleteTopicsMutation.mutate(token);
          }}
        >
          Delete Topics
        </button>
      </div>

      {isError && <div>An error occured</div>}
      <div className="list-items">
        {isSuccess &&
          typeof data?.data === "object" &&
          data?.data.map((el: ITopics, index: number) => {
            return (
              <div
                key={index}
                className="item"
                onClick={e => {
                  e.preventDefault();
                  dispatch(viewSubtopics(el.name));
                  navigate(routes.subtopic);
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

export default Topics;
