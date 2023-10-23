import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sortState} from "../../types/sort";
import {listState} from "../../types/sort";



const initialState: sortState = {
    mouseValue: null,
    open: false,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
        type: 'desc'
    }
}


export const sortSlice = createSlice({
    name: 'sortSlice',
    initialState,
    reducers: {
        changeSortProperty(state, action: PayloadAction<listState>) {
            state.sort.name = action.payload.name
            state.sort.sortProperty = action.payload.sort
            state.sort.type = action.payload.type
        },
        changeOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload
        },
        mouseEntered(state, action: PayloadAction<number | null>) {
            state.mouseValue = action.payload
        }
    }
})

export default sortSlice.reducer
export const { changeSortProperty, changeOpen, mouseEntered } =  sortSlice.actions