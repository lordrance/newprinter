import { useSelector, useDispatch } from "react-redux"
import {useRef, useEffect} from 'react'
import { changeWidgetWH, changeWidgetPos } from "@/store/slices/tempWidgetSlice";
import store from "@/store";
//order 0 1 2 3 上右下左
const useMouseSize = (order: number) => {
    const dispatch = useDispatch();
    const index = useSelector((s: any) => s.tempWidget.activeIndex)
    const ref = useRef<HTMLDivElement>(null);

    const handleDown = (e: MouseEvent) => {
        e.stopPropagation();
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }

    const handleMove = (e: MouseEvent) => {
        e.preventDefault();e.stopPropagation();
        const width = store.getState().tempPage.width;
        const height = store.getState().tempPage.height;
        let trans = ref.current?.parentElement?.parentElement?.style.transform;
        const s = trans?.match(/scale\((.*?)\)/)
        const scale = s ? parseFloat(s[1]) : 1
        switch (order) {
            case 0:
                dispatch(changeWidgetPos({moveX: 0, moveY: (e.movementY/scale), width, height}))
                dispatch(changeWidgetWH({moveX: 0, moveY: (-e.movementY/scale)}))
                break;
            case 2:
                dispatch(changeWidgetWH({moveX: 0, moveY: (e.movementY/scale)}))
                break;
            case 1:
                dispatch(changeWidgetWH({moveX: (e.movementX/scale), moveY: 0}))
                break;
            case 3:
                dispatch(changeWidgetPos({moveX: (e.movementX/scale), moveY: 0, width, height}))
                dispatch(changeWidgetWH({moveX: (-e.movementX/scale), moveY: 0}))
                break;
            default:
                break;
        }
    }

    const handleUp = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
    }

    useEffect(() => {
       ref.current?.addEventListener('mousedown', handleDown);
       return () => {
        ref.current?.removeEventListener('mousedown', handleDown);
       }
    }, [index])
    return ref
}

export default useMouseSize