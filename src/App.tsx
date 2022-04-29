import Signin from "./components/signin/Signin";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppSelector } from "./app/hooks";
import Signup from "./components/signup/Signup";
import Topics from "./components/topics/Topics";
import SubTopic from "./components/subTopic/SubTopic";
import Nav from "./components/nav/Nav";
import "./app.css";
import Drawer from "./components/drawer/Drawer";
import Cards from "./components/cards/Cards";
import { routes } from "./utils/constantes/constantes";
import Card from "./components/card/Card";
import Test from "./components/test/Test";
import TestOption from "./components/testOptions/TestOptions";
import { ToastContainer, Zoom } from "react-toastify";
import Account from "./components/account/Account";
import { useMediaQuery } from "@mui/material";

const App = () => {
  const isLogged = useAppSelector(state => state.auth.isLogged);
  const appState = useAppSelector(state => state.app);
  const location = useLocation();

  const mobileMatche = useMediaQuery("(max-width:600px)");
  const visibleMobileDrawer = useAppSelector(state => state.app.mobileDrawerVisible);

  return (
    <div
      className="app"
      style={
        !visibleMobileDrawer && mobileMatche
          ? { gridTemplateColumns: "1fr" }
          : { gridTemplateColumns: "minmax(11rem,14.7%) 1fr" }
      }
    >
      {location.pathname === routes.signin || location.pathname === routes.signup ? "" : <Nav />}
      {location.pathname === routes.signin || location.pathname === routes.signup ? "" : <Drawer />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <Topics />
            </ProtectedRoutes>
          }
        />

        <Route
          path="subtopic"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <SubTopic topic={appState.topic} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/cards"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <Cards topic={appState.topic} subTopic={appState.subTopic} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/card"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <Card />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <Test />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/testOptions:id"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <TestOption topic={appState.testTopic} subTopic={appState.testSubtopic} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoutes isLogged={isLogged}>
              <Account />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
