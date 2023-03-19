import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../typings/IAuth";

const initialState: IAuth = {
    token: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<string>){
            state.token = action.payload;
        }
    }
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;