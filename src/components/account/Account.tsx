import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteAccount, getLogged } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../features/authentication/authSlice";
import { notify } from "../../utils/functions/function";
import LoadingBar from "../loadingBar/LoadingBar";
import "./account.css";

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

const PasswordModal: React.FC<IPasswordModal> = ({ setChangePassword }) => {
  return (
    <div className="password-modal center">
      <div className="current-password">
        <label htmlFor="current-password">Password</label>
        <input type="text" id="current-password" />
      </div>
      {/* <hr /> */}
      <div className="new-password">
        <label htmlFor="current-password">New Password</label>
        <input type="text" />
      </div>
      <div className="confirm-password">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="text" id="confirm-password" />
      </div>

      <div className="password-modal-btn">
        <button className="password-modal-btn-submit btn">Submit</button>
        <button className="password-modal-btn-cancel btn" onClick={() => setChangePassword(false)}>
          Cancel
        </button>
      </div>
    </div>
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
