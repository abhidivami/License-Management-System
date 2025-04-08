import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for  form data
export interface FormData {
  id: string;
  licenseName: string;
  licenseType: string;
  modalType: string;
  subscriptionType: string;
  subscriptionModel: string;
  billingEmail: string;
  departmentOwner: string;
  departmentName: string;
  employeeName: string;
  totalSeats:  string;
  totalCost: string;
  purchaseDate: string;
  expirationDate: string;
  shelfLife: string | number;
  LicenseStatus?: string;
}

// Initial state for the license form
const initialState: FormData[] = [];

// License form slice creation
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // To add Data to the redux
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
  //  To remove item from the redux
    removeFormData: (state, action: PayloadAction<number>) => {
      // Filter out the item based on the id to remove the item from the state
      return state.filter((formData) => formData.id !== action.payload.toString());
    },
    // To clear the form
    clearFormData: () => initialState,
    setData: (state, action: PayloadAction<FormData[]>) => {
      return action.payload.map((item) => ({
        ...item,
        LicenseStatus: item.expirationDate < new Date().toISOString() ? 'Expired' : 'Active',
        shelfLife: item.shelfLife, 
      }));
    },
      // To update the data 
      updateData: (state, action) => {
        const index = state.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload; 
        }
      },
  },
});

// Export the actions and reducer
export const { addFormData, removeFormData, clearFormData, setData, updateData } = formSlice.actions;
export default formSlice.reducer;
