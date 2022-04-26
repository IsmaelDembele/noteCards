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
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ClearAll from "../clearAll/ClearAll";

export type TCard = {
  front: string;
  back: string;
  note: string;
  _id?: string;
};

const Cards: React.FC<ICards> = ({ topic, subTopic }) => {
  const mobileMatche = useMediaQuery("(max-width:600px)");
  const appState = useAppSelector(state => state.app);
  const token = useAppSelector(state => state.auth.token) as string;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [showClearAll, setShowClearAll] = useState<boolean>(false);
  const [clearAllText, setClearAllText] = useState<string>("");

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

  useEffect(() => {
    clearAllText === "DELETE" && deleteCardsMutation.mutate({ token, topic, subTopic });
    setClearAllText("");
  }, [clearAllText,deleteCardsMutation,subTopic,topic,token]);

  return (
    <section className="cards">
      {(isLoading || deleteCardsMutation.isLoading) && <LoadingBar />}
      {showClearAll && <ClearAll name="Cards" show={setShowClearAll} setText={setClearAllText} />}

      <div className="cards-title">
        <p>
          {topic}
          <ArrowRightRoundedIcon
            sx={
              mobileMatche
                ? { fontSize: "25px", color: "#fff" }
                : { fontSize: "40px", color: "#fff" }
            }
          />
          {subTopic}
        </p>
        <button
          className="btn"
          onClick={() => {
            setShowClearAll(true);
          }}
        >
          Clear All
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
