import {combineReducers, configureStore} from "@reduxjs/toolkit";
import SortSlice from './reducers/sortSlice.ts'
import categorySlice from "./reducers/categorySlice.ts";
import pageSlice from "./reducers/pageSlice.ts";

const rootReducer = combineReducers({
    SortSlice,
    categorySlice,
    pageSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>