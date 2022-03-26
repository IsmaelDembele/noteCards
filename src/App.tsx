// import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
// import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoutes from "./components/ProtectedRoutes";
// import { IMyContext, myContext } from "./context/myContext";
import { useContext, useEffect } from "react";
import { useAppSelector } from "./app/hooks";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
// import Nav from "./components/nav/Nav";
// import Topics from "./components/topics/Topics";
// import Drawer from "./components/drawer/Drawer";
// import SubTopic from "./components/subTopic/SubTopic";

const queryClient = new QueryClient();

const App = () => {
  // const { state } = useContext(myContext) as IMyContext;
  const isLogged = useAppSelector(state => state.auth.isLogged);

  useEffect(() => {
    console.log("islogged", isLogged);
  }, [isLogged]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes isLogged={isLogged}>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/signin" element={<Signin />} />

          <Route path="signup" element={<Signup />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
