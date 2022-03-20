import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  useMutation } from "react-query";
import { postCreateAccount } from "../../apis/myApis";

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
      console.log(data?.data, "sign up success");
      data?.data === "ok" && navigate("/");
    },
  });
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
          .oneOf([Yup.ref("password")], "password must be the same")

          .required("Required"),
      })}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        mutation.mutate(values);

        resetForm();
      }}
    >
      <div className="signup">
        <Form className="form">
          <div className="title">Sign up</div>
          <label className="label" htmlFor="firstname">
            Firstname
          </label>
          <Field type="text" id="firstname" name="firstname" className="input" autoComplete="off" />
          <span className="error">
            <ErrorMessage name="firstname" />
          </span>

          <label className="label" htmlFor="lastname">
            Lastname
          </label>
          <Field type="text" id="lastname" name="lastname" className="input" autoComplete="off" />
          <span className="error">
            <ErrorMessage name="lastname" />
          </span>

          <label className="label" htmlFor="email">
            Email
          </label>
          <Field type="text" id="email" name="email" className="input" />
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

          <label className="label" htmlFor="Confirm password">
            Confirm password
          </label>
          <Field
            type="password"
            id="passwordConfirm password"
            name="passwordConfirm"
            className="input"
          />
          <span className="error">
            <ErrorMessage name="passwordConfirm" />
          </span>

          <button type="submit" className="signup-btn btn">
            Send
          </button>
        </Form>
        <hr />
        <p className="text-create-account">
          Go back to the <Link to="/">Sign in page</Link>{" "}
        </p>
      </div>
    </Formik>
  );
};

export default Signup;
