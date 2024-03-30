import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { ordersReducer } from "./reducers/ordersReducer";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

export const store = configureStore({
    reducer: {
        userReducer,
        ordersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})