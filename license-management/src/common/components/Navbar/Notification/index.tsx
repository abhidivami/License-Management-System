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
import { useSelector } from 'react-redux';

interface NotificationProps {
    iconColor: "white" | "black";
}

function Notification(props: NotificationProps) {
    
    const [notification,setNotification]=useState([])
    const [detailesVisible,setDetailesVisible]=useState(false);
    
   React.useEffect(()=>{
    axios.get('http://localhost:3005/notifications')
    .then(Response=>{setNotification(Response.data);
      console.log('fetch notification',Response.data.notification)
     })
    .catch(error=>console.log("error fetch notifications", error));
   },[])

    const { iconColor } = props;
    const [open, setOpen] = React.useState(false);
    const notificationsCount = 1;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const closeDrawer = () => {
        setOpen(false);
    }

    const toggleVisibleDetails = (item:any) =>{
        setDetailesVisible(true)
        console.log('carddddddddddd',item.message);
        
        console.log('-------------',LicensesFromRedux);
        const firstWordOfMessage = item.message.split(' ')[0];
        console.log('frtsssssssssssssssssss',firstWordOfMessage);
       const matchedLicense= LicensesFromRedux.filter((itemName:any)=>{
          //console.log('licensename',itemName.licenseName);
          return itemName.licenseName===firstWordOfMessage
          
        })

        if(matchedLicense.length>0){
            console.log('matched',matchedLicense);
            setDetailesVisible(matchedLicense)      
        }
        else{
            console.log('no matched licfens');
            setDetailesVisible(false)        
        }

        
        // if(LicensesFromRedux){
        //     const license=LicensesFromRedux.find((itemName:any)=> )
            
        // }
        

        // function messageFind(){
        //     // if(LicensesFromRedux){
        //     //     const licens=LicensesFromRedux.map((names:any)=>names.licenseName)
        //     //     console.log('/////////',licens);       
        //     // }                 
        // }
        // messageFind()
    }

    
    
    const LicensesFromRedux=useSelector((state:any)=>state.form);
     console.log('licensssssssss',LicensesFromRedux);
       
     
     const toggleDetails =()=>{
        setDetailesVisible(false)
     }
  

    const DrawerList = (
        <div style={{display:"flex"}}>
            {
              detailesVisible && (
            <Box sx={{ width: iconColor == "black" ? 320 : 600, margin:'10px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",borderRadius:"10px" , background:'white', height:"100vh",overflow:"scroll", "::-webkit-scrollbar":{display:"none"}  }} onClick={toggleDetails}>
              
                <div style={{display:"flex",justifyContent:"flex-end",padding:"15px 30px"}} >
                    <CloseIcon />
                </div>
               <div className={styles.detailsLicenseCard}>
                <div>
                    <span className='detailsHeader' >License Name</span>
                    <input type="text" value={detailesVisible[0].licenseName} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >License Type</span>
                    <input type="text" value={detailesVisible[0].licenseType} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >totalSeats </span>
                    <input type="text" value={detailesVisible[0].totalSeats} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >purchaseDate </span>
                    <input type="text" value={detailesVisible[0].purchaseDate} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >expirationDate </span>
                    <input type="text" value={detailesVisible[0].expirationDate} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >shelfLife </span>
                    <input type="text" value={detailesVisible[0].shelfLife} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >departmentOwner </span>
                    <input type="text" value={detailesVisible[0].departmentOwner} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >departmentName </span>
                    <input type="text" value={detailesVisible[0].departmentName} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >employeeName </span>
                    <input type="text" value={detailesVisible[0].employeeName} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >billingEmail </span>
                    <input type="text" value={detailesVisible[0].billingEmail} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >subscriptionType </span>
                    <input type="text" value={detailesVisible[0].subscriptionType} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >subscriptionModel </span>
                    <input type="text" value={detailesVisible[0].subscriptionModel} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >LicenseStatus </span>
                    <input type="text" value={detailesVisible[0].LicenseStatus} disabled />
                </div>
                <div>
                    <span className='detailsHeader' >totalCost </span>
                    <input type="text" value={detailesVisible[0].totalCost} disabled />
                </div>
               </div>
            </Box>
            )}
            <Box sx={{ width: iconColor == "black" ? 320 : 400, margin:'10px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",borderRadius:"10px" , background:'white', height:"100vh",overflow:"scroll", "::-webkit-scrollbar":{display:"none"}  }} role="Notification" >
            <div className={styles.notifications}>
                <div className={styles.notificationsHeading}>
                    <h4>Notifications</h4>
                    <button className={styles.notificationsHeadingClose} onClick={closeDrawer}>
                        <CloseIcon />
                    </button>
                </div>
                
                {
                    notification.map((item: any, index) => (
                        <Card key={index} sx={{ margin:'10px', boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.6)" ,borderRadius:'15px', cursor: 'pointer', }} onClick={()=>toggleVisibleDetails(item)}>
                            <CardContent>
                                <p>{item.message}</p>
                                <p style={{opacity:0.8,paddingTop:'10px'}}><b>{item.notification_date}</b></p>
                            </CardContent>
                        </Card>
                    ))
                }   
            </div>
        </Box> 
     </div>    
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

