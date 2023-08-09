import { createSlice } from "@reduxjs/toolkit";
import { MenuItem } from "@/interfaces";

const initialState: MenuItem[] = []

const topNavSlice = createSlice({
    name: 'topNav',
    initialState: initialState,
    reducers: {
        addNav(state, {payload}) {
            state.push(payload)
        },
        deleteNav(state, {payload}) {
            if (payload !== -1)
            state.splice(payload, 1)
        }
    }
})

export const {addNav, deleteNav} = topNavSlice.actions
export default topNavSlice.reducer;