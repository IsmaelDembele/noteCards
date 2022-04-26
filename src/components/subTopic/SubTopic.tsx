import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSubTopic, deleteSubTopics, getSubTopic, renameSubTopic } from "../../apis/myApis";
import { routes } from "../../utils/constantes/constantes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewCards } from "../../features/application/appSlice";
import { useNavigate } from "react-router-dom";
import MyModal from "../myModal/MyModal";
import { useEffect, useState } from "react";
import { notify } from "../../utils/functions/function";
import LoadingBar from "../loadingBar/LoadingBar";
import { useMediaQuery } from "@mui/material";
import ClearAll from "../clearAll/ClearAll";

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
  const mobileMatche = useMediaQuery("(max-width:600px)");
  const [edit, setEdit] = useState<boolean>(false);
  const [showClearAll, setShowClearAll] = useState<boolean>(false);
  const [clearAllText, setClearAllText] = useState<string>("");
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token) as string;
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading } = useQuery(
    ["getSubtopic", topic, token],
    () => getSubTopic(topic, token),
    {
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  const mutation = useMutation(
    ({ token, topic }: { token: string; topic: string }) => deleteSubTopics(token, topic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubtopic", topic, token]);
      },
      onError: (error: Error) => {
        error && notify(error.message);
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
      onError: (error: Error) => {
        error && notify(error.message);
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

  useEffect(() => {
    clearAllText === "DELETE" && mutation.mutate({ token, topic });
    setClearAllText("");
  }, [clearAllText,mutation,token,topic]);

  return (
    <section className="sub-topic">
      <MyModal
        item="SubTopic"
        visibility={edit}
        data={isSuccess ? data?.data : []}
        openModal={setEdit}
        deleteItem={deleteSubTopicMutation}
        renameItem={renameSubTopicMutation}
      />
      {(isLoading ||
        renameSubTopicMutation.isLoading ||
        deleteSubTopicMutation.isLoading ||
        mutation.isLoading) && <LoadingBar />}
      {showClearAll && (
        <ClearAll name="Subtopics" show={setShowClearAll} setText={setClearAllText} />
      )}

      <div className="sub-topic-title">
        <p>{topic}</p>
        <button className="btn" onClick={() => setEdit(!edit)}>
          {mobileMatche ? "Edit" : "Edit SubTopics"}
        </button>
        <button
          className="btn"
          onClick={() => {
            setShowClearAll(true);
          }}
        >
          Clear All
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
