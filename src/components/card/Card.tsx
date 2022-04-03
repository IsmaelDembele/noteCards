import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCard } from "../../apis/myApis";
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

interface ICard {
  // cardIndex: string;
}

const Card: React.FC<ICard> = () => {
  const dispatch = useAppDispatch();
  const [side, setSide] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentCart, setCurrentCard] = useState<any>();
  const [validArrowRight, setValidArrowRight] = useState<boolean>();
  const [validArrowLeft, setValidArrowLeft] = useState<boolean>();
  let navigate = useNavigate();
  const appState = useAppSelector(state => state.app);
  const token = useAppSelector(state => state.auth.token);
  const { data, isSuccess } = useQuery(["getCard", appState.topic, appState.subTopic, token], () =>
    getCard(appState.topic, appState.subTopic, token as string)
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

  // if (data?.data[1]) console.log("define");

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
            {side && currentCart?.front}
            {!side && currentCart?.back}
          </pre>

          <p className="note">note</p>
          <div className="display_note">{currentCart?.note}</div>
        </section>
      )}

      {edit && (
        <CreateEditCard
          topic={data?.data.topic}
          subTopic={data?.data.subTopic}
          setEdit={setEdit}
          front={data?.data.front}
          back={data?.data.back}
          note={data?.data.note}
          // cardID={cardID}
        />
      )}
    </>
  );
};

export default Card;
