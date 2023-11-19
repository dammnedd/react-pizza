import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {pageState} from "../../types/page";

const initialState: pageState = {
    page: 1,
    pageQuantity: 0,
    limit: 6,
    isLoading: true,
}


const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        changePageValue(state, action: PayloadAction<number>) {
            state.page -= action.payload
        },
        setPageQuantity(state, action: PayloadAction<number>) {
            state.pageQuantity = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload
        }
    }
})


export default pageSlice.reducer
export const { setPage, setPageQuantity, changePageValue, setIsLoading, setLimit } = pageSlice.actions