import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {mainState, pizzaItem} from "../../types/main.ts";

const initialState: mainState = {
    pizzas: [],
    searchValue: '',
    isCart: false
}


const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<pizzaItem[]>) {
            state.pizzas = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setIsCart(state, action: PayloadAction<boolean>) {
            state.isCart = action.payload
        }
    }
})


export default mainSlice.reducer
export const {setPizzas, setSearchValue, setIsCart} = mainSlice.actions