import {combineReducers, configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import SortSlice from './reducers/sortSlice.ts'
import categorySlice from "./reducers/categorySlice.ts";
import pageSlice from "./reducers/pageSlice.ts";
import mainSlice from "./reducers/mainSlice.ts";
import {fetchPizza} from "./services/pizzaService.ts";
import {fetchCart} from "./services/cartService.ts";
import cartSlice from "./reducers/cartSlice.ts";

const rootReducer = combineReducers({
    [fetchPizza.reducerPath]: fetchPizza.reducer,
    [fetchCart.reducerPath]: fetchCart.reducer,
    SortSlice,
    categorySlice,
    pageSlice,
    mainSlice,
    cartSlice,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fetchPizza.middleware, fetchCart.middleware)
})

export type RootState = ReturnType<typeof rootReducer>