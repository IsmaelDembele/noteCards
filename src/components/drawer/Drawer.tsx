import { useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getLogged } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes } from "../../constantes/constantes";
import { review } from "../../features/application/appSlice";
import "./drawer.css";

interface IToken {
  email: string;
  fisrtname: string;
  lastname: string;
}

const Drawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token);
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(["islogged", token]);


  return (
    <section className="drawer">
      <div className="welcome">Welcome {data?.data.firstname}</div>

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
