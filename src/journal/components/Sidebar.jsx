import { useSelector } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({drawerWidth}) => {
    const { notes } = useSelector(state => state.journal);
    const { displayName } = useSelector(state => state.auth);

    return (
        <Box
            component="nav"
            sx={{width:{sm:drawerWidth}, flexShrink:{sm:0}}}
        >
            <Drawer
                variant="permanent" // temporary
                open
                sx={{
                    display:{xs:"block"},
                    "& .MuiDrawer-paper": {boxSizing:"border-box", width:drawerWidth}
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {displayName}
                    </Typography>    
                </Toolbar>  
                <Divider/>
                <List>
                    {
                        notes.map((note) => (
                            <SidebarItem 
                                key={note.id} 
                                {...note}
                            />
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerWidth: PropTypes.number
};

Sidebar.defaultProps = {
    drawerWidth: 240
};