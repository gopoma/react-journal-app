import { createSlice } from "@reduxjs/toolkit";
import { types } from "./types";

const initialState = {
    status: types.checking,
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

        },
        logout: (state, action) => {

        },
        checkingCredentials: (state) => {

        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;