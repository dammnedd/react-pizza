import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {pizzaItem} from "../../types/main";
import {cartState} from "../../types/cart";


const initialState: cartState = {
  cartItems: [],
  sumOfCart: 0,
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<pizzaItem[]>) {
      state.cartItems = action.payload
    },
    setSum(state, action: PayloadAction<number>) {
      state.sumOfCart = action.payload
    }
  }
})

export default cartSlice.reducer
export const {setCart, setSum} = cartSlice.actions