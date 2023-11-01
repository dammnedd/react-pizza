import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {mainState, pizzaItem} from "../../types/main";

const initialState: mainState = {
    pizzas: null,
    searchValue: '',
}


const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<pizzaItem>) {
            state.pizzas = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }
    }
})


export default mainSlice.reducer
export const {setPizzas, setSearchValue} = mainSlice.actions