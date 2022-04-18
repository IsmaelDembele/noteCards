import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteCards, getCards, ICards, IReadCard } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes } from "../../utils/constantes/constantes";
import { viewCard, setNewCard } from "../../features/application/appSlice";
import CreateEditCard from "../createEditCard/CreateEditCard";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import "./cards.css";
import { notify } from "../../utils/functions/function";
import LoadingBar from "../loadingBar/LoadingBar";

export type TCard = {
  front: string;
  back: string;
  note: string;
  _id?: string;
};

const Cards: React.FC<ICards> = ({ topic, subTopic }) => {
  const appState = useAppSelector(state => state.app);
  const token = useAppSelector(state => state.auth.token) as string;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["getCards", appState.topic, appState.subTopic, token],
    () => getCards(appState.topic, appState.subTopic, token),
    {
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  const deleteCardsMutation = useMutation(
    ({ token, topic, subTopic }: IReadCard) => deleteCards(token as string, topic, subTopic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCards", appState.topic, appState.subTopic, token]);
      },
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  return (
    <section className="cards">
      {(isLoading || deleteCardsMutation.isLoading) && <LoadingBar />}
      <div className="cards-title">
        <p>
          {topic} <ArrowRightRoundedIcon sx={{ fontSize: "40px", color: "#fff" }} /> {subTopic}
        </p>
        <button
          className="btn"
          onClick={() => {
            const result = prompt("This will delete all the Cards: type DELETE to continue");
            deleteCardsMutation.mutate({ token, topic, subTopic });
          }}
        >
          Delete Cards
        </button>
      </div>
      {!appState.newCard && (
        <div className="list-items">
          {typeof data?.data !== "string" &&
            data?.data?.map((el: TCard, index: number) => {
              return (
                <p
                  className="item"
                  key={index}
                  onClick={() => {
                    navigate(routes.card);
                    dispatch(viewCard(index));
                  }}
                >
                  {el.front}
                </p>
              );
            })}
        </div>
      )}

      {appState.newCard && (
        <CreateEditCard topic={topic} subTopic={subTopic} setNewCard={setNewCard} />
      )}
    </section>
  );
};

export default Cards;
