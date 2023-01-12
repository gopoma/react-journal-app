import {AuthLayout} from "../layout";
import {Link as RouterLink} from "react-router-dom";
import {Google} from "@mui/icons-material";
import {
    Button, 
    Grid, 
    Link, 
    TextField, 
    Typography
} from "@mui/material";

export const RegisterPage = () => {
    return (
        <AuthLayout title="Create account">
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Fullname"
                            type="text"
                            placeholder="Enter your fullname"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="Enter an email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Enter a password"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth>
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