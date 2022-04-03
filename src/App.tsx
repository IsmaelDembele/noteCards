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
import { routes } from "./constantes/constantes";
import Card from "./components/card/Card";

const App = () => {
  const isLogged = useAppSelector(state => state.auth.isLogged);
  const appState = useAppSelector(state => state.app);
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname === routes.signin || location.pathname === routes.signup ? "" : <Nav />}
      {location.pathname === routes.signin || location.pathname === routes.signup ? "" : <Drawer />}

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
              <Card  />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
