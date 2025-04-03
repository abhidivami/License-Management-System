import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for  form data
interface FormData {
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
  totalSeats: string | number;
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
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
    // To delete the formData
    // removeFormData: (state, action: PayloadAction<number>) => {
    //   const index = action.payload;
    //   if (index >= 0 && index < state.length) {
    //     state.splice(index, 1); 
    //   }
    // },
    removeFormData: (state, action: PayloadAction<number>) => {
      // Filter out the item based on the id to remove the item from the state
      return state.filter((formData) => formData.id !== action.payload.toString());
    },
    clearFormData: () => initialState,
    setData: (state, action: PayloadAction<FormData[]>) => {
      alert("I am in setData reducer");
      return action.payload.map((item) => ({
        ...item,
        LicenseStatus: item.expirationDate < new Date().toISOString() ? 'Expired' : 'Active',
        shelfLife: item.shelfLife, 
      }));
    },
    // LicenseFormSlice.ts
    // LicenseFormSlice.ts
      updateData: (state, action) => {
        const index = state.findIndex(
          (item) => item.id === action.payload.id // Match by existing ID
        );
        if (index !== -1) {
          state[index] = action.payload; // Replace the old entry
        }
      },
  },
});

// Export the actions and reducer
export const { addFormData, removeFormData, clearFormData, setData, updateData } = formSlice.actions;
export default formSlice.reducer;
