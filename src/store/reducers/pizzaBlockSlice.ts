import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {pizzaBlockState} from "../../types/pizzaBlock";

const initialState: pizzaBlockState = {
    activeType: 0,
    activeSize: 0,
}


const pizzaBlockSlice = createSlice({
    name: 'pizzaBlock',
    initialState,
    reducers: {
        setActiveType(state, action: PayloadAction<number>) {
            state.activeType = action.payload
        },
        setActiveSize(state, action: PayloadAction<number>) {
            state.activeSize = action.payload
        }
    }
})

export default pizzaBlockSlice.reducer

export const { setActiveType, setActiveSize } = pizzaBlockSlice.actions