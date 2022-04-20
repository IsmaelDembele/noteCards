import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { getLogged, postLogged } from "../../apis/myApis";
import { getToken, IAuthState, setSignin, signOut } from "../../features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { localStorageAuthTokenKey, routes } from "../../utils/constantes/constantes";
import { setRoute } from "../../features/application/appSlice";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "../loadingBar/LoadingBar";
import { notify } from "../../utils/functions/function";
import { ErrorMsg, Label } from "../signup/Signup";

const Signin = () => {
  let navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);
  const route = useAppSelector(state => state.app.route);

  const { isLoading } = useQuery(
    ["islogged", state.token],
    () => getLogged(state.token as string),
    {
      onSuccess: data => {
        if (!localStorage.getItem(localStorageAuthTokenKey) && (state.token as string).length > 0) {
          //save the token
          const authToken = {
            token: state.token,
          };
          localStorage.setItem(localStorageAuthTokenKey, JSON.stringify(authToken, null, 2));
        }

        if (data?.data.email && data?.data.firstname) {
          dispatch(setSignin(true));
          navigate(route);
        } else {
          dispatch(setRoute(routes.topics));
          dispatch(signOut());
        }
      },
      onError: (error: Error) => {
        error && notify(error.message);
      },
      cacheTime: 1,
    }
  );

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
