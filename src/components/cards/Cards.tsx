import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCards, getCards, ICards, IReadCard } from "../../apis/myApis";
import { useAppSelector } from "../../app/hooks";
import "./cards.css";

type TCard = {
  front: string;
  back: string;
  note: string;
};

const initialvalue: TCard = { front: "", back: "", note: "" };

const Cards: React.FC<ICards> = ({ topic, subTopic }) => {
  const [newCard, setNewCard] = useState(false);
  const [card, setCard] = useState<TCard>(initialvalue);
  const queryClient = useQueryClient();
  const appState = useAppSelector(state => state.app);

  const { data, isSuccess, error } = useQuery(["getCards", appState.topic, appState.subTopic], () =>
    getCards(appState.topic, appState.subTopic)
  );

  const mutation = useMutation(
    ({ topic, subTopic, front, back, note }: IReadCard) =>
      addCards({ topic, subTopic, front, back, note }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCards", appState.topic, appState.subTopic]);
        setCard(initialvalue);
      },
    }
  );

  if (isSuccess) console.log("query result", data?.data);
  if (error) console.log("query error", error);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

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
          {data?.data.map((el: TCard, index: number) => {
            return (
              <p className="item" key={index}>
                {el.front}
              </p>
            );
          })}
        </div>
      )}

      {newCard && (
        <form action="" className="newCard">
          <div className="cards-text">
            <textarea
              name="front"
              id=""
              cols={30}
              rows={10}
              placeholder="Title or front of the note card"
              value={card.front}
              onChange={e => handleChange(e)}
            ></textarea>
            <textarea
              name="back"
              id=""
              cols={30}
              rows={10}
              placeholder="Back or details of the note card"
              value={card.back}
              onChange={e => handleChange(e)}
            ></textarea>
            <textarea
              name="note"
              id=""
              cols={30}
              rows={10}
              placeholder="Note about the card"
              value={card.note}
              onChange={e => handleChange(e)}
            ></textarea>
          </div>
          <button
            className="btn"
            onClick={e => {
              e.preventDefault();
              mutation.mutate({
                topic: topic,
                subTopic: subTopic,
                front: card.front,
                back: card.back,
                note: card.note,
              });
              setNewCard(false);
            }}
          >
            submit
          </button>
        </form>
      )}
    </section>
  );
};

export default Cards;
