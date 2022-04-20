import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { changePassword, deleteAccount, getLogged } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../features/authentication/authSlice";
import { notify } from "../../utils/functions/function";
import LoadingBar from "../loadingBar/LoadingBar";
import "./account.css";
import { ErrorMsg } from "../signup/Signup";

const Account: React.FC = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const state = useAppSelector(state => state.auth);
  const { data, isSuccess, isLoading } = useQuery(
    ["islogged", state.token],
    () => getLogged(state.token as string),
    {
      staleTime: 5000,
      onError: (error: Error) => {
        error && notify(error.message);
      },
    }
  );

  return (
    <section className="account ">
      {isLoading && <LoadingBar />}

      {changePassword && <PasswordModal setChangePassword={setChangePassword} />}

      {deleteAccount && <DeleteAccountModal setDeleteAccount={setDeleteAccount} />}

      <table>
        <tbody>
          <tr className="account-info">
            <td>Firstname:</td>
            <td>{data?.data.firstname}</td>
          </tr>
          <tr className="account-info">
            <td>Lastname: </td>
            <td>{data?.data.lastname}</td>
          </tr>
          <tr className="account-info">
            <td>Email: </td>
            <td>{data?.data.email}</td>
          </tr>
          <tr className="account-info">
            <td>Password: </td>
            <td>{isSuccess ? "***" : ""}</td>
          </tr>
        </tbody>
      </table>

      <div className="account-actions">
        <button
          className="account-btn btn"
          onClick={() => {
            setDeleteAccount(true);
          }}
        >
          Delete Account
        </button>
        <button className="account-btn btn" onClick={() => setChangePassword(true)}>
          Change Password
        </button>
      </div>
    </section>
  );
};

interface IPasswordModal {
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

type TPasswordChange = {
  token: string;
  password: string;
  newPassword: string;
};

const initialValues = {
  password: "",
  newPassword: "",
  newPasswordConfirm: "",
};
const PasswordModal = ({ setChangePassword }: IPasswordModal) => {
  const token = useAppSelector(state => state.auth.token) as string;

  const mutation = useMutation(
    ({ token, password, newPassword }: TPasswordChange) =>
      changePassword(token, password, newPassword),
    {
      onSuccess: data => {
        if (data?.data === "wrong password") notify("Wrong Password");
        else notify("Password Changed", "info");
      },
      onError: (error: Error) => {
        notify(error.message);
      },
    }
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        password: Yup.string().min(5, "Must be at least 5 characters").required("Required"),
        newPassword: Yup.string().min(5, "Must be at least 5 characters").required("Required"),
        newPasswordConfirm: Yup.string()
          .min(5, "Must be at least five characteres")
          .oneOf([Yup.ref("newPassword")], "Passwords must be the same")
          .required("Required"),
      })}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate({ token, password: values.password, newPassword: values.newPassword });
        resetForm();
        setChangePassword(false);
      }}
    >
      <Form className="password-modal center">
        {mutation.isLoading && <LoadingBar />}
        <div className="current-password">
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMsg name="password" />
        </div>
        {/* <hr /> */}
        <div className="new-password">
          <label htmlFor="newPassword">New Password</label>
          <Field type="password" id="newPassword" name="newPassword" />
          <ErrorMsg name="newPassword" />
        </div>
        <div className="confirm-password">
          <label htmlFor="newPasswordConfirm">Confirm Password</label>
          <Field type="password" id="newPasswordConfirm" name="newPasswordConfirm" />
          <ErrorMsg name="newPasswordConfirm" />
        </div>

        <div className="password-modal-btn">
          <button type="submit" className="password-modal-btn-submit btn">
            Submit
          </button>
          <button
            className="password-modal-btn-cancel btn"
            onClick={() => setChangePassword(false)}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

interface IDeleteAccountModal {
  setDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ setDeleteAccount }: IDeleteAccountModal) => {
  const state = useAppSelector(state => state.auth);
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const deleteAccountMutation = useMutation(
    ({ token, password }: { token: string; password: string }) => deleteAccount(token, password),
    {
      onSuccess: data => {
        data?.data === "wrong password" && notify("Wrong Password!");
        data?.data === "ok" && dispatch(signOut());
      },
    }
  );

  return (
    <div className="delete-account">
      <div className="delete-account-password">
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="delete-account-buttons">
        <button
          className="delete-account-submit btn"
          onClick={() => {
            deleteAccountMutation.mutate({ token: state.token as string, password });
            setDeleteAccount(false);
          }}
        >
          Submit
        </button>
        <button className="delete-account-cancel btn" onClick={() => setDeleteAccount(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Account;
