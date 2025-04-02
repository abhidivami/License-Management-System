// read the data from db.json of licenses and for each license if the expiration is in 7 days or less, send an email to the user with the license information

import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';

const emailTriggering = () => {
    const [data, setData] = useState([]);
    const [notification, setNotification] = useState([]);
    useEffect(() =>{
        const fetchData = async () => {
            const response = await fetch('/db.json');
            const json = await response.json();
            setData(json.licenses);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const checkExpirations = () => {
            const notifications = data.filter((license) => {
                const expirationDate = new Date(license.expiry_date);
                const currentDate = new Date();
                const timeDiff = expirationDate.getTime() - currentDate.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return daysDiff <= 1000 && daysDiff >= 0;
            });

            if (notifications.length > 0) {
                setNotification(notifications);
            }
        };
        checkExpirations();
        const intervalId = setInterval(() => {
            checkExpirations();
        }, 86400000); 
        return () => {
            clearInterval(intervalId);
        };
    }, [data]);
    
    const sendEmail = (license) => {
        // const millisecondsDiff = new Date().getTime() - new Date(license.expiry_date).getTime();
        // const daysDiff = Math.round(
        //     millisecondsDiff / (24 * 60 * 60 * 60)
        //   );
        // const templateParams = {
        //     email:"abhilashadunuri@divami.com", 
        //     from_name:"Team License Manageent System",
        //     license_name: license.license_name,
        //     days: daysDiff,
        //     expiry_date: license.expiry_date,
            
        //   }
        //   emailjs.send('service_lev342c', 'template_t68ad3d', templateParams,'Kj-06fIjMN8qAELuq')
        //   .then(function(response) {
        //     console.log('SUCCESS!', response.status, response.text);
        //   }, function(error) {
        //     console.log('FAILED...', error);
        //   });
        }

  return (
    <>
        {
            notification.map((license) => {
                sendEmail(license);
            })
        }
    </>
  )
}

export default emailTriggering
