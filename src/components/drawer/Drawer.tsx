import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes } from "../../constantes/constantes";
import { review } from "../../features/application/appSlice";
import "./drawer.css";

const Drawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector(state => state.auth);
  return (
    <section className="drawer">
      <div className="welcome">Welcome {state.firstname}</div>

      <button
        className="btn menu"
        onClick={() => {
          dispatch(review());
          navigate(routes.topics);
        }}
      >
        Review
      </button>
      <button className="btn menu">Test</button>
      <button className="btn menu">Grade</button>
    </section>
  );
};

export default Drawer;
