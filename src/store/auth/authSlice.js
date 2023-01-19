import { createSlice } from "@reduxjs/toolkit";
import { types } from "./types";

const initialState = {
    status: types.notAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = types.authenticated;
        },
        logout: (state, action) => {
            state.status = types.notAuthenticated;
        },
        checkingCredentials: (state) => {
            state.status = types.checking;
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;