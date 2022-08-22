import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { postCreateAccount } from "../../apis/myApis";
import { routes } from "../../utils/constantes/constantes";
import { notify } from "../../utils/functions/function";

export interface ISignup {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: ISignup = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const mutation = useMutation((values: ISignup) => postCreateAccount(values), {
    onSuccess: data => {
      data?.data === "ok" && navigate(routes.topics);
      notify("Account created", "info");
    },
  });
  if (mutation.isError) {
    notify("Something went wrong. Please try again later");
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstname: Yup.string().min(2, "Must be at least two characteres").required("Required"),
        lastname: Yup.string().min(2, "Must be at least two characteres").required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(5, "Must be at least five characteres").required("Required"),
        passwordConfirm: Yup.string()
          .min(5, "Must be at least five characteres")
          .oneOf([Yup.ref("password")], "Passwords must be the same")
          .required("Required"),
      })}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
    >
      <div className="signup">
        <Form className="form">
          <div className="title">Sign up</div>

          <Label name="Firstname" />
          <Field type="text" id="firstname" name="firstname" className="input" />
          <ErrorMsg name="firstname" />

          <Label name="Lastname" />
          <Field type="text" id="lastname" name="lastname" className="input" />
          <ErrorMsg name="lastname" />

          <Label name="Email" />
          <Field type="text" id="email" name="email" className="input" />
          <ErrorMsg name="email" />

          <Label name="Password" />
          <Field type="password" id="password" name="password" className="input" />
          <ErrorMsg name="password" />

          <Label name="Confirm password" />
          <Field type="password" id="passwordConfirm" name="passwordConfirm" className="input" />
          <ErrorMsg name="passwordConfirm" />

          <button type="submit" className="signup-btn btn">
            Send
          </button>
        </Form>
        <hr />
        <p className="text-create-account">
          Go back to the <Link to={routes.signin}>Sign in page</Link>{" "}
        </p>
      </div>
    </Formik>
  );
};

export default Signup;

type TType = {
  name: string;
};

export const ErrorMsg: React.FC<TType> = ({ name }) => {
  return (
    <span className="error">
      <ErrorMessage name={name} />
    </span>
  );
};

export const Label: React.FC<TType> = ({ name }) => {
  return (
    <label className="label" htmlFor={name.toLocaleLowerCase()}>
      {name}
    </label>
  );
};
