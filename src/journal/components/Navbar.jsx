import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@mui/icons-material";
import { MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { startLogout } from "../../store/auth";

export const Navbar = ({drawerWidth}) => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`}
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{mr:2, display:{sm:"none"}}}
                >
                    <MenuOutlined/>
                </IconButton>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h6" noWrap>JournalApp</Typography>
                    <IconButton onClick={onLogout} color="error">
                        <LogoutOutlined/>
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

Navbar.propTypes = {
    drawerWidth: PropTypes.number
};

Navbar.defaultProps = {
    drawerWidth: 240
};