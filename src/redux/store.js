import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducer";
import { ordersReducer } from "./reducers/ordersReducer";
import { cartReducer } from "./reducers/cartReducer";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

export const store = configureStore({
    reducer: {
        userReducer,
        ordersReducer,
        cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})