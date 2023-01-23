import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useEffect } from "react";
import { clearMessageSaved, setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal";
import { UploadOutlined } from "@mui/icons-material";
import { useRef } from "react";
import { DeleteOutline } from "@mui/icons-material";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { title, body, date, onInputChange, formState } = useForm(note);
    
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire("Note updated", messageSaved, "success")
             .then(() => dispatch(clearMessageSaved()));
        }
    }, [messageSaved]);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);   

    const fileInputRef = useRef();
    const onFileInputChange = ({target}) => {
        if(target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));
        fileInputRef.current.value = "";
    };

    const onSaveNote = () => {
        dispatch(startSavingNote());
    };

    const onNoteDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent="space-between" alignItems="center" sx={{mb:1}}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display:"none"}}
                />
                <IconButton 
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined/>
                </IconButton>
                <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{padding:2}}>
                    <SaveOutlined sx={{fontSize:30, mr:1}}/>
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Enter a title"
                    label="Title"
                    sx={{border:"none", mb:1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿What happened today?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={onNoteDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls}/>
        </Grid>
    );
};