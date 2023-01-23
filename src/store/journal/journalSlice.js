import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSaving: false,
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
        savingNewNote: (state, action) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {

                if(note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });
            state.messageSaved = `${action.payload.title}, has been updated successfully`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearMessageSaved: (state) => {
            state.messageSaved = "";
        },
        deleteNote: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        }
    }
});


export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearMessageSaved,
    deleteNote
} = journalSlice.actions;