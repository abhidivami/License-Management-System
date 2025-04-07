import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    searchText: string;
}

const initialState: InitialState = {
    searchText: "",
}
const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        setSearchText: (state, value) => {

            state.searchText = value.payload.search;
            // console.log("search value: ", state.searchText);
        }
    }
});

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;