import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteCard, getCard } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./card.css";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ChangeCircleTwoToneIcon from "@mui/icons-material/ChangeCircleTwoTone";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constantes/constantes";
import CreateEditCard from "../createEditCard/CreateEditCard";
// import SubTopic from "../subTopic/SubTopic";
import { nextCard, previousCard, viewCards } from "../../features/application/appSlice";

const Card: React.FC = () => {
  const dispatch = useAppDispatch();
  const [side, setSide] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<any>();
  const [validArrowRight, setValidArrowRight] = useState<boolean>();
  const [validArrowLeft, setValidArrowLeft] = useState<boolean>();
  let navigate = useNavigate();
  const appState = useAppSelector(state => state.app);
  const token = useAppSelector(state => state.auth.token);
  const { data, isSuccess } = useQuery(["getCard", appState.topic, appState.subTopic, token], () =>
    getCard(appState.topic, appState.subTopic, token as string)
  );
  const deleteMutation = useMutation(
    ({ token, cardID }: { token: string; cardID: string }) => deleteCard(token, cardID),
    {
      onSuccess: () => {
        navigate(routes.cards);
        dispatch(viewCards(appState));
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      // console.log("data array", data?.data[appState.cardIndex]);
      setCurrentCard(data?.data[appState.cardIndex]);
      setValidArrowRight(data?.data[appState.cardIndex + 1]);
      setValidArrowLeft(data?.data[appState.cardIndex - 1]);
    }
    // console.log(appState.cardIndex, "card index");
  }, [appState.cardIndex, data?.data, isSuccess]);

  return (
    <>
      {!edit && (
        <section className="card">
          <div className="navigation_parent">
            <ArrowCircleUpTwoToneIcon
              sx={{ fontSize: 40 }}
              className="arrowUp"
              onClick={() => {
                navigate(routes.cards);
                dispatch(viewCards(appState));
              }}
            />
          </div>
          <div className="navigation_left">
            <ArrowCircleLeftTwoToneIcon
              sx={{ fontSize: 40 }}
              className={validArrowLeft ? "arrowLeft" : "arrowInactif"}
              onClick={() => {
                if (validArrowLeft) {
                  dispatch(previousCard());
                  setSide(true);
                }
              }}
            />
            <span>previous Card</span>
          </div>
          <div className="navigation_right">
            <ArrowCircleRightTwoToneIcon
              sx={{ fontSize: 40 }}
              className={validArrowRight ? "arrowRight" : "arrowInactif"}
              onClick={() => {
                if (validArrowRight) {
                  dispatch(nextCard());
                  setSide(true);
                }
              }}
            />
            <span>Next Card</span>
          </div>

          <div className="btn_edit">
            <button className="btn" onClick={() => setEdit(!edit)}>
              Edit
            </button>
          </div>
          <div className="btn_delete">
            <button
              className="btn"
              onClick={() => {
                deleteMutation.mutate({ token: token as string, cardID: currentCard._id });
              }}
            >
              Delete
            </button>
          </div>

          <div className="flip_side">
            <span>
              <ChangeCircleTwoToneIcon
                sx={{ fontSize: 40 }}
                className="change_icon"
                onClick={() => setSide(!side)}
              />
            </span>
            <p className="text">change side</p>
          </div>

          <p className="side">{side ? "Front" : "Back"}</p>
          <pre className="display_text">
            {side && currentCard?.front}
            {!side && currentCard?.back}
          </pre>

          <p className="note">note</p>
          <div className="display_note">{currentCard?.note}</div>
        </section>
      )}

      {edit && (
        <CreateEditCard
          topic={currentCard.topic}
          subTopic={currentCard.subTopic}
          setEdit={setEdit}
          front={currentCard.front}
          back={currentCard.back}
          note={currentCard.note}
          cardID={currentCard._id}
        />
      )}
    </>
  );
};

export default Card;
