import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { ordersReducer } from "./reducers/ordersReducer";

export const store = configureStore({
    reducer: {
        userReducer,
        ordersReducer
    }
})