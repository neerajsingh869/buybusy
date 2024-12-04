import { createAsyncThunk, createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../configs/firebase";

const INITIAL_STATE = {
  orders: [],
  loading: true,
};

export const getInitialOrdersAsync = createAsyncThunk(
  "orders/getInitialOrders",
  async (userUid) => {
    if (!userUid) {
      return [];
    }

    const docRef = doc(db, "usersOrders", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().orders;
    } else {
      return [];
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  reducers: {
    replaceOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
  },
});

export const ordersReducer = ordersSlice.reducer;
export const ordersActions = ordersSlice.actions;
// export const ordersSelector = (state) => state.ordersReducer;
export const ordersSelector = createDraftSafeSelector((state) => state, (state) => state.ordersReducer);
