import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../configs/firebase";

const INITIAL_STATE = {
  cart: [],
  loading: true,
};

export const getInitialCartAsync = createAsyncThunk(
  "cart/getInitialOrders",
  async (userUid) => {
    // userUid will always be passed with truthy values

    const docRef = doc(db, "usersCarts", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().cart;
    } else {
      return [];
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    reset: (state, action) => {
      state.cart = [];
    },
    replaceOrders: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialCartAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;
