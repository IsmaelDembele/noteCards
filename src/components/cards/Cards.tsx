import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getCards, IReadCard } from "../../apis/myApis";
import { IMyContext, myContext } from "../../context/myContext";
import "./cards.css";

interface ICards {
  topic: string;
  subTopic: string;
}

const Cards: React.FC<ICards> = ({ topic, subTopic }) => {
  const [newCard, setNewCard] = useState(false);
  const { state, dispatch } = useContext(myContext) as IMyContext;
  const mutation = useMutation(({ front, back, note }: IReadCard) =>
    getCards({ front, back, note })
  );

  useEffect(() => {
    console.log(state.card);
  }, [state.card]);

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
              value={state.card?.front}
              onChange={e =>
                dispatch({
                  type: "cardsHandleChange",
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            ></textarea>
            <textarea
              name="back"
              id=""
              cols={30}
              rows={10}
              placeholder="Back or details of the note card"
              value={state.card?.back}
              onChange={e =>
                dispatch({
                  type: "cardsHandleChange",
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            ></textarea>
            <textarea
              name="note"
              id=""
              cols={30}
              rows={10}
              placeholder="Note about the card"
              value={state.card?.note}
              onChange={e =>
                dispatch({
                  type: "cardsHandleChange",
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            ></textarea>
          </div>
          <button
            className="btn"
            onClick={() =>
              mutation.mutate({
                front: state.card.front,
                back: state.card.back,
                note: state.card.note,
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
