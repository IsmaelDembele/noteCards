import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { getLogged, postLogged } from "../../apis/myApis";
import { getToken, IAuthState, setSignin, signOut } from "../../features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { localStorageAuthTokenKey, oneDay, routes } from "../../utils/constantes/constantes";
import { setRoute } from "../../features/application/appSlice";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "../loadingBar/LoadingBar";
import { get, notify, set } from "../../utils/functions/function";
import { ErrorMsg, Label } from "../signup/Signup";

const initialValues = { email: "", password: "" };

const Signin = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);
  const route = useAppSelector(state => state.app.route);

  //we check to see if the user is already login in
  const { isLoading } = useQuery(
    ["islogged", state.token],
    () => getLogged(state.token as string),
    {
      onSuccess: data => {
        if (!get(localStorageAuthTokenKey) && (state.token as string).length > 0) {
          //if we have a token that has not been store in local/storage yet, we store it
          const authToken = {
            token: state.token,
          };
          set(localStorageAuthTokenKey, authToken, oneDay); //----
        }

        //if the token has been decoded successfully that means we are connected
        if (data?.data.email && data?.data.firstname) {
          dispatch(setSignin(true));
          navigate(route);
        } else {
          //if the token could not be decoded then set the route to '/' and signout
          dispatch(setRoute(routes.topics));
          dispatch(signOut());
        }
      },
      onError: (error: Error) => {
        // if there is an error display an error message
        error && notify(error.message);
      },
      // cache the request because it is going to be call couple of time when we first login
      cacheTime: 1,
    }
  );

  /**
   * If there is no token or the token is not valid anymore we execute this
   * mutation in order to obtain a new one
   */
  const mutation = useMutation((values: IAuthState) => postLogged(values), {
    onSuccess: async data => {
      if (data?.data?.msg === "ok") {
        const { token, msg, email, firstname, lastname } = data?.data;
        dispatch(getToken({ token, msg, email, firstname, lastname }));
      }
    },
    onError: (error: Error) => {
      console.log(error);
      if (error.message.includes("403")) {
        notify("Wrong password and/or email!");
      } else {
        notify("Server error. Please try again later");
      }
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(5, "Must be at least five characters").required("Required"),
      })}
      onSubmit={(values: IAuthState) => {
        mutation.mutate(values);
      }}
    >
      <div className="signin">
        {(isLoading || mutation.isLoading) && <LoadingBar />}
        <Form className="form">
          <div className="title">Sign in</div>

          <Label name="Email" />
          <Field type="text" id="email" name="email" className="input" autoComplete="on" />
          <ErrorMsg name="email" />

          <Label name="Password" />
          <Field type="password" id="password" name="password" className="input" />
          <ErrorMsg name="password" />

          <button type="submit" className="signin-btn btn">
            Send
          </button>
        </Form>
        <hr />
        <p className="text-create-account">
          Don't have an account? <Link to={routes.signup}>Create an account </Link>
        </p>
      </div>
    </Formik>
  );
};

export default Signin;
