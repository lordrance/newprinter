/*
 * @Author: uyrance uyrance@hotmal.com
 * @Date: 2024-08-07 18:18:03
 * @LastEditors: uyrance uyrance@hotmal.com
 * @LastEditTime: 2024-08-11 18:26:44
 * @FilePath: \WebApp\src\hooks\useMouseWidget.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import { changeWidgetPos, changeActive, moveAll } from '@/store/slices/tempWidgetSlice';
import store from '@/store';
//移动组件
const useMouseWidget = (index: number) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const handleDown = (e: MouseEvent) => {
        e.stopPropagation(); 
        dispatch(changeActive(index))
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }

    // 修改redux组件当前组件位置
    const handleMove = (e: MouseEvent) => {
        e.stopPropagation(); e.preventDefault();
        const width = store.getState().tempPage.width;
        const height = store.getState().tempPage.height;
        const isMoveWhole = store.getState().tempWidget.isMoveWhole;
        const trans = ref.current?.parentElement?.style.transform;
        const s = trans?.match(/scale\((.*?)\)/)
        const scale = s ? parseFloat(s[1]) : 1
        if (isMoveWhole) dispatch(moveAll({moveX: e.movementX/scale, moveY: e.movementY/scale}))
        else dispatch(changeWidgetPos({moveX: e.movementX/scale, moveY: e.movementY/scale, width, height}))
    }

    const handleUp = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
    }

    useEffect(() => {
        ref.current?.addEventListener('mousedown', handleDown);
        return () => {
            ref.current?.removeEventListener('mousedown', handleDown);
        }
    }, [])

    return ref;
}

export default useMouseWidget;