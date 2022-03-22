import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { IMyContext, myContext } from "./context/myContext";
import { useContext } from "react";
import Nav from "./components/nav/Nav";
import Topics from "./components/topics/Topics";
import Drawer from "./components/drawer/Drawer";
import Topic from "./components/topic/Topic";

const queryClient = new QueryClient();

const App = () => {
  const { state } = useContext(myContext) as IMyContext;

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes isLogged={state.isLogged}>
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
