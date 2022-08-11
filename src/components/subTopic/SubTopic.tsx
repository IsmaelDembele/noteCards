import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSubTopic, deleteSubTopics, getSubTopic, renameSubTopic } from "../../apis/myApis";
import { routes } from "../../utils/constantes/constantes";
import { useAppDispatch } from "../../app/hooks";
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
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading } = useQuery(
    ["getSubtopic", topic],
    () => getSubTopic(topic),
    {
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  const mutation = useMutation(({ topic }: { topic: string }) => deleteSubTopics(topic), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getSubtopic", topic]);
    },
    onError: (error: Error) => {
      error && notify(error.message);
    },
  });

  const deleteSubTopicMutation = useMutation(
    ({ topic, subTopic }: TMutation) => deleteSubTopic(topic, subTopic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubtopic", topic]);
        setEdit(false);
      },
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  const renameSubTopicMutation = useMutation(
    ({ topic, subTopic, newSubTopic }: TMutation) =>
      renameSubTopic(topic, subTopic, newSubTopic as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubtopic", topic]);
        setEdit(false);
      },
    }
  );

  useEffect(() => {
    clearAllText === "DELETE" && mutation.mutate({ topic });
    setClearAllText("");
  }, [clearAllText, mutation, topic]);

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
