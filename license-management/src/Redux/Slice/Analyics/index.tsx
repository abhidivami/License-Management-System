import { createSlice } from "@reduxjs/toolkit";
import { FormData } from "../LicenseForm";

const initialState: FormData[] = [];

const analyticsSlice = createSlice({

    name:"analytics",
    initialState,
    reducers:{
        setData: (state, action) => {
            //just replace the existing data with the new data
            return action.payload;
          },
    }
})

export const { setData } = analyticsSlice.actions;
export default analyticsSlice.reducer;