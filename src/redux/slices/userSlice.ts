import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { UserId } from "../../types";
import { RootState } from "../store";

interface UserState {
  userUid: UserId;
}

const INITIAL_STATE: UserState = {
  userUid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    updateUserUid: (state, action: PayloadAction<UserId>) => {
      state.userUid = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
// export const userSelector = (state) => state.userReducer;
export const userSelector = createDraftSafeSelector(
  (state: RootState) => state,
  (state: RootState) => state.userReducer
);
