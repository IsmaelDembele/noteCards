import "./subTopic.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSubTopics, getSubTopic } from "../../apis/myApis";
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
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token) as string;

  const mutation = useMutation(
    ({ token, topic }: { token: string; topic: string }) => deleteSubTopics(token, topic),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries("getSubtopic");
        queryClient.invalidateQueries(["getSubtopic", topic, token]);
      },
    }
  );

  const { data, isSuccess } = useQuery(["getSubtopic", topic, token], () =>
    getSubTopic(topic, token)
  );
  const dispatch = useAppDispatch();

  return (
    <section className="sub-topic">
      <div className="sub-topic-title">
        <p>{topic}'s subtopics</p>
        <button
          className="btn"
          onClick={() => {
            mutation.mutate({ token, topic });
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
