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
import { useDispatch, useSelector } from "react-redux";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import {
  markAsRead,
  setNotificationData,
} from "../../../../Redux/Slice/notification";
import { RootState } from "../../../../Redux/Store";

function Notification() {
  //set notifications on notifications arrays
  const [notification, setNotification] = useState([]);

  //detials visible
  const [detailesVisible, setDetailesVisible] = useState(false);
  //notfication count
  //const [notificationCount, setNotificationCount] = useState(
  //   notification.length
  // );

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   console.log(notification, "notificationsss");
  // }, [notification]);

  //get notification arrays using useEffect and axios
  React.useEffect(() => {
    axios
      .get("http://localhost:3005/notifications")
      .then((Response) => {
        setNotification(Response.data);
        console.log("fetch notification", Response.data);
        dispatch(setNotificationData(Response.data));
      })
      .catch((error) => console.log("error fetch notifications", error));
  }, [dispatch]);

  //notification data from json-server using useselector
  const notifications = useSelector(
    (state: RootState) => state.notification.Notification
  );
  console.log("data from redux notificationssss  ", notifications);

  // const unreadCount = useSelector(
  //   (state: RootState) => state.notification.unreadCount
  // );

  const [open, setOpen] = React.useState(false);

  //notification counter filter when mark as read
  const notificationsCount = notifications.filter(
    (item: any) => !item.read
  ).length;

  //opne drawer
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  //close drawer when click the close icon
  const closeDrawer = () => {
    setOpen(false);
    setDetailesVisible(false);
  };

  //toggle visible details and split the first word message and licesne from redux
  const toggleVisibleDetails = (item: any) => {
    setDetailesVisible(true);
    console.log("card message", item.message);
    console.log("licenses from redux", LicensesFromRedux);
    const firstWordOfMessage = item.message.split(" ")[0];
    console.log("first word of message", firstWordOfMessage);

    //matehed license message first word and license name matexh record show
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

  //License data from redux
  const LicensesFromRedux = useSelector((state: any) => state.form);
  console.log("licenses data from redux", LicensesFromRedux);

  const toggleDetailsClose = () => {
    setDetailesVisible(false);
  };

  const handleMarkAsRead = (id: any) => {
    console.log("item id mark as read ", id);
    dispatch(markAsRead(id));
  };

  const DrawerList = (
    <div style={{ display: "flex" }}>
      {detailesVisible && (
        <Box
          sx={{
            height: "calc(100vh - 20px)",
            width: "600px",
            margin: "10px",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            background: "white",
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
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].licenseName}
                disabled
              />
            </div>

            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>License Type</p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].licenseType}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Total Seats </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].totalSeats}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Purchase Date </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].purchaseDate}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Expiration Date </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].expirationDate}
                disabled
              />
            </div>

            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Department Owner </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].departmentOwner}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Department Name </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].departmentName}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Employee Name </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].employeeName}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Billing Email </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].billingEmail}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Subscription Type </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].subscriptionType}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Subscription Model </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].subscriptionModel}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>License Status </p>
              <input
                className={styles.inputTag}
                type="text"
                value={detailesVisible[0].LicenseStatus}
                disabled
              />
            </div>
            <div className={styles.detailsInfo}>
              <p className={styles.detailsHeader}>Total Cost </p>
              <input
                className={styles.inputTag}
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
          className={styles.drawer}
          sx={{
            height: "calc(100vh - 20px)",
            width: "400px",
            margin: "10px",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            background: "white",

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
                <Tooltip title="Close">
                  <CloseIcon onClick={closeDrawer} />
                </Tooltip>
              </div>
            </div>
          </div>

          <div className={styles.cards}>
            {notifications.map((item: any, index) => (
              <>
                {console.log(item, "changed item")}
                <Card
                  className={styles.card}
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
                      <Tooltip title="Mark as Read">
                        <MarkAsUnreadOutlinedIcon
                          onClick={() => handleMarkAsRead(item.id)}
                        />
                      </Tooltip>
                      <Tooltip title="Detail Info">
                        <InfoOutlineIcon
                          onClick={() => toggleVisibleDetails(item)}
                        />
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </>
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
          >
            <Badge badgeContent={notificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {<p>Notifications</p>}
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
