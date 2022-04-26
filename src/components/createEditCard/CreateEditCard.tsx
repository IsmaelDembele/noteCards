import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addCards, IReadCard, updateCard } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setNewCard } from "../../features/application/appSlice";
import { errorMsg } from "../../utils/constantes/constantes";
import { notify } from "../../utils/functions/function";
import { TCard } from "../cards/Cards";
import LoadingBar from "../loadingBar/LoadingBar";
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
  setEdit,
}) => {
  const [card, setCard] = useState<TCard>(initialvalue);
  const token = useAppSelector(state => state.auth.token) as string;
  const appState = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  const smLaptopMatche = useMediaQuery("(max-width:1000px)");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ topic, subTopic, front, back, note, token }: IReadCard) =>
      addCards({ topic, subTopic, front, back, note, token }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCards", appState.topic, appState.subTopic, token]);
        setNewCard && setNewCard(false);
      },
      onError: error => {
        error && notify(errorMsg);
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
        queryClient.invalidateQueries(["getCard", appState.topic, appState.subTopic, token]);

        setCard(initialvalue);
        setEdit && setEdit(false);
      },
      onError: error => {
        error && notify(errorMsg);
      },
    }
  );

  useEffect(() => {
    if (setEdit) {
      setCard({ front: front as string, back: back as string, note: note as string });
    }
    // eslint-disable-next-line
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

    if (!setEdit) {
      mutation.mutate({
        topic: topic,
        subTopic: subTopic,
        front: card.front,
        back: card.back,
        note: card.note,
        token: token,
      });
      dispatch(setNewCard(false));
    } else {
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
      {(mutation.isLoading || updateCardMutation.isLoading) && <LoadingBar />}
      <div className="cards-text">
        <textarea
          name="front"
          id=""
          cols={30}
          rows={smLaptopMatche ? 6 : 10}
          placeholder="Title or front of the note card"
          value={card.front}
          onChange={e => handleChange(e)}
        ></textarea>
        <textarea
          name="back"
          id=""
          cols={30}
          rows={smLaptopMatche ? 6 : 10}
          placeholder="Back or details of the note card"
          value={card.back}
          onChange={e => handleChange(e)}
        ></textarea>
        <textarea
          name="note"
          id=""
          cols={30}
          rows={smLaptopMatche ? 6 : 10}
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
