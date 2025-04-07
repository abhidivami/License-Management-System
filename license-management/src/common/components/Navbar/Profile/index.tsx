import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Divider, IconButton, Tooltip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import profileLogo from '../../../../assets/brand.jpg';
import styles from './index.module.scss';

interface ProfileProps {
    iconColor: "white" | "black";
}
function Profile(props: ProfileProps) {

    const { iconColor } = props;

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    //to style profile icon
    const menuId = 'primary-search-account-menu';


    const DrawerList = (
        <Box sx={{ width: iconColor == "black" ? 320 : 400 }} role="Profile" onClick={toggleDrawer(false)}>
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
                <div onClick={toggleDrawer(true)} className={styles.mobile}>
                    <IconButton
                        size="large"
                        edge='end'
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        sx={{ color: iconColor}}
                    >
                        <AccountCircle  sx={{
                            fontSize:'30px'
                        }}/>
                    </IconButton>

                    {/* for mobile versions */}
                    {iconColor == "black" && <p>Profile</p>}
                </div>
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Profile;
