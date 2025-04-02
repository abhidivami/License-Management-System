import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Badge, IconButton, Tooltip } from '@mui/material';
import styles from './index.module.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/CancelSharp';

interface NotificationProps {
    iconColor: "white" | "black";
}

function Notification(props: NotificationProps) {

    const { iconColor } = props;
    const [open, setOpen] = React.useState(false);

    const licenseName = "ChatGPT";

    //to store notifications count
    const notificationsCount = 1;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const closeDrawer = () => {
        setOpen(false);
    }


    const DrawerList = (
        <Box sx={{ width: iconColor == "black" ? 320 : 400 }} role="Notification" onClick={toggleDrawer(false)}>
            <div className={styles.notifications}>
                <div className={styles.notificationsHeading}>
                    <h4>Notifications</h4>
                    <button className={styles.notificationsHeadingClose} onClick={closeDrawer}>
                        <CloseIcon />
                    </button>
                </div>

                {/* notification array */}
                <div className={styles.notificationsElement}>
                    <p>{licenseName} is going to expired. Renew now</p>
                </div>

                <div className={styles.notificationsElement}>
                    <p>{licenseName} is going to expired. Renew now</p>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <Tooltip title='Notification'>
                <div onClick={toggleDrawer(true)} className={styles.mobile}>
                    <IconButton
                        size="large"
                        aria-label="notifications regarding expired licenses"
                        color="inherit"
                        sx={{ color: iconColor }}
                    >
                        <Badge badgeContent={notificationsCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    {iconColor == "black" && <p>Notifications</p>}
                </div>
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Notification;
