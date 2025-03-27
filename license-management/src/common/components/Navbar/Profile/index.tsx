import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Divider, IconButton, Tooltip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import profileLogo from '../../../../assets/brand.jpg';
import styles from './index.module.scss';


function Profile() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    //to style profile icon
    const menuId = 'primary-search-account-menu';


    const DrawerList = (
        <Box sx={{ width: 400 }} role="Profile" onClick={toggleDrawer(false)}>
            <div className={styles.profile}>
                <img src={profileLogo} className={styles.profileLogo} />
                <span className={styles.profileTitle}>Divami Design Labs Private Limited</span>
            </div>
            <Divider />
            <br />
            <p className={styles.caption}>Focuses on design excellence and strategic growth</p>
        </Box>
    );

    return (
        <div>
            <Tooltip title='Profile'>
                <IconButton
                    size="medium"
                    edge='end'
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                    sx={{ color: "white" }}
                    onClick={toggleDrawer(true)}
                >
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Profile;
