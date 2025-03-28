
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for  form data
interface FormData {
  licenseName: string;
  licenseType: string;
  modalType: string;
  subscriptionType: string;
  subscriptionModel: string;
  billingEmail: string;
  departmentOwner: string;
  departmentName: string;
  employeeName: string;
  totalSeats: string;
  totalCost: string;
  purchaseDate: string;
  expirationDate: string;
  shelfLife: string;
  LicenseStatus ?: string;
}
// Initial state for the license form
const initialState: FormData[] = [];
// License form slice creation
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // To add License details
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload); 
    },
    // To delete the formData
    removeFormData: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.length) {
        state.splice(index, 1); 
      }
    },
    // To clear the license form
    clearFormData: () => initialState, 
  },
});

// Export the actions and reducer
export const { addFormData, removeFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;