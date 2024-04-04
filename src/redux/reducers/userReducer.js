import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    userUid: null
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        updateUserUid: (state, action) => {
            state.userUid = action.payload;
        }
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = state => state.userReducer;