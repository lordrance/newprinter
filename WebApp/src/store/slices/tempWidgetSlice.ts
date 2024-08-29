import {createSlice} from '@reduxjs/toolkit'
import { Widget } from '@/interfaces'
import { uniqueArray, findClosestIndices, insertIntoArray} from '@/utils/move';

const initialState = {
    isMoveWhole: false,
    activeIndex: -1,
    widgets: [] as Widget[]
}

//所有组件四条边的坐标，由小到大排序
let posX: number[] = [];
let posY: number[] = [];

//临近数组，当前组件四条边最近的坐标
let near :number[][] = [];

//防止越界
const testBorder = (state: any, mx: number, my: number, width: number, height: number) => {
    const w = state.widgets[state.activeIndex]
    mx = mx < 0 ? 0 : mx;
    my = my < 0 ? 0 : my;
    mx = mx + w.width > width ? width - w.width : mx;
    my = my + w.height > height ? height - w.height : my;
    return [mx, my]
}

//移除当前组件上下左右坐标
const removeFromArr = (w: Widget) => {
    const bw = w.style?.BorderWidth ? w.style?.BorderWidth : 0
    let index = posX.indexOf(w.left + bw)
    if (index != -1) {
        posX.splice(index, 1);
    }
    index = posX.indexOf(w.left+w.width)
    if (index != -1) {
        posX.splice(index, 1);
    }
    index = posY.indexOf(w.top + bw)
    if (index != -1) {
        posY.splice(index, 1);
    }
    index = posY.indexOf(w.top+w.height)
    if (index != -1) {
        posY.splice(index, 1);
    }
}

//调整临近数组
const changeNear = ( t: number, b: number, l: number, r: number) => {
    while (near[0][1] !== -1 && t > posY[near[0][1]]) {
        if (near[0][1] !== posY.length - 1) {
            near[0][1]++;
            near[0][0] = near[0][1] - 1;
        } else {
            near[0][0] = posY.length - 1;
            near[0][1] = -1;
        }
    }
    while (near[1][1] !== -1 && b > posY[near[1][1]]) {
        if (near[1][1] !== posY.length - 1) {
            near[1][1]++;
            near[1][0] = near[1][1] - 1;
        } else {
            near[1][0] = posY.length - 1;
            near[1][1] = -1;
        }
    }
    while (near[2][1] !== -1 && l > posX[near[2][1]]) {
        if (near[2][1] !== posX.length - 1) {
            near[2][1]++;
            near[2][0] = near[2][1] - 1
        } else {
            near[2][0] = posX.length - 1
            near[2][1] = -1;
        }
    }
    while (near[3][1] !== -1 && r > posX[near[3][1]]) {
        if (near[3][1] !== posX.length - 1) {
            near[3][1]++;
            near[3][0] = near[3][1] - 1
        } else {
            near[3][0] = posX.length - 1
            near[3][1] = -1;
        }
    }

    while (near[0][0] !== -1 && t < posY[near[0][0]]) {
        near[0][0]--;
        near[0][1] = near[0][0] + 1
    }
    while (near[1][0] !== -1 && b < posY[near[1][0]]) {
        near[1][0]--;
        near[1][1] = near[1][0] + 1
    }
    while (near[2][0] !== -1 && l < posX[near[2][0]]) {
        near[2][0]--;
        near[2][1] = near[2][0] + 1
    }
    while (near[3][0] !== -1 && r < posX[near[3][0]]) {
        near[3][0]--;
        near[3][1] = near[3][0] + 1
    }
}

//近距离时逼近
const approaching = (w: Widget, moveX: number, moveY: number) => {
    const bw = w.style?.BorderWidth ? w.style?.BorderWidth : 0
    let mx = w.left+moveX, my = w.top+moveY;
    const offset = 20;
    const x = Math.abs(moveX), y = Math.abs(moveY), limit = 4
    //下
    if (moveY > 0 && y < limit) {
        if (near[0][1] !== -1) {
            if (w.top + moveY + offset > posY[near[0][1]]) {
                my = posY[near[0][1]] - bw
            }
        }
        if (near[1][1] !== -1) {
            if (w.top + w.height + moveY + offset > posY[near[1][1]]) {
                my = posY[near[1][1]] - w.height
            }
        }
    }
    //上
    if (moveY < 0 && y < limit) {
        if (near[0][0] !== -1) {
            if (w.top + moveY - offset < posY[near[0][0]]) {
                my = posY[near[0][0]] - bw
            }
        }
        if (near[1][0] !== -1) {
            if (w.top + w.height + moveY - offset < posY[near[1][0]]) {
                my = posY[near[1][0]] - w.height
            }
        }
    }
    //右
    if (moveX > 0 && x < limit) {
        if (near[2][1] !== -1) {
            if (w.left + moveX + offset > posX[near[2][1]]) {
                mx = posX[near[2][1]] - bw
            }
        }
        if (near[3][1] !== -1) {
            if (w.left + w.width + moveX + offset> posX[near[3][1]]) {
                mx = posX[near[3][1]] - w.width
            }
        }
    }
    //左
    if (moveX < 0 && x < limit) {
        if (near[2][0] !== -1) {
            if (w.left + moveX - offset < posX[near[2][0]]) {
                mx = posX[near[2][0]] - bw
            }
        }
        if (near[3][0] !== -1) {
            if (w.left + w.width + moveX - offset < posX[near[3][0]]) {
                mx = posX[near[3][0]] - w.width
            }
        }
    }
    return [mx, my]
}

const tempWidgetSlice = createSlice({
    name: 'tempWidget',
    initialState: initialState,
    reducers: {
        //当前模板组件
        createWidgets(state, {payload}: {payload: Widget[]}) {
            state.widgets = payload;
            state.activeIndex = -1;
            let c = 0;
            posX = []; posY = []
            payload.forEach(x=>{
                const bw = x.style?.BorderWidth ? x.style?.BorderWidth : 0
                posX[c] = x.left + bw; posY[c] = x.top + bw; c++;
                posX[c] = x.left+x.width; posY[c] = x.top + x.height; c++;
            })
            posX.sort(); posY.sort();
            posX = uniqueArray(posX); posY = uniqueArray(posY);
            near = []
        },
        //改变当前活跃组件
        changeActive(state, {payload}) {
            if (state.isMoveWhole) {
                state.activeIndex = -1
                return
            }
            if (payload === -1) {
                state.widgets.forEach(x=>{
                    if ('activeCol' in x) {
                        x.activeCol = -1
                    }
                })
            }
            //修改坐标状态
            if (payload !== state.activeIndex) {
                if (state.activeIndex === -1) {
                    const w = state.widgets[payload]
                    removeFromArr(w)
                    near[0] = findClosestIndices(posY, w.top);
                    near[1] = findClosestIndices(posY, w.top + w.height);
                    near[2] = findClosestIndices(posX, w.left);
                    near[3] = findClosestIndices(posX, w.left + w.width);
                } else if (payload === -1) {
                    const w = state.widgets[state.activeIndex]
                    const bw = w.style?.BorderWidth ? w.style?.BorderWidth : 0
                    insertIntoArray(posX, w.left + bw)
                    insertIntoArray(posX, w.left+w.width)
                    insertIntoArray(posY, w.top + bw)
                    insertIntoArray(posY, w.top+w.height)
                } else {
                    let w = state.widgets[state.activeIndex]
                    const bw = w.style?.BorderWidth ? w.style?.BorderWidth : 0
                    insertIntoArray(posX, w.left + bw)
                    insertIntoArray(posX, w.left+w.width)
                    insertIntoArray(posY, w.top + bw)
                    insertIntoArray(posY, w.top+w.height)
                    w = state.widgets[payload]
                    removeFromArr(w)
                    near[0] = findClosestIndices(posY, w.top);
                    near[1] = findClosestIndices(posY, w.top + w.height);
                    near[2] = findClosestIndices(posX, w.left);
                    near[3] = findClosestIndices(posX, w.left + w.width);
                }
                state.activeIndex = payload;
            } 
        },
        //控制面板改变组件长宽
        changeWidgetWHO(state, {payload}) {
            state.widgets[state.activeIndex].width = payload.width;
            state.widgets[state.activeIndex].height = payload.height;
        },
        //鼠标拖动改变长宽
        changeWidgetWH(state, {payload}) {
            const w = state.widgets[state.activeIndex]
            let mx = w.width + payload.moveX;
            let my = w.height + payload.moveY;
            mx = mx < 10 ? 10 : mx
            my = my < 10 ? 10 : my
            w.width = mx;
            w.height = my;
            changeNear(w.top, w.top+w.height, w.left, w.left+w.width)
        },
        //控制面板改变组件位置
        changeWidgetPosO(state, {payload}) {
            state.widgets[state.activeIndex].left = payload.left;
            state.widgets[state.activeIndex].top = payload.top;
        },
        //鼠标拖动改变组件位置
        changeWidgetPos(state, {payload}) {
            const w = state.widgets[state.activeIndex];
            const {width, height} = payload;
            let mx = 0, my = 0;
            [mx, my] = approaching(w, payload.moveX, payload.moveY);
            [mx, my] = testBorder(state, mx, my, width, height);
            w.left = mx;
            w.top = my;
            changeNear(my, my+w.height, mx, mx+w.width)
        },
        //添加组件
        addWidget(state, {payload}) {
            state.widgets.push(payload)
        },
        //删除当前活跃组件
        deleteWidget(state) {
            if (state.activeIndex !== -1)
            state.widgets.splice(state.activeIndex, 1)
            state.activeIndex = -1;
        },
        //设置组件样式
        setStyle(state, {payload}) {
            state.widgets[state.activeIndex].style = payload
        },
        //设置组件value
        changeValue(state, {payload}) {
            state.widgets[payload.index].value = payload.value;
        },
        //设置当前活跃的列
        setActiveCol(state, {payload}) {
            state.widgets[state.activeIndex].activeCol = payload
        },
        //删除当前活跃列
        deleteCurCol(state) {
            const w = state.widgets[state.activeIndex];
            if (w) {
                w.columns?.splice(w.activeCol, 1);
            }
        },
        setMoveWhole(state, {payload}) {
            //从整体移动状态退出，重置坐标状态
            if (!payload) {
                let c = 0;
                posX = []; posY = []
                state.widgets.forEach(x=>{
                    const bw = x.style?.BorderWidth ? x.style?.BorderWidth : 0
                    posX[c] = x.left + bw; posY[c] = x.top + bw; c++;
                    posX[c] = x.left+x.width; posY[c] = x.top + x.height; c++;
                })
                posX.sort(); posY.sort();
                posX = uniqueArray(posX); posY = uniqueArray(posY);
                near = []
            }
            state.isMoveWhole = payload
        },
        //整体移动
        moveAll(state, {payload}) {
            state.widgets.forEach(x => {
                x.left = x.left + payload.moveX;
                x.top = x.top + payload.moveY
            })
        },
        removeAll(state) {
            state.activeIndex = -1;
            state.isMoveWhole = false;
            state.widgets = [];
            posX = []; posY = [];
            near = []
        }
    }

})

export const {changeActive,changeWidgetPos,changeWidgetWH,createWidgets, changeWidgetWHO,
     changeWidgetPosO, addWidget, deleteWidget, setStyle, changeValue, setActiveCol, 
     deleteCurCol, setMoveWhole, moveAll, removeAll} = tempWidgetSlice.actions;
export default tempWidgetSlice.reducer;