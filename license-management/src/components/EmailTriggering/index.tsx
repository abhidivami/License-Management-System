import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import axios from "axios";
import { FormData } from "../../Redux/Slice/LicenseForm";

const EmailTriggering = () => {
    const [notification, setNotification] = useState<FormData[]>([]);
    const data = useSelector((state: RootState) => state.form);

    const expiringInSevenDays = data.filter((license) => {
        const expirationDate = new Date(license.expirationDate);
        const currentDate = new Date();
        const timeDiff = expirationDate.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff <= 7 && daysDiff >= 0;
    });


    useEffect(() => {
        const postData = async () => {
            try {
                const existingNotificationsResponse = await axios.get("http://localhost:3005/notifications");
                const existingNotifications = existingNotificationsResponse.data;

                for (const license of expiringInSevenDays) {
                    const existingNotification = existingNotifications.find((n: { license_id: string; }) => n.license_id === license.id);
                    // alert(existingNotification.license_id)
                    const notificationData = {
                        license_id: license.id,
                        message: `${license.licenseName} license is expiring in ${Math.ceil((new Date(license.expirationDate).getTime() - new Date().getTime()) /
                            (1000 * 3600 * 24))} days. Please renew by ${new Date(license.expirationDate).toLocaleDateString()}.`,
                        notification_date: new Date().toLocaleDateString(),
                        id: existingNotification? existingNotification.id : Math.random().toString(36).substr(2, 8),
                    };

                    if (existingNotification) {
                        await axios.put(`http://localhost:3005/notifications/${existingNotification.id}`,notificationData);
                        console.log("Notification updated:", existingNotification.id);
                    } 
                    else {
                        await axios.post("http://localhost:3005/notifications",notificationData);
                        console.log("Notification created");
                    }
                     sendEmail(license);
                }

                setNotification(expiringInSevenDays);
            } catch (error) {
                console.log("Error processing notifications", error);
            }
        };

        postData();
        const intervalId = setInterval(postData, 86400000); // Run daily
        const checkDayChange = () => {
            const currentDate = new Date();
            if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
                postData();
            }
        };

        const intervalId2 = setInterval(checkDayChange, 60000); // Check every minute

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
        };

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2)
        }
    }, [data]);

    const sendEmail = async (license: FormData) => {
        const expirationDate = new Date(license.expirationDate);
        const daysDiff = Math.ceil(
            (expirationDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
        );
            try {
                await axios.post("http://localhost:3006/send-email", {
                    email: license.billingEmail,
                    licenseName: license.licenseName,
                    days: daysDiff,
                    expiryDate: expirationDate.toLocaleDateString(),
                });
                console.log("Email sent from backend!");
            } 
            catch (error: any) {
                console.log("Failed to send email", error);
            }
    };

    return (
        <>
            {notification.map((license) => (
                <div key={license.id}>{/* Render notification status if needed */}</div>
            ))}
        </>
    );
};

export default EmailTriggering;