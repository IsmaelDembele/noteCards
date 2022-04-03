import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addCards, ICards, IReadCard, updateCard } from "../../apis/myApis";
import { useAppSelector } from "../../app/hooks";
import { TCard } from "../cards/Cards";
import "./CreateEditCard.css";

const initialvalue: TCard = { front: "", back: "", note: "" };

type ICreateEditCard = {
  topic: string;
  subTopic: string;
  setNewCard?: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  front?: string;
  back?: string;
  note?: string;
  cardID?: string;
};

const CreateEditCard: React.FC<ICreateEditCard> = ({
  topic,
  subTopic,
  front,
  back,
  note,
  cardID,
  setNewCard,
  setEdit,
}) => {
  const [card, setCard] = useState<TCard>(initialvalue);
  const token = useAppSelector(state => state.auth.token) as string;
  const appState = useAppSelector(state => state.app);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ topic, subTopic, front, back, note, token }: IReadCard) =>
      addCards({ topic, subTopic, front, back, note, token }),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(["getCard", appState.topic, appState.subTopic, token]);
        queryClient.invalidateQueries(["getCards", appState.topic, appState.subTopic, token]);
        // setCard(initialvalue);
        setNewCard && setNewCard(false);
      },
    }
  );

  const updateCardMutation = useMutation(
    ({ topic, subTopic, front, back, note, token, cardID }: IReadCard) =>
      updateCard(
        topic,
        subTopic,
        front as string,
        back as string,
        note as string,
        token as string,
        cardID as string
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCard", cardID, token]);
        setCard(initialvalue);
        setEdit && setEdit(false);
      },
    }
  );

  useEffect(() => {
    if (setEdit) {
      setCard({ front: front as string, back: back as string, note: note as string });
    }
  }, [setCard]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (setNewCard) {
      console.log("new");

      mutation.mutate({
        topic: topic,
        subTopic: subTopic,
        front: card.front,
        back: card.back,
        note: card.note,
        token: token,
      });
      // setNewCard(false);
    }
    if (setEdit) {
      // setEdit(false);
      console.log("edit");

      updateCardMutation.mutate({
        topic: topic,
        subTopic: subTopic,
        front: card.front,
        back: card.back,
        note: card.note,
        token: token,
        cardID: cardID,
      });
    }
  };

  return (
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
      <button className="btn" onClick={e => handleClick(e)}>
        submit
      </button>
    </form>
  );
};

export default CreateEditCard;
