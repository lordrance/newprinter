import {createSlice} from '@reduxjs/toolkit'
import { Widget } from '@/interfaces'

const initialState = {
    activeIndex: -1,
    widgets: [] as Widget[]
}

let posX: number[] = [];
let posY: number[] = [];

let near :number[][] = [];

const uniqueArray = (arr: number[]) => {
    let uniqueArray: number[] = [];
    for (const num of arr) {
        if (uniqueArray.length === 0 || num !== uniqueArray[uniqueArray.length - 1]) {
            uniqueArray.push(num);
        }
    }
    return uniqueArray
}

const findAdjacentIndices = (arr: number[], target: number) => {
    const targetIndex = arr.indexOf(target);

    if (targetIndex === -1) {
        return [-1, -1]; 
    }
    
    arr.splice(targetIndex, 1);

    const prevIndex = targetIndex - 1;
    const nextIndex = targetIndex;

    return [prevIndex >= 0 ? prevIndex : -1, nextIndex < arr.length ? nextIndex : -1];
}

const tempWidgetSlice = createSlice({
    name: 'tempWidget',
    initialState: initialState,
    reducers: {
        createWidgets(state, {payload}: {payload: Widget[]}) {
            state.widgets = payload;
            state.activeIndex = -1;
            let c = 0;
            posX = []; posY = []
            payload.forEach(x=>{
                posX[c] = x.left; posY[c] = x.top; c++;
                posX[c] = x.left+x.width; posY[c] = x.top + x.height; c++;
            })
            posX.sort(); posY.sort();
            posX = uniqueArray(posX); posY = uniqueArray(posY);
            console.log(posX, posY)
        },
        changeActive(state, {payload}) {
            state.activeIndex = payload;
            if (payload === -1) {
                state.widgets.forEach(x=>{
                    if ('activeCol' in x) {
                        x.activeCol = -1
                    }
                })
            } else {
                let t, b, l, r;
                const w = state.widgets[state.activeIndex]
                t = w.top; b = w.top + w.height; l = w.left; r = w.left + w.width;
                near[0] = findAdjacentIndices(posY, t);
                near[1] = findAdjacentIndices(posY, b);
                near[2] = findAdjacentIndices(posX, l);
                near[3] = findAdjacentIndices(posX, r);
            }
            console.log(near)
            console.log(posX, posY)
        },
        changeWidgetWHO(state, {payload}) {
            state.widgets[state.activeIndex].width = payload.width;
            state.widgets[state.activeIndex].height = payload.height;
        },
        changeWidgetWH(state, {payload}) {
            let mx = state.widgets[state.activeIndex].width + payload.moveX;
            let my = state.widgets[state.activeIndex].height + payload.moveY;
            mx = mx < 10 ? 10 : mx
            my = my < 10 ? 10 : my
            state.widgets[state.activeIndex].width = mx;
            state.widgets[state.activeIndex].height = my;
        },
        changeWidgetPosO(state, {payload}) {
            state.widgets[state.activeIndex].left = payload.left;
            state.widgets[state.activeIndex].top = payload.top;
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
        },
        addWidget(state, {payload}) {
            state.widgets.push(payload)
        },
        deleteWidget(state) {
            state.widgets.splice(state.activeIndex, 1)
        },
        setStyle(state, {payload}) {
            state.widgets[state.activeIndex].style = payload
        },
        changeValue(state, {payload}) {
            state.widgets[payload.index].value = payload.value;
        },
        setActiveCol(state, {payload}) {
            state.widgets[state.activeIndex].activeCol = payload
        },
        deleteCurCol(state) {
            const w = state.widgets[state.activeIndex];
            if (w) {
                w.columns?.splice(w.activeCol, 1);
            }
        },
        addCol(state) {
            const w = state.widgets[state.activeIndex];
            if (w.activeCol === -1)
            w.columns?.push({name: '',value: ''})
            else
            w.columns?.splice(w.activeCol + 1, 0, {name: '',value: ''})
        },
        changeCol(state, {payload}) {
            state.widgets[payload.index].columns = payload.value
        },
        setTableName(state, {payload}) {
            state.widgets[state.activeIndex].tableName = payload
        }
    }

})

export const {changeActive,changeWidgetPos,changeWidgetWH,createWidgets, changeWidgetWHO,
     changeWidgetPosO, addWidget, deleteWidget, setStyle, changeValue, setActiveCol, deleteCurCol,
      addCol, changeCol, setTableName} = tempWidgetSlice.actions;
export default tempWidgetSlice.reducer;