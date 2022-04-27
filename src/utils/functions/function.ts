import { toast} from "react-toastify";

export const notify = (msg: string, detail = "") => {
  switch (detail) {
    case "":
      toast.error(msg);
      return;
    case "info":
      toast.info(msg);
  }
};
