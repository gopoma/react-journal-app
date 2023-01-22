import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSaving: true,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //     id: "someidxd",
    //     title: "sometitlexd",
    //     body: "somebodyxd",
    //     date: 12345678910,
    //     imageUrls: ["https://image1xd.jpg", "https://image2xd.png", "https://image3xd.gif"]
    // }
};

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        addNewEmptyNote: (state, action) => {

        },
        setActiveNote: (state, action) => {

        },
        setNotes: (state, action) => {

        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNote: (state, action) => {

        }
    }
});


export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNote
} = journalSlice.actions;