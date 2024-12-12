import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../configs/firebase";
import { CartItem } from "../../types";
import { RootState } from "../store";

interface CartState {
  cart: CartItem[];
  loading: boolean;
}

const INITIAL_STATE: CartState = {
  cart: [],
  loading: true,
};

export const getInitialCartAsync = createAsyncThunk(
  "cart/getInitialOrders",
  async (userUid: string | null | undefined): Promise<CartItem[]> => {
    if (!userUid) {
      return [];
    }

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
    reset: (state) => {
      state.cart = [];
    },
    replaceOrders: (state, action: PayloadAction<CartItem[]>) => {
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
// export const cartSelector = (state) => state.cartReducer;
export const cartSelector = createDraftSafeSelector(
  (state: RootState) => state,
  (state: RootState) => state.cartReducer
);
