import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducer";
import { ordersReducer } from "./reducers/ordersReducer";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    userReducer,
    ordersReducer,
    cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
