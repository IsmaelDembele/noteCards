import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { IMyContext, ISignin, myContext } from "../../context/myContext";
import { useMutation, useQuery } from "react-query";
import { getLogged, postLogged } from "../../apis/myApis";

const Signin = () => {
  let navigate = useNavigate();
  const initialValues: ISignin = { email: "", password: "" };
  const { state, dispatch } = useContext(myContext) as IMyContext;

  // const queryClient = new QueryClient();
  const { isError } = useQuery(
    ["islogged", state.token, state.signin.email, state.firstname, state.lastname],
    () => getLogged(state.token, state.signin.email),
    {
      onSuccess: data => {
        if (
          !localStorage.getItem("signInCredentials") &&
          state.token.length > 0 &&
          state.signin.email.length > 0
        ) {
          //save the token
          const signInCredentials = {
            token: state.token,
            email: state?.signin.email,
            firstname: state.firstname,
            lastname: state.lastname,
          };
          localStorage.setItem("signInCredentials", JSON.stringify(signInCredentials, null, 2));
        }
        if (data?.data) {
          dispatch({ type: "setSignin", payload: true });
          navigate("/");
        } else {
          dispatch({ type: "signOut" });
        }
      },
    }
  );

  if (isError) alert(" error ");

  const mutation = useMutation((values: ISignin) => postLogged(values), {
    onSuccess: async data => {
      if (data?.data?.msg === "ok") {
        const { token, msg, email, firstname, lastname } = data?.data;

        dispatch({ type: "getToken", payload: { token, msg, email, firstname, lastname } });
        // const result = await queryClient.fetchQuery("islogged", () => getLogged(token, email));
      }
    },
  });

  // if(isSuccess) console.log(data.data);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(5, "Must be at least five characters").required("Required"),
      })}
      onSubmit={(values: ISignin) => {
        mutation.mutate(values);
      }}
    >
      <div className="signin">
        <Form className="form">
          <div className="title">Sign in</div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <Field type="text" id="email" name="email" className="input" autoComplete="on" />
          <span className="error">
            <ErrorMessage name="email" />
          </span>

          <label className="label" htmlFor="password">
            Password
          </label>
          <Field type="password" id="password" name="password" className="input" />
          <span className="error">
            <ErrorMessage name="password" />
          </span>

          <button type="submit" className="signin-btn btn">
            Send
          </button>
        </Form>
        <hr />
        <p className="text-create-account">
          Don't have an account? <Link to="/signup">Create an account </Link>
        </p>
      </div>
    </Formik>
  );
};

export default Signin;
