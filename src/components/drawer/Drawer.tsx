import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getLogged } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { routes } from "../../utils/constantes/constantes";
import { account, review, test } from "../../features/application/appSlice";
import "./drawer.css";
import { useMediaQuery } from "@mui/material";

const Drawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token) as string;
  const mobileMatche = useMediaQuery("(max-width:600px)");
  const visibleMobileDrawer = useAppSelector(state => state.app.mobileDrawerVisible);
  const { data, isSuccess } = useQuery(["islogged", token], () => getLogged(token), {
    staleTime: 5000,
  });

  return (
    <section className="drawer" style={!visibleMobileDrawer && mobileMatche ? {display:'none'} : {}}>
      <div className="welcome">Welcome {isSuccess ? data?.data.firstname : ""}</div>
      <button
        className="btn menu"
        onClick={() => {
          dispatch(review());
          navigate(routes.topics);
        }}
      >
        Review
      </button>
      <button
        className="btn menu"
        onClick={() => {
          dispatch(test());
          navigate(routes.test, { replace: true });
        }}
      >
        Test
      </button>

      <button
        className="btn menu"
        onClick={() => {
          dispatch(account());
          navigate(routes.account, { replace: true });
        }}
      >
        Account
      </button>
    </section>
  );
};

export default Drawer;
