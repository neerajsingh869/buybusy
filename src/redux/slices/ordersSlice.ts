import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../configs/firebase";
import { Order } from "../../types";
import { RootState } from "../store";

interface OrdersState {
  orders: Order[];
  loading: boolean;
}

const INITIAL_STATE: OrdersState = {
  orders: [],
  loading: true,
};

export const getInitialOrdersAsync = createAsyncThunk(
  "orders/getInitialOrders",
  async (userUid: string | null | undefined): Promise<Order[]> => {
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
    replaceOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    updateLoadingStatus: (state, action: PayloadAction<boolean>) => {
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
export const ordersSelector = createDraftSafeSelector(
  (state: RootState) => state,
  (state: RootState) => state.ordersReducer
);
