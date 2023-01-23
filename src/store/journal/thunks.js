import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { uploadFile } from "../../helpers/uploadFile";
import { addNewEmptyNote, deleteNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            imageUrls: [],
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;

        dispatch(setActiveNote(newNote));
        dispatch(addNewEmptyNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error("uid is required");

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
    
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge:true});

        dispatch(updateNote(note));
    };
};

export const startUploadingFiles = (files) => {
    return async (dispatch) => {
        dispatch(setSaving());
    
        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push(uploadFile(file));
        }
        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));
    };
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNote(note.id));
    };
};