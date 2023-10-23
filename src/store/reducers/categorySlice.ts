import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {categoryState} from "../../types/category";


const initialState: categoryState = {
    categoryValue: 0,
}


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory(state, action: PayloadAction<number>) {
            state.categoryValue = action.payload
        }
    }
})

export default categorySlice.reducer

export const { changeCategory } = categorySlice.actions