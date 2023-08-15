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

    const handleMove = (e: MouseEvent) => {
        e.stopPropagation(); e.preventDefault();
        const width = store.getState().tempPage.width;
        const height = store.getState().tempPage.height;
        const isMoveWhole = store.getState().tempWidget.isMoveWhole;
        let trans = ref.current?.parentElement?.style.transform;
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