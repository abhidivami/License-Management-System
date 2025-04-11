import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  totalSeats: string;
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
  name: "form",
  initialState,
  reducers: {
    // To add Data to the redux
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
    //  To remove item from the redux
    removeFormData: (state, action: PayloadAction<string>) => {
      // Filter out the item based on the id to remove the item from the state
      return state.filter(
        (formData) => formData.id !== action.payload.toString()
      );
    },
    // To clear the form
    clearFormData: () => initialState,
    setData: (_state, action: PayloadAction<FormData[]>) => {
      return action.payload.map((item) => ({
        ...item,
        LicenseStatus:
          item.expirationDate < new Date().toISOString() ? "Expired" : "Active",
        shelfLife: item.shelfLife,
      }));
    },
    // To update the data
    updateData: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    setImportedData: (state, action) => {
      const importedData = action.payload.map(
        (item: {
          shelfLife: any;
          expirationDate: string | number | Date;
          id: any;
        }) => ({
          ...item,
          id: item.id || Math.random().toString(36).substr(2, 9),
          LicenseStatus:
            new Date(item.expirationDate) < new Date() ? "Expired" : "Active",
          shelfLife: item.shelfLife,
        })
      );
      const existingIds = new Set(state.map((item) => item.id));
      const newItems = importedData.filter(
        (item: { id: string }) => !existingIds.has(item.id)
      );
      return [...state, ...newItems];
    },
  },
});

// Export the actions and reducer
export const {
  addFormData,
  removeFormData,
  clearFormData,
  setData,
  updateData,
  setImportedData,
} = formSlice.actions;
export default formSlice.reducer;
