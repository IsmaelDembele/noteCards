import { useQuery } from "react-query";
import { getTopics } from "../../apis/myApis";
import { useAppDispatch } from "../../app/hooks";
import { viewSubtopics } from "../../features/application/appSlice";
import "./topics.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constantes/constantes";

export interface ITopics {
  _id?: string;
  name: string;
}

const Topics = () => {
  // const { dispatch } = useContext(myContext) as IMyContext;
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  // const state = useAppSelector(state => state.auth);

  const { data, isError, isSuccess } = useQuery("getTopics", () => getTopics(), {
    onSuccess: data => {
      console.log(data?.data);
    },
  });

  if (isError) return <div>Error...</div>;

  return (
    <section className="topics">
      <div className="topics-title">Topics</div>
      {isError && <div>An error occured</div>}
      <div className="list-items">
        {isSuccess &&
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
        <div className="item">rnktb</div>
      </div>
    </section>
  );
};

export default Topics;
