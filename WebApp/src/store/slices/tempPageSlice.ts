import { createSlice } from "@reduxjs/toolkit";
import { Page } from "@/interfaces";

const initialState: Page = {
    name: '',
    width: 0,
    height: 0,
    pageHeight: 0,
    pageWidth: 0,
    type: '',
    uuid: 'null'
}

const tempPageSlice = createSlice({
    name: 'tempPage',
    initialState: initialState,
    reducers: {
        // 设置模板页面信息
        createPage(state, {payload}: {payload: Page}) {
            state.height = payload.height;
            state.width = payload.width;
            state.name = payload.name;
            state.pageHeight = payload.pageHeight;
            state.pageWidth = payload.pageWidth;
            state.type = payload.type;
            state.uuid = payload.uuid
        },
        changeTempWH(state, {payload}) {
            state.height = payload.height;
            state.width = payload.width;
        },
        changeTempPageWH(state, {payload}) {
            state.pageHeight = payload.pageHeight;
            state.pageWidth = payload.pageWidth;
        },
        changeTempName(state, {payload}) {
            state.name = payload
        },
        setUUID(state, {payload}) {
            state.uuid = payload
        },
        setType(state, {payload}) {
            state.type = payload
        }
    } 
})

export const {changeTempPageWH, changeTempWH, createPage, changeTempName, setUUID, setType} = tempPageSlice.actions;
export default tempPageSlice.reducer;