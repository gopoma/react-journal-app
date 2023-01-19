import { AuthLayout } from "../layout";
import { Link as RouterLink } from "react-router-dom";
import {
    Button, 
    Grid, 
    Link, 
    TextField, 
    Typography
} from "@mui/material";

import { useForm } from "../../hooks";

const initialFormState = {
    displayName: "Gustavo Ordoño Poma",
    email: "gordono@unsa.edu.pe",
    password: "123456"
};

const formValidations = {
    displayName: [(value) => value.length >= 1, "Please provide a fullname"],
    email: [(value) => value.includes("@"), "Email shouls have a @"],
    password: [(value) => value.length >= 6, "Password should have more than 6 characters."]
};

export const RegisterPage = () => {
    const { 
        displayName, 
        email, 
        password, 
        formState, 
        onInputChange, 
        onFormReset 
    } = useForm(initialFormState, formValidations);

    const onRegisterSubmit = (event) => {
        event.preventDefault();

        console.log(formState);

        onFormReset();
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
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
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