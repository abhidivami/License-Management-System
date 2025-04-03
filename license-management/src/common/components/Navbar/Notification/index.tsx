import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Drawer from '@mui/material/Drawer';
import { Badge, IconButton, Tooltip } from '@mui/material';
import styles from './index.module.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/CancelSharp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './index.module.scss';

interface NotificationProps {
    iconColor: "white" | "black";
}

function Notification(props: NotificationProps) {
    
    const [notification,setNotification]=useState([])
   React.useEffect(()=>{
    axios.get('http://localhost:3034/notifications')
    .then(Response=>{setNotification(Response.data);
      console.log('fetch notification',Response.data.notification)
     })
    .catch(error=>console.log("error fetch notifications", error));
   },[])

    const { iconColor } = props;
    const [open, setOpen] = React.useState(false);

   //const licenseName = "ChatGPT";

    //to store notifications count
    const notificationsCount = 1;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const closeDrawer = () => {
        setOpen(false);
    }

    const DrawerList = (
        <Box sx={{ width: iconColor == "black" ? 320 : 400, margin:'10px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",borderRadius:"10px" , background:'white'  }} role="Notification" onClick={toggleDrawer(false)}>
            <div className={styles.notifications}>
                <div className={styles.notificationsHeading}>
                    <h4>Notifications</h4>
                    <button className={styles.notificationsHeadingClose} onClick={closeDrawer}>
                        <CloseIcon />
                    </button>
                </div>

                {/* notification array */}
                {/* <div className={styles.notificationsElement}>
                    <p>{licenseName} is going to expired. Renew now</p>
                </div>

                <div className={styles.notificationsElement}>
                    <p>{licenseName} is going to expired. Renew now</p>
                </div> */}
                {
                    notification.map((item: any, index) => (
                        <Card key={index} sx={{ margin:'10px', boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.6)" ,borderRadius:'15px' }}>
                            <CardContent>
                                <p>{item.message}</p>
                                <p style={{opacity:0.8,paddingTop:'10px'}}><b>{item.notification_date}</b></p>
                            </CardContent>
                        </Card>
                    ))
                }   
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
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'
            sx={{
                "& .MuiDrawer-paper":{
                    backgroundColor:"transparent",
                    boxShadow:"none"
                }
            }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Notification;

