import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTopics, getTopics } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewSubtopics } from "../../features/application/appSlice";
import "./topics.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constantes/constantes";

export interface ITopics {
  _id?: string;
  name: string;
}

const Topics = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token) as string;
  const queryClient = useQueryClient();
  const { data, isError, isSuccess } = useQuery(["getTopics", token], () => getTopics(token));

  const deleteTopicsMutation = useMutation((token: string) => deleteTopics(token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getTopics", token]);
    },
  });

  if (isError) return <div>Error...</div>;

  return (
    <section className="topics">
      <div className="topics-title">
        <p>Topics</p>
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
