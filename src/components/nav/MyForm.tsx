import React, { useEffect, useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { routes } from "../../utils/constantes/constantes";
import "./nav.css";
import { useAppDispatch } from "../../app/hooks";
import { setNewCard } from "../../features/application/appSlice";

type TMyForm = {
  handleSubmit: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>,
    route: string
  ) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const MyForm: React.FC<TMyForm> = ({ handleSubmit, inputValue, setInputValue }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [path, setPath] = useState<string>(routes.topics);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {path === routes.topics && (
        <form className="nav-form" onSubmit={e => handleSubmit(e, path)}>
          <input
            type="text"
            placeholder="Create a new topic"
            className="nav-input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <AddCircle
            className="nav-add-btn"
            sx={{ fontSize: 23 }}
            onClick={e => handleSubmit(e, path)}
          />
        </form>
      )}

      {path === routes.subtopic && (
        <form className="nav-form" onSubmit={e => handleSubmit(e, path)}>
          <input
            type="text"
            className="nav-input"
            placeholder="Create a new subTopic"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <AddCircle
            className="nav-add-btn"
            sx={{ fontSize: 23 }}
            onClick={e => handleSubmit(e, path)}
          />
        </form>
      )}

      {path === routes.cards && (
        <button onClick={() => dispatch(setNewCard(true))} className="nav-form btn card-nav-btn">
          add new card
        </button>
      )}
    </>
  );
};

export default MyForm;
