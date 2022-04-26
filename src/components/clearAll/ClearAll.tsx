import React, { useState } from "react";
import { notify } from "../../utils/functions/function";
import "./clearAll.css";

type TClearAll = {
  name: string;
  show: React.Dispatch<React.SetStateAction<boolean>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const ClearAll = ({ name, show, setText }: TClearAll) => {
  const [input, setInput] = useState("");

  return (
    <div className="clear-all">
      <div>
        <p>This will delete All {name}!</p>
        <p>Type DELETE to continue...</p>
      </div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <div className="btns">
        <button className="btn" onClick={() => show(false)}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          onClick={() => {
            input !== "DELETE" &&
              notify(`${input} is not DELETE. Your ${name} will not be deleted`, "info");
            setText(input);
            show(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ClearAll;
