import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface Notification{
    license_id:number,
    message:string,
    notification_Date:string,
    markAsRead: boolean,
 }



const notificationSlice = createSlice({

     name:"notification",
     initialState:{
     Notification:<Notification[]>[],
     },
     reducers:{

        setNotificationData:(state, action:PayloadAction<Notification[]>)=>{
            state.Notification = action.payload;

            console.log("redux data: ", state.Notification);
        },
       
        markAsRead: (state, action) => {
            let licenseId = action.payload;
            console.log('license id ', licenseId);
            state.Notification = state.Notification.map((item: any) => {  
              if (item.id === licenseId ) {
                console.log('matched item ',item);
                
                return { ...item, markAsRead: true }; 
              }
              
              return item;
            });
          }
     }

})

export const { markAsRead,setNotificationData }= notificationSlice.actions;
export default notificationSlice.reducer;