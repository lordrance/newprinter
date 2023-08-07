import { createSlice } from "@reduxjs/toolkit";
import { Page } from "@/interfaces";

const initialState: Page = {
    name: '',
    width: 0,
    height: 0,
    pageHeight: 0,
    pageWidth: 0
}

const tempPageSlice = createSlice({
    name: 'tempPage',
    initialState: initialState,
    reducers: {
        createPage(state, {payload}: {payload: Page}) {
            state.height = payload.height;
            state.width = payload.width;
            state.name = payload.name;
            state.pageHeight = payload.pageHeight;
            state.pageWidth = payload.pageWidth;
        },
        changeTempWH(state, {payload}) {
            state.height = payload.height;
            state.width = payload.width;
        },
        changeTempPageWH(state, {payload}) {
            state.pageHeight = payload.pageHeight;
            state.pageWidth = payload.pageWidth;
        }
    } 
})

export const {changeTempPageWH, changeTempWH, createPage} = tempPageSlice.actions;
export default tempPageSlice.reducer;