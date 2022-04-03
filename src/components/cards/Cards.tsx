import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCards, ICards } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes } from "../../constantes/constantes";
import { viewCard } from "../../features/application/appSlice";
import CreateEditCard from "../createEditCard/CreateEditCard";
import "./cards.css";

export type TCard = {
  front: string;
  back: string;
  note: string;
  _id?: string;
};

const Cards: React.FC<ICards> = ({ topic, subTopic }) => {
  const [newCard, setNewCard] = useState(false);
  const appState = useAppSelector(state => state.app);
  const token = useAppSelector(state => state.auth.token) as string;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, error } = useQuery(["getCards", appState.topic, appState.subTopic, token], () =>
    getCards(appState.topic, appState.subTopic, token)
  );

  if (error) console.log("query error", error);

  // console.log(data?.data);

  return (
    <section className="cards">
      <div className="cards-title">
        {topic}/{subTopic}
        <button className="btn" onClick={() => setNewCard(true)}>
          Add a new card
        </button>
      </div>
      {!newCard && (
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

      {newCard && <CreateEditCard topic={topic} subTopic={subTopic} setNewCard={setNewCard} />}
    </section>
  );
};

export default Cards;
