import { LogoutOutlined } from "@mui/icons-material";
import { MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const Navbar = ({drawerWidth}) => {
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
                    <IconButton color="error">
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