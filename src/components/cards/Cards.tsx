import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getCards, IReadCard } from "../../apis/myApis";
import "./cards.css";

interface ICards {
  topic: string;
  subTopic: string;
}

type TCard = {
  front: string;
  back: string;
  note: string;
};

const initalvalue: TCard = { front: "", back: "", note: "" };

const Cards: React.FC<ICards> = ({ topic, subTopic }) => {
  const [newCard, setNewCard] = useState(false);
  const [card, setCard] = useState<TCard>(initalvalue);
  // const { state, dispatch } = useContext(myContext) as IMyContext;
  const mutation = useMutation(({ topic, subTopic, front, back, note }: IReadCard) =>
    getCards({ topic, subTopic, front, back, note })
  );

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
        <>
          <p>q</p>
          <p>q</p>
          <p>q</p>
          <p>q</p>
        </>
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
            onClick={() =>
              mutation.mutate({
                topic: topic,
                subTopic: subTopic,
                front: card.front,
                back: card.back,
                note: card.note,
              })
            }
          >
            submit
          </button>
        </form>
      )}
    </section>
  );
};

export default Cards;
