import React from "react";

const MyModal = () => {
  return (
    <div className={`modal ${true ? "visible" : ""} `}>
      <div className="modal-content">
        <div className="delete-one-topic">Rename</div>
        <div className="rename-one-topic">Delete</div>
      </div>
    </div>
  );
};

export default MyModal;
