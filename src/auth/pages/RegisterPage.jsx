import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Alert,
    Button, 
    Grid, 
    Link, 
    TextField, 
    Typography
} from "@mui/material";

import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startLocalRegistration, types } from "../../store/auth";
import { useMemo } from "react";

const initialFormState = {
    displayName: "Gustavo Ordoño Poma",
    email: "gopoma@gmail.com",
    password: "123456"
};

const formValidations = {
    displayName: [(value) => value.length >= 1, "Please provide a fullname"],
    email: [(value) => value.includes("@"), "Email shouls have a @"],
    password: [(value) => value.length >= 6, "Password should have more than 6 characters."]
};

export const RegisterPage = () => {
    const {status, errorMessage} = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === types.checking, [status]);

    const { displayName, email, password,
            displayNameValid, emailValid, passwordValid, 
            formState, isFormValid, onInputChange, onFormReset } = useForm(initialFormState, formValidations);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const dispatch = useDispatch();
    const onRegisterSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);
        if(!isFormValid || isCheckingAuthentication) return;

        dispatch(startLocalRegistration(formState));
    };

    return (
        <AuthLayout title="Create account">
            <form onSubmit={onRegisterSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Fullname"
                            type="text"
                            placeholder="Enter your fullname"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={Boolean(displayNameValid) && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="Enter an email"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={Boolean(emailValid) && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Enter a password"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={Boolean(passwordValid) && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    <Grid item 
                        xs={12}
                        display={Boolean(errorMessage) ? "" : "none"}
                    >
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                            Create account
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="end">
                    <Typography sx={{mr:1}}>¿Already have an account?</Typography>
                    <Link component={RouterLink} color="inherit" to="/auth/login">
                        Log In
                    </Link>
                </Grid>
            </form>
        </AuthLayout>
    );
};