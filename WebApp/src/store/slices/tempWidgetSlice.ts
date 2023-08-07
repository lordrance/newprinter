import {createSlice} from '@reduxjs/toolkit'
import { Widget } from '@/interfaces'


const initialState = {
    activeIndex: -1,
    widgets: [] as Widget[]
}

const tempWidgetSlice = createSlice({
    name: 'tempWidget',
    initialState: initialState,
    reducers: {
        createWidgets(state, {payload}: {payload: Widget[]}) {
            state.widgets = payload;
            state.activeIndex = -1;
        },
        changeActive(state, {payload}) {
            state.activeIndex = payload;
        },
        changeWidgetWH(state, {payload}) {
            state.widgets[state.activeIndex].width = payload.width;
            state.widgets[state.activeIndex].height = payload.height;
        },
        changeWidgetPos(state, {payload}) {
            state.widgets[state.activeIndex].left = payload.left;
            state.widgets[state.activeIndex].top = payload.top;
        }
    }

})

export const {changeActive,changeWidgetPos,changeWidgetWH,createWidgets} = tempWidgetSlice.actions;
export default tempWidgetSlice.reducer;