import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { UseMutationResult } from "react-query";
import { useAppSelector } from "../../app/hooks";
import { ITopics } from "../topics/Topics";
import "./myModal.css";

type TMyModal = {
  item: string;
  visibility: boolean;
  data: [object];
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  renameItem: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      token: string;
      topic: string;
      newTopic: string;
    },
    unknown
  >;
  deleteItem: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      topic: string;
      token: string;
    },
    unknown
  >;
};

const MyModal: React.FC<TMyModal> = ({
  item,
  visibility,
  data,
  openModal,
  deleteItem,
  renameItem,
}) => {
  const [selectItem, setSelectItem] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const token = useAppSelector(state => state.auth.token) as string;

  return (
    <div className={`modal ${visibility ? "visible" : ""} `}>
      <div className="modal-content">
        <div className="choose-topic">
          <label htmlFor="select-topic" className="label-choose-topic">
            {item}
          </label>
          <select
            name="items"
            id="select-topic"
            value={selectItem}
            onChange={e => setSelectItem(e.target.value)}
          >
            {["", ...data].map((el: any, index: number) => {
              return (
                <option key={index} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="rename-topic">
          <label htmlFor="rename-topic-input">Enter new {item}</label>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
        </div>

        <div className="buttons">
          <button
            className={
              newName !== "" && selectItem !== ""
                ? "rename-topic-button btn"
                : "rename-topic-button btn inactif"
            }
            onClick={() => {
              renameItem.mutate({ token: token, topic: selectItem, newTopic: newName });
              setNewName("");
            }}
            disabled={newName === ""}
          >
            Rename {item}
          </button>
          <p>or</p>
          <button
            className={
              selectItem !== "" ? "delete-topic-button btn" : "rename-topic-button btn inactif"
            }
            disabled={selectItem === ""}
            onClick={() => {
              deleteItem.mutate({ topic: selectItem, token: token });
              setSelectItem("");
            }}
          >
            Delete {item}
          </button>

          <button
            className="cancel btn"
            onClick={() => {
              setSelectItem("");
              setNewName("");
              openModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
