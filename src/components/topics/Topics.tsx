import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTopic, deleteTopics, getTopics, renameTopic } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewSubtopics } from "../../features/application/appSlice";
import "./topics.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constantes/constantes";
import MyModal from "../myModal/MyModal";
import { useEffect, useState } from "react";
import LoadingBar from "../loadingBar/LoadingBar";
import { notify } from "../../utils/functions/function";
import { useMediaQuery } from "@mui/material";
import ClearAll from "../clearAll/ClearAll";

export interface ITopics {
  _id?: string;
  name: string;
}

const Topics = () => {
  const mobileMatche = useMediaQuery("(max-width:600px)");
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [edit, setEdit] = useState<boolean>(false);
  const [showClearAll, setShowClearAll] = useState<boolean>(false);
  const [clearAllText, setClearAllText] = useState<string>("");
  const token = useAppSelector(state => state.auth.token) as string;
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useQuery(["getTopics", token], () => getTopics(token), {
    onError: (error: Error) => {
      error && notify(error.message);
    },
  });

  const deleteTopicsMutation = useMutation((token: string) => deleteTopics(token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getTopics", token]);
    },
    onError: (error: Error) => {
      error && notify(error.message);
    },
  });

  const deleteTopicMutation = useMutation(
    ({ topic, token }: { topic: string; token: string }) => deleteTopic(topic, token),
    {
      onSuccess: () => {
        setEdit(false);
        queryClient.invalidateQueries(["getTopics", token]);
      },
      onError: (error: Error) => {
        error && notify(error.message);
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
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  useEffect(() => {
    clearAllText === "DELETE" && deleteTopicsMutation.mutate(token);
    setClearAllText("");
  }, [clearAllText, deleteTopicsMutation, token]);

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
      {(isLoading || deleteTopicsMutation.isLoading || deleteTopicMutation.isLoading) && (
        <LoadingBar />
      )}
      {showClearAll && <ClearAll name="Topics" show={setShowClearAll} setText={setClearAllText} />}

      <div className="topics-title">
        <p>Topics</p>

        <button className="btn" onClick={() => setEdit(!edit)}>
          {mobileMatche ? "Edit" : "Edit Topics"}
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
