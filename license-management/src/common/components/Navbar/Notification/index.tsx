// import * as React from 'react';
// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import axios from 'axios';
// import Drawer from '@mui/material/Drawer';
// import { Badge, IconButton, Tooltip } from '@mui/material';
// import styles from './index.module.scss';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CloseIcon from '@mui/icons-material/CancelSharp';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import './index.module.scss';
// import { useSelector } from 'react-redux';
// import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
// import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';

// interface NotificationProps {
//     iconColor: "white" | "black";
// }

// function Notification(props: NotificationProps) {

//     const [notification,setNotification]=useState([])
//     //detials visible
//     const [detailesVisible,setDetailesVisible]=useState(false);
//     //notfication count
//    // const [notificationCount,setNotificationCount]= useState(notification.length)

//    React.useEffect(()=>{
//     axios.get('http://localhost:3005/notifications')
//     .then(Response=>{setNotification(Response.data);
//       console.log('fetch notification',Response.data.notification)
//      })
//     .catch(error=>console.log("error fetch notifications", error));
//    },[])

//     const { iconColor } = props;
//     const [open, setOpen] = React.useState(false);
//     const notificationsCount = notification.filter((item:any)=>!item.read).length;
//     const toggleDrawer = (newOpen: boolean) => () => {
//         setOpen(newOpen);
//     };

//     const closeDrawer = () => {
//         setOpen(false);
//     }

//     const toggleVisibleDetails = (item:any) =>{
//         setDetailesVisible(true)
//         console.log('carddddddddddd',item.message);

//         const firstWordOfMessage = item.message.split(' ')[0];

//        const matchedLicense= LicensesFromRedux.filter((itemName:any)=>{

//           return itemName.licenseName===firstWordOfMessage

//         })

//         if(matchedLicense.length>0){
//             console.log('matched License',matchedLicense);
//             setDetailesVisible(matchedLicense)
//         }
//         else{
//             console.log('no matched licenses');
//             setDetailesVisible(false)
//         }
//     }

//     const LicensesFromRedux=useSelector((state:any)=>state.form);
//      console.log('licenses data from redux',LicensesFromRedux);

//      const toggleDetailsClose =()=>{
//         setDetailesVisible(false)
//      }

//     const markAsRead = (id:any) =>{
//         notification.map((item:any)=>{
//             if(item.id===id)
//             {
//                 item.read = true;
//                // setNotificationCount(notificationCount-1)
//             }
//         })
//         setNotification([...notification])
//     }

//     const DrawerList = (
//         <div style={{display:"flex"}}>
//             {
//               detailesVisible && (
//             <Box sx={{ width: iconColor == "black" ? 320 : 600, margin:'10px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",borderRadius:"10px" , background:'white', height:"100vh",overflow:"scroll", "::-webkit-scrollbar":{display:"none"} , }}>

//                 <div style={{display:"flex",justifyContent:"flex-end",padding:"15px 30px",cursor:"pointer"}} >
//                     <CloseIcon onClick={toggleDetailsClose} />
//                 </div>
//                 <div style={{display:"flex",justifyContent:"center",fontSize:"25px"}}>
//                   <p>License Details</p>
//                 </div>
//                <div className={styles.detailsLicenseCard}>
//                 <div>
//                     <span className='detailsHeader' >License Name</span>
//                     <input className={styles.inputTag}   className = {styles.inputTag}type="text" value={detailesVisible[0].licenseName} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >License Type</span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].licenseType} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >totalSeats </span>
//                     <input  className = {styles.inputTag} type="text" value={detailesVisible[0].totalSeats} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >purchaseDate </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].purchaseDate} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >expirationDate </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].expirationDate} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >shelfLife </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].shelfLife} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >departmentOwner </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].departmentOwner} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >departmentName </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].departmentName} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >employeeName </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].employeeName} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >billingEmail </span>
//                     <input  className = {styles.inputTag} type="text" value={detailesVisible[0].billingEmail} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >subscriptionType </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].subscriptionType} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >subscriptionModel </span>
//                     <input  className = {styles.inputTag} type="text" value={detailesVisible[0].subscriptionModel} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >LicenseStatus </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].LicenseStatus} disabled />
//                 </div>
//                 <div>
//                     <span className='detailsHeader' >totalCost </span>
//                     <input className = {styles.inputTag} type="text" value={detailesVisible[0].totalCost} disabled />
//                 </div>
//                </div>
//             </Box>
//             )}

//             <div className={styles.notifications}>
//             <Box sx={{ width: iconColor == "black" ? 320 : 400, margin:'10px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",borderRadius:"10px" , background:'white', height:"100vh",overflow:"scroll", "::-webkit-scrollbar":{display:"none"}  }} role="Notification" >

//                 <div className={styles.notificationHeader}>
//                     <div className={styles.notificationHeader}>
//                         <div className={styles.notificationHeading}>
//                         <h4>Notifications</h4>
//                         </div>
//                         <div className={styles.notificationClose}>
//                         <CloseIcon onClick={closeDrawer} />
//                         </div>
//                     </div>

//                 </div>

//                 <div className={styles.cards}>
//                 {
//                     notification.map((item: any, index) => (
//                         // <div className={styles.cards} >
//                         <Card key={index} sx={{margin:"18px", width:"auto", boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.6)" ,borderRadius:'15px',backgroundColor:item.read ?'white':"#ECECEC"}} >
//                             <CardContent>
//                                 <p>{item.message}</p>
//                                 <p style={{opacity:0.8,paddingTop:'10px'}}><b>{item.notification_date}</b></p>
//                                 <div style={{display:'flex',justifyContent:"end",cursor:"pointer",gap:"20px"}}>
//                                         <MarkAsUnreadOutlinedIcon onClick={()=>markAsRead(item.id)} />
//                                     <InfoOutlineIcon onClick={()=>toggleVisibleDetails(item)} />
//                                 </div>
//                             </CardContent>
//                         </Card>
//                         // </div>
//                     ))
//                 }
//                </div>
//            </Box>
//            </div>
//      </div>
//     );

//     return (
//         <div>
//             <Tooltip title='Notification'>
//                 <div onClick={toggleDrawer(true)} className={styles.mobile}>
//                     <IconButton
//                         size="large"
//                         aria-label="notifications regarding expired licenses"
//                         color="inherit"
//                         sx={{ color: iconColor }}
//                     >
//                         <Badge badgeContent={notificationsCount} color="error">
//                             <NotificationsIcon />
//                         </Badge>
//                     </IconButton>
//                     {iconColor == "black" && <p>Notifications</p>}
//                 </div>
//             </Tooltip>
//             <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'
//             sx={{
//                 "& .MuiDrawer-paper":{
//                     backgroundColor:"transparent",
//                     boxShadow:"none"
//                 }
//             }}
//             >
//                 {DrawerList}
//             </Drawer>
//         </div>
//     );
// }

// export default Notification;

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import { Badge, IconButton, Tooltip } from "@mui/material";
import styles from "./index.module.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/CancelSharp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./index.module.scss";
import { useSelector } from "react-redux";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";

interface NotificationProps {
  iconColor: "white" | "black";
}

function Notification(props: NotificationProps) {
  const [notification, setNotification] = useState([]);
  //detials visible
  const [detailesVisible, setDetailesVisible] = useState(false);
  //notfication count
  // const [notificationCount,setNotificationCount]= useState(notification.length)

  React.useEffect(() => {
    axios
      .get("http://localhost:3005/notifications")
      .then((Response) => {
        setNotification(Response.data);
        console.log("fetch notification", Response.data.notification);
      })
      .catch((error) => console.log("error fetch notifications", error));
  }, []);

  const { iconColor } = props;
  const [open, setOpen] = React.useState(false);
  const notificationsCount = notification.filter(
    (item: any) => !item.read
  ).length;
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const toggleVisibleDetails = (item: any) => {
    setDetailesVisible(true);
    console.log("card message", item.message);
    console.log("licenses from redux", LicensesFromRedux);
    const firstWordOfMessage = item.message.split(" ")[0];
    console.log("first word of message", firstWordOfMessage);

    const matchedLicense = LicensesFromRedux.filter((itemName: any) => {
      //console.log('licensename',itemName.licenseName);
      return itemName.licenseName === firstWordOfMessage;
    });

    if (matchedLicense.length > 0) {
      console.log("matched License", matchedLicense);
      setDetailesVisible(matchedLicense);
    } else {
      console.log("no matched licenses");
      setDetailesVisible(false);
    }
  };

  const LicensesFromRedux = useSelector((state: any) => state.form);
  console.log("licenses data from redux", LicensesFromRedux);

  const toggleDetailsClose = () => {
    setDetailesVisible(false);
  };

  const markAsRead = (id: any) => {
    notification.map((item: any) => {
      if (item.id === id) {
        item.read = true;
        // setNotificationCount(notificationCount-1)
      }
    });
    setNotification([...notification]);
  };

  const DrawerList = (
    <div style={{ display: "flex" }}>
      {detailesVisible && (
        <Box
          sx={{
            width: iconColor == "black" ? 320 : 600,
            margin: "10px",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            background: "white",
            height: "100vh",
            overflow: "scroll",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "15px 30px",
              cursor: "pointer",
            }}
          >
            <CloseIcon onClick={toggleDetailsClose} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
            }}
          >
            <p>License Details</p>
          </div>
          <div className={styles.detailsLicenseCard}>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>License Name</p>
              <input className={styles.inputTag}  
                            type="text"
                value={detailesVisible[0].licenseName}
                disabled
              />
            </div>

            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>License Type</p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].licenseType}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Total Seats </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].totalSeats}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Purchase Date </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].purchaseDate}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Expiration Date </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].expirationDate}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Shelf Life </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].shelfLife}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Department Owner </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].departmentOwner}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Department Name </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].departmentName}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Employee Name </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].employeeName}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Billing Email </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].billingEmail}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Subscription Type </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].subscriptionType}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Subscription Model </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].subscriptionModel}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>License Status </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].LicenseStatus}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Total Cost </p>
              <input className={styles.inputTag} 
                type="text"
                value={detailesVisible[0].totalCost}
                disabled
              />
            </div>
          </div>
        </Box>
      )}

      <div className={styles.notifications}>
        <Box
          sx={{
            width: iconColor == "black" ? 320 : 400,
            margin: "10px",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            background: "white",
            height: "100vh",
            overflow: "scroll",
            "::-webkit-scrollbar": { display: "none" },
          }}
          role="Notification"
        >
          <div className={styles.notificationHeader}>
            <div className={styles.notificationHeader}>
              <div className={styles.notificationHeading}>
                <h4>Notifications</h4>
              </div>
              <div className={styles.notificationClose}>
                <CloseIcon onClick={closeDrawer} />
              </div>
            </div>
          </div>

          <div className={styles.cards}>
            {notification.map((item: any, index) => (
              // <div className={styles.cards} >
              <Card
                key={index}
                sx={{
                  margin: "18px",
                  width: "auto",
                  boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.6)",
                  borderRadius: "15px",
                  backgroundColor: item.read ? "white" : "#ECECEC",
                }}
              >
                <CardContent>
                  <p>{item.message}</p>
                  <p style={{ opacity: 0.8, paddingTop: "10px" }}>
                    <b>{item.notification_date}</b>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      cursor: "pointer",
                      gap: "20px",
                    }}
                  >
                    <MarkAsUnreadOutlinedIcon
                      onClick={() => markAsRead(item.id)}
                    />
                    <InfoOutlineIcon
                      onClick={() => toggleVisibleDetails(item)}
                    />
                  </div>
                </CardContent>
              </Card>
              // </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );

  return (
    <div>
      <Tooltip title="Notification">
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
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Notification;
