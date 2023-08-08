import {createSlice} from '@reduxjs/toolkit'
import { Widget } from '@/interfaces'
import {useSelector} from 'react-redux'

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
            const {width, height} = payload;
            let mx = state.widgets[state.activeIndex].left + payload.moveX;
            let my = state.widgets[state.activeIndex].top + payload.moveY;
            mx = mx < 0 ? 0 : mx;
            my = my < 0 ? 0 : my;
            mx = mx + state.widgets[state.activeIndex].width > width ? width - state.widgets[state.activeIndex].width : mx;
            my = my + state.widgets[state.activeIndex].height > height ? height - state.widgets[state.activeIndex].height : my;
            state.widgets[state.activeIndex].left = mx;
            state.widgets[state.activeIndex].top = my;
        }
    }

})

export const {changeActive,changeWidgetPos,changeWidgetWH,createWidgets} = tempWidgetSlice.actions;
export default tempWidgetSlice.reducer;