import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Divider, IconButton, List, ListItem, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './index.module.scss';
import logo from '../../../../assets/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import Analytics from '@mui/icons-material/QueryStats';
import Expired from '@mui/icons-material/RunningWithErrorsOutlined';
import ExpiringSoon from '@mui/icons-material/AccessAlarmOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import LmsLogo from '../../../../assets/lms_logo.jpg';



function DisplayNavigationBar() {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    //upon clicking on logo and name should navigate to home page
    const handleHomePageNavigation = () => {
        navigate('/');
    }


    const DrawerList = (
        <Box sx={{ width: 320 }} role="Profile" onClick={toggleDrawer(false)}>
            <div className={styles.navigation}>
                <img src={LmsLogo} className={styles.navigationLogo} onClick={handleHomePageNavigation}/>
                <span className={styles.navigationTitle} onClick={handleHomePageNavigation}>Divami Design Labs Private Limited</span>
            </div>
            <div className={styles.options}>
                <List>
                    <NavLink to='/' className={styles.navigationLink}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                                <HomeIcon sx={{ color: "black" }} />
                                <span className={styles.optionsName}>Home</span>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink to='/analytics' className={styles.navigationLink}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                                <Analytics sx={{ color: "black" }} />
                                <span className={styles.optionsName}>Analytics</span>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink to='/expired' className={styles.navigationLink}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                                <Expired sx={{ color: "black" }} />
                                <span className={styles.optionsName}>Expired</span>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink to='/expiring' className={styles.navigationLink}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                                <ExpiringSoon sx={{ color: "black" }} />
                                <span className={styles.optionsName}>Expiring Soon</span>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        </Box>
    );

    return (
        <div className={styles.mobile}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, color: "white" }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default DisplayNavigationBar;
