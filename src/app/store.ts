import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import appReducer from "../features/application/appSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
