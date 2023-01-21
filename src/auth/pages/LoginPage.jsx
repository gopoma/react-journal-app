import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
    Alert,
    Button, 
    Grid, 
    Link, 
    TextField, 
    Typography
} from "@mui/material";

import { startLocalLogin, types } from "../../store/auth";
import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import { 
    startGoogleSignIn
} from "../../store/auth";

const initialFormState = {
    email: "",
    password: ""
};

export const LoginPage = () => {
    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === types.checking, [status]);

    const dispatch = useDispatch();
    const { formState, email, password, onInputChange } = useForm(initialFormState);

    const onLoginSubmit = (event) => {
        event.preventDefault();

        dispatch(startLocalLogin(formState));
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title="Login">
            <form onSubmit={onLoginSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="Enter an email"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Enter a password"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
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
                    <Grid item xs={12} sm={6}>
                        <Button 
                            disabled={isCheckingAuthentication}
                            type="submit" 
                            variant="contained" 
                            fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                            disabled={isCheckingAuthentication}
                            onClick={onGoogleSignIn} 
                            variant="contained" 
                            fullWidth>
                            <Google/>
                            <Typography sx={{ml:1}}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="end">
                    <Link component={RouterLink} color="inherit" to="/auth/register">
                        Create an account
                    </Link>
                </Grid>
            </form>
        </AuthLayout>
    );
};